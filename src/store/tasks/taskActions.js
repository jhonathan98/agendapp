import {
  FETCH_TASKS_FAILURE,
  FETCH_TASKS_REQUEST,
  FETCH_TASKS_SUCCESS,
} from "./taskTypes";

import { HTTP_VERBS, requestHttp } from "../../utils/HttpRequest";

export const fetchTasks = (filter={}) => {
  return (dispacth) => {
      dispacth(fetchTaskRequest());

      const callHttp = async (filter) => {
        try {
          const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZFVzZXIiOiI2MGFlZDllNTBjYjIzMzBhOGQyZDU3ZDQiLCJyb2xlIjoxLCJpYXQiOjE2MjI2NzkxNDQsImV4cCI6MTYyMjcyMjM0NH0.yFCbJzCLWzj74tvKGcI_4Osfr-z9n9PlhAJQ_Z4LhCI";
          const response = await requestHttp(
            {
              method: HTTP_VERBS.GET,
              token,
              endpoint: 'tasks',
              params: filter
            }
          );
          dispacth(fetchTaskSuccess(response.data));
        } catch (error) {
          dispacth(fetchTaskFailure(error.response.statusText));
        }
      };
      callHttp(filter);
  }
};

export const fetchTaskRequest = () => {
  return {
    type: FETCH_TASKS_REQUEST,
  };
};

export const fetchTaskSuccess = (tasks) => {
  return {
    type: FETCH_TASKS_SUCCESS,
    payload: tasks,
  };
};

export const fetchTaskFailure = (error) => {
  return {
    type: FETCH_TASKS_FAILURE,
    payload: error,
  };
};
