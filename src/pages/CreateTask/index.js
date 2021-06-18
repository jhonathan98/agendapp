import { Fragment, useEffect } from "react";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Topbar } from "../../components/Topbar";
import Select from "react-select";
import DatePicker from "react-date-picker";
import { useForm, Controller } from "react-hook-form";
import { Textarea } from "./styles";
import { FormGroup, LabelError } from "../../globalStyles";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../store";
import { fetchCreateTasks } from '../../store/tasks/taskActions';
import { useHistory } from "react-router-dom";


const USERS = [];

const CreateTask = ({ title}) => {

  const dispatch = useDispatch();
  const usersData = useSelector(state => state.user);
  const tasks = useSelector(state => state.task);
  let history = useHistory();

  const {
    register,
    control,
    handleSubmit,
    formState: {
      errors,
      isValid
    }
  } = useForm({ mode: 'onChange' });

  const onSubmitCreate = (data) => {
    
    const collaborators = [];
    if(collaborators.length < 1 ){
      data.collaborators.map((item) => (
        collaborators.push(item.value)
      ))
    }
    const dataSaveTask = {
      title: data.taskTitle,
      description: data.description,
      due_date: data.dueDateTask,
      responsible: data.responsible.value,
      collaborators: collaborators
    }
    dispatch(fetchCreateTasks(dataSaveTask));
  };

  useEffect(() => { 
    if(!tasks.singleTask) return
    const idtask = tasks.singleTask._id
    history.replace({ pathname: `/detail/${idtask}`});
    console.log(tasks.singleTask);
  }, [tasks])

  useEffect(() => {
    dispatch(fetchUsers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if(USERS.length < 1 ){
      usersData.users.map((item) => (
        USERS.push({value:item._id,label:item.name})
      ))
    }
    
  }, [usersData]);


  return (
    <Fragment>
      <Topbar title={title} />
      <form onSubmit={handleSubmit(onSubmitCreate)}>
        <FormGroup>
          <label>Task title</label>
          <Input 
            register={register} 
            name="taskTitle" 
            rules={{ required: true, minLength: 6 }}
            label="Task title" 
            type="text" 
            placeholder="Enter task title" 
          />
          { errors.taskTitle?.type === 'required' && <LabelError>Field required</LabelError> }
          { errors.taskTitle?.type === 'minLength' && <LabelError>Min Length 6 characters</LabelError> }
        </FormGroup>

        <FormGroup>
          <label>Responsible</label>
          <Controller
            name="responsible"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                {...field}
                placeholder="Select responsible"
                options={USERS}
              />
            )}
          />
          { errors.responsible && <LabelError>Field required</LabelError> }
        </FormGroup>

        <FormGroup>
          <label>Collaborators</label>
          <Controller
            name="collaborators"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                {...field}
                isMulti
                placeholder="Select collaborators"
                options={USERS}
              />
            )}
          />
          { errors.collaborators && <LabelError>Field required</LabelError> }
        </FormGroup>
        <FormGroup>
          <label>Due Date</label>
          <div>
            <Controller
              name="dueDateTask"
              control={control}
              defaultValue={new Date()}
              rules={{ required: true }}
              render={({ field }) => (
                <DatePicker {...field} locale="en-EN" format="dd-MM-yy" />
              )}
            />
          </div>
          { errors.dueDateTask && <LabelError>Field required</LabelError> }
        </FormGroup>

        <FormGroup>
          <label>Description</label>
          <div>
            <Textarea 
              {...register("description", { required: true } )} 
              rows="3"
              errors={ errors.description }
            />
          </div>
          { errors.description && <LabelError>Field required</LabelError> }
        </FormGroup>
        <div>
          <Button disabled={!isValid} type="submit" text="Create" />
        </div>
      </form>
    </Fragment>
  );
};
export default CreateTask;
