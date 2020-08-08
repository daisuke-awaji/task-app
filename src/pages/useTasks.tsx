import { useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { listTasks } from "../graphql/queries";
import { onCreateTask, onDeleteTask } from "../graphql/subscriptions";
import { Task } from "./Home";
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
export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  useEffect(() => {
    fetchItemsNextToken({
      query: listTasks,
      callback: (data: Task[]): void => {
        setTasks((prev) => [...prev, ...data]);
      },
    });

    const subscription = {
      // @ts-ignore
      create: API.graphql(graphqlOperation(onCreateTask)).subscribe({
        next: (res: any) => {
          if (res.value.data.onCreateTask) {
            const task: Task = res.value.data.onCreateTask;
            setTasks((prev) => [...prev, task]);
          }
        },
      }),
      // @ts-ignore
      delete: API.graphql(graphqlOperation(onDeleteTask)).subscribe({
        next: (res: any) => {
          if (res.value.data.onDeleteTask) {
            const task: Task = res.value.data.onDeleteTask;
            setTasks((prev) => prev.filter((item) => item.id !== task.id));
          }
        },
      }),
    };
    return () => {
      subscription.create.unsubscribe();
      subscription.delete.unsubscribe();
    };
  }, []);
  return tasks;
};
