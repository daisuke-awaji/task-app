import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Task } from "../pages/Home";
import { IconButton } from "@material-ui/core";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import { API, graphqlOperation } from "aws-amplify";
import { deleteTask } from "../graphql/mutations";
const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  expand: {
    marginLeft: "auto",
  },
});

export default function TaskCard({ task }: { task: Task }) {
  const classes = useStyles();

  const onClickDeleteIcon = () => {
    API.graphql(
      graphqlOperation(deleteTask, {
        input: {
          id: task.id,
        },
      })
    );
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          task card
        </Typography>
        <Typography variant="h5" component="h2">
          {task.name}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {task.status}
        </Typography>
        <Typography variant="body2" component="p">
          {task.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">More</Button>
        <IconButton
          onClick={onClickDeleteIcon}
          className={classes.expand}
          aria-label="delete"
        >
          <DeleteOutlineIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
