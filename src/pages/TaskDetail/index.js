import React, { Fragment, useEffect } from "react";
import { FaRegClock } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { TimeLeft } from "../../components/Task/styles";
import { Topbar } from "../../components/Topbar";
import { getStatusById } from "../../constants/TaskStatus";
import { fetchDetailTasks } from "../../store/tasks/taskActions";
import { timeLeftFromNow } from "../../utils/DateFormats";
import { TaskDescription, TaskFooter, TaskDueDate, TaskResponsable, TaskStatusLabel, TaskTitle } from "./styles";

const TaskDetail = ({title}) => {
  const history = useHistory();
  const { id } = useParams();
  const dispatch = useDispatch();
  const task = useSelector(state => state.task);


  const renderStatus = (id) => {
    const status = getStatusById(id);
    return <TaskStatusLabel color={status.color}>{status.name}</TaskStatusLabel>
  }

  const goBackApp = () => {
    history.goBack();
  }

  useEffect(() => {
    console.log("dispatch para consultar una tarea")
    dispatch(fetchDetailTasks(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <Fragment>
      <Topbar isBackVisible={true} onPress={goBackApp} title={title} />
      { renderStatus(task.singleTask?task.singleTask.status:1) }
      <TaskTitle> {task.singleTask?task.singleTask.title:""} </TaskTitle>
      <TaskDescription>{task.singleTask?task.singleTask.description:""}</TaskDescription>
      <TaskFooter>
        <TaskDueDate>
          <TimeLeft>
          <FaRegClock />
            <p>
              {
                timeLeftFromNow(task.singleTask?task.singleTask.due_date:"1999-01-01")
              } 
            </p>
          </TimeLeft>            
        </TaskDueDate>
        <TaskResponsable>{task.singleTask?task.singleTask.responsible.name:""}</TaskResponsable>
      </TaskFooter>
    </Fragment>
  );
};
export default TaskDetail;
