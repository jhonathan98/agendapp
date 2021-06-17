import {
  FETCH_TASKS_FAILURE,
  FETCH_TASKS_REQUEST,
  FETCH_TASKS_SUCCESS,
  FETCH_CREATE_TASKS_REQUEST,
  FETCH_CREATE_TASKS_SUCCESS,
  FETCH_CREATE_TASKS_FAILURE
} from "./taskTypes";
import { HTTP_VERBS, requestHttp } from '../../utils/HttpRequest';
import { TASKS } from "../../constants/HttpEndpoints";
import { getToken } from "../../utils/LocalStorageToken";


export const fetchTasks = (filter = {}) => {
  return (dispacth) => {
    dispacth(fetchTaskRequest());    
    const callHttp = async (filter) => {
      try {
        const token = getToken(); 
        const response = await requestHttp(
            { 
              method: HTTP_VERBS.GET,
              token,
              endpoint: TASKS.getTasks,
              params: filter
            }
        );
        dispacth(fetchTaskSuccess(response.data));
      } catch (error) {
        dispacth(fetchTaskFailure(error.response.statusText));
      }
    };
    callHttp(filter);
  };
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

export const fetchCreateTasks = (data = {}) => {
  return (dispacth) => {
    dispacth(fetchCreateTaskRequest());    
    const callHttp = async (data) => {
      try {
        const token = getToken(); 
        const response = await requestHttp({
          method: HTTP_VERBS.POST,
          token,
          endpoint: TASKS.createTask,
          data:data
        });
        dispacth(fetchCreateTaskSuccess(response.data));
      } catch (error) {
        dispacth(fetchCreateTaskFailure(error.response.statusText));
      }
    };
    callHttp(data);
  };
};

export const fetchCreateTaskRequest = () => {
  return {
    type: FETCH_CREATE_TASKS_REQUEST,
  };
};

export const fetchCreateTaskSuccess = (task) => {
  return {
    type: FETCH_CREATE_TASKS_SUCCESS,
    payload: task,
  };
};

export const fetchCreateTaskFailure = (error) => {
  return {
    type: FETCH_CREATE_TASKS_FAILURE,
    payload: error,
  };
};
