import React, { useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { listTasks } from "../graphql/queries";
import { CreateTaskMutationVariables } from "../API";
import { createTask } from "../graphql/mutations";
import { onCreateTask } from "../graphql/subscriptions";

type Task = {
  id: string;
  name: string;
  description: string | null;
};

type FormState = {
  name: string;
  description: string;
};

interface IAG {
  query: any;
  variables?: any;
  items?: any[];
  callback: any;
}
/**
 * @desc Recursively fetch all items in a list query using nextToken
 * @param {Object} query The query object from cda-graphql in use.
 * @param {Object} variables The variables to pass to query.
 * @param {Array} items Any preliminary Items already fetched
 * @param {Function} callback Optional callback function to be fired with every batch of items from query iteration.
 * @returns {Array} Array of all items received from queries.
 */
async function fetchItemsNextToken({
  query,
  variables,
  items = [],
  callback,
}: IAG): Promise<any> {
  const { data }: any = await API.graphql(graphqlOperation(query, variables));
  const key = Object.keys(data).find((k) => k.includes("list"));
  const res = data[key!]; // res = { items: [], nextToken: '' }

  items.push(...res.items);
  if (callback) {
    callback(res.items);
  }
  if (!res.nextToken) return items;

  variables = { ...variables, nextToken: res.nextToken };
  return fetchItemsNextToken({ query, variables, items, callback });
}

const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  useEffect(() => {
    const fetch = async () => {
      fetchItemsNextToken({
        query: listTasks,
        callback: (data: Task[]): void => {
          setTasks((prev) => [...prev, ...data]);
        },
      });
    };
    fetch();

    // @ts-ignore
    const subscription = API.graphql(graphqlOperation(onCreateTask)).subscribe({
      next: (res: any) => {
        if (res.value.data.onCreateTask) {
          const task: Task = res.value.data.onCreateTask;
          setTasks((prev) => [...prev, task]);
        }
      },
    });

    return () => subscription.unsubscribe();
  }, []);
  return tasks;
};

const List = () => {
  const tasks = useTasks();
  return (
    <ul>
      {tasks.map((task) => {
        return (
          <li key={task.id}>
            {task.name} / {task.description}
          </li>
        );
      })}
    </ul>
  );
};

export const Home = () => {
  const [input, setInput] = useState<FormState>({
    name: "",
    description: "",
  });
  const onFormChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setInput((prev) => ({ ...prev, [name]: value }));
  };
  const onPost = () => {
    if (input.name === "" || input.description === "") return;
    const newTask: CreateTaskMutationVariables = {
      input: {
        name: input.name,
        description: input.description,
      },
    };
    API.graphql(graphqlOperation(createTask, newTask));
  };

  return (
    <>
      <h1>Home</h1>
      <div>
        タスク名
        <input value={input.name} name="name" onChange={onFormChange} />
      </div>
      <div>
        内容
        <input
          value={input.description}
          name="description"
          onChange={onFormChange}
        />
      </div>
      <button onClick={onPost}>追加</button>
      <List />
    </>
  );
};
