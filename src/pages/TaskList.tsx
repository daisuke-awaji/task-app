import React from "react";
import { useTasks } from "./useTasks";
import TaskCard from "../components/TaskCard";
import { Grid } from "@material-ui/core";
export const TaskList = () => {
  const tasks = useTasks();
  return (
    <Grid container spacing={1}>
      {tasks.map((task) => {
        return (
          <Grid item key={task.id}>
            <TaskCard task={task} />
          </Grid>
        );
      })}
    </Grid>
  );
};
