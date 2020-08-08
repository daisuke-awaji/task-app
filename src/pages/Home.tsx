import React, { useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { CreateTaskMutationVariables } from "../API";
import { createTask } from "../graphql/mutations";
import { TextField, Grid, Button } from "@material-ui/core";
import { TaskList } from "./TaskList";

export type Task = {
  id: string;
  name: string;
  description: string | null;
  status: string;
};

type FormState = {
  name: string;
  description: string;
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
    if (input.name === "") return;
    const newTask: CreateTaskMutationVariables = {
      input: {
        name: input.name,
        description: input.description,
        status: "NoStatus",
      },
    };
    API.graphql(graphqlOperation(createTask, newTask));
  };

  return (
    <>
      <h1>Home</h1>
      <Grid container spacing={1}>
        <Grid item>
          <TextField
            id="task-name-field"
            label="Task Name"
            variant="outlined"
            value={input.name}
            name="name"
            onChange={onFormChange}
            size="small"
          />
        </Grid>
        <Grid item>
          <TextField
            id="description-field"
            label="Description"
            variant="outlined"
            value={input.description}
            name="description"
            onChange={onFormChange}
            size="small"
          />
        </Grid>
        <Grid item>
          <Button onClick={onPost} variant="contained" color="primary">
            ADD
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item>
          <TaskList />
        </Grid>
      </Grid>
    </>
  );
};
