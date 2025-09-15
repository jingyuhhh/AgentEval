import React, { useMemo } from "react";
import { Navigate, useLocation, useParams } from "react-router-dom";
import { getTasks, TaskType, DomainType, shouldPlayVideo } from "../data/tasks";

const TaskStartRedirect = () => {
  const { id } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const isUserIDExist = searchParams.has("userID");
  const userID = searchParams.get("userID") || 1;
  const tasks = getTasks(userID);

  const targetPath = useMemo(() => {
    const parsedId = parseInt(id, 10);
    const task = tasks.find((t) => t.id === parsedId);
    if (!task) return "/task/1";

    const taskIndex = tasks.findIndex((t) => t.id === task.id);
    if (shouldPlayVideo(userID, taskIndex) && isUserIDExist) {
      return `/task/${id}/taskvideo`;
    }
    if (task.domain === DomainType.VideoStream) {
      return `/task/${id}/video`;
    }
    if (
      task.taskType === TaskType.CancelSubscription ||
      task.taskType === TaskType.SignSubscription
    ) {
      return `/task/${id}/store`;
    }
    return `/task/${id}/shopping`;
  }, [id, tasks, userID]);

  return <Navigate to={`${targetPath}${location.search}`} replace />;
};

export default TaskStartRedirect;
