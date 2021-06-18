import { Fragment, useEffect, useState } from "react";
import { Topbar } from "../../components/Topbar";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import { SCREEN_VIEWPORT } from "../../constants/ViewPort";
import { useScreenViewPort } from "../../hooks/useScreenViewPort";
import { FormGroup } from "../../globalStyles";
import { Input } from "../../components/Input";
import { FaSearch } from 'react-icons/fa';
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../../store";

const localizer = momentLocalizer(moment);

var events = [
  {
    title: "Tarea 1",
    start: new Date(),
    end: new Date(),
  },
];

const CALENDAR_VIEW_MODE = {
  DAY: "day",
  WEEK: "week",
};


const Schedule = ({ title }) => {
  const [calendarDefaultView, setCalendarDefaultView] = useState(CALENDAR_VIEW_MODE.DAY);
  const [loading, setLoading] = useState(true);
  const { screenViewPort } = useScreenViewPort();
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.task);
  
  useEffect(() => {
    const boostrap = async () => {
      await setLoading(true);
      if (screenViewPort) {
        await setCalendarDefaultView(
          screenViewPort === SCREEN_VIEWPORT.DESKTOP 
            ? CALENDAR_VIEW_MODE.WEEK 
            : CALENDAR_VIEW_MODE.DAY
        );
        await setLoading(false);
      }
    }
    boostrap();
  }, [screenViewPort]);

  useEffect(() => {
    dispatch(fetchTasks());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    events = [
      {
        title: "Tarea 1",
        start: new Date(),
        end: new Date(),
      }
    ];
    tasks.tasks.forEach(item => {
      const dataEvents = {
        title: item.title,
        start: new Date(item.due_date),
        end: new Date(item.due_date),
      }
      events.push(dataEvents);
    });
  }, [tasks])

  return (
    <Fragment>
      <Topbar title={title} />
      <FormGroup>
        <Input type="text" placeholder="search..." icon={FaSearch} />
      </FormGroup>
      <br />
      {!loading && (
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "70vh" }}
          defaultView={calendarDefaultView}
          views={["month", "week", "day"]}
        />
      )}
    </Fragment>
  );
};
export default Schedule;
