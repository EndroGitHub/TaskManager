import CustomAlert from "../custom components/custom alert/CustomAlert";
import "./OverdueTasks.css";
import { FormEvent, ChangeEvent, useEffect, useState } from "react";

type taskDataType = {
  taskId?: number;
  task?: string;
  dueDate?: string;
  dateCompleted?: string;
  isComplete?: boolean;
}[];

const OverdueTasks = () => {
  if (!localStorage.getItem("id")) {
    localStorage.setItem("id", "1");
  }

  const [fullData, setFullData] = useState<taskDataType>([]);
  const [taskData, setTaskData] = useState<taskDataType>([]);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);

  const [taskValue, setTaskValue] = useState<string>("");
  const [dateValue, setDateValue] = useState<string>("");
  const [taskIdValue, setTaskIdValue] = useState<number>(0);
  const [isRescheduling, setIsRescheduling] = useState<boolean>(false);
  const [isRescheduled, setIsRescheduled] = useState<boolean>(false);

  const [showAlert, setShowAlert] = useState<boolean>(false);

  useEffect(() => {
    getTaskData();
    setIsRescheduled(false);
  }, [isRescheduled]);

  const getTaskData = () => {
    if (localStorage.getItem("tasks")) {
      let data: taskDataType = JSON.parse(localStorage.getItem("tasks")!);
      if (data.length > 0) {
        setFullData(data);
        let todayDate = new Date().toISOString().slice(0, 10);
        let overdueTaskData: taskDataType = [];
        let index = 0;

        data.forEach((ins) => {
          if (ins.dueDate! < todayDate && !ins.isComplete) {
            overdueTaskData[index] = ins;
            index++;
          }
        });

        if (overdueTaskData.length > 0) {
          overdueTaskData.sort((a, b) => {
            if (a.dueDate! < b.dueDate!) {
              return -1;
            }
            if (a.dueDate! > b.dueDate!) {
              return 1;
            }
            return 0;
          });
          setTaskData(overdueTaskData);
          setIsEmpty(false);
        } else {
          setIsEmpty(true);
        }
      } else {
        setIsEmpty(true);
      }
    } else {
      setIsEmpty(true);
    }
  };

  const taskChangeHandler = () => {};

  const dateChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setDateValue(event.target.value);
  };

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (dateValue < new Date().toISOString().slice(0, 10)) {
      setDateValue("");
      setShowAlert(true);
    } else {
      let newData = fullData;
      let index = newData.map((ins) => ins.taskId).indexOf(taskIdValue);
      newData[index].dueDate = dateValue;
      localStorage.setItem("tasks", JSON.stringify(newData));
      setDateValue("");
      setIsRescheduling(false);
      setIsRescheduled(true);
    }
  };

  const cancelAlert = () => {
    setShowAlert(false);
  };

  return (
    <>
      {showAlert && (
        <CustomAlert
          msg="Due date should be today's or future date"
          type="normal"
          cancelFunc={cancelAlert}
        />
      )}
      {isRescheduling && (
        <div className="overdue-tasks-schedule-outer">
          <div className="overdue-tasks-schedule-inner">
            <header className="overdue-tasks-schedule-cancel">
              <p
                onClick={() => {
                  setDateValue("");
                  setIsRescheduling(false);
                }}
              >
                X
              </p>
            </header>
            <header>
              <h2>RESCHEDULE TASK</h2>
            </header>
            <form onSubmit={submitHandler}>
              <header className="overdue-tasks-schedule-form-header">
                <label htmlFor="task">Task</label>
                <input
                  id="task"
                  required
                  value={taskValue}
                  onChange={taskChangeHandler}
                  type="text"
                />
              </header>
              <header className="overdue-tasks-schedule-form-header">
                <label htmlFor="date">Due Date</label>
                <input
                  id="date"
                  required
                  value={dateValue}
                  onChange={dateChangeHandler}
                  type="date"
                  placeholder="Enter date"
                />
              </header>
              <header>
                <button type="submit">RESCHEDULE</button>
              </header>
            </form>
          </div>
        </div>
      )}
      <div
        style={isRescheduling ? { filter: "blur(10px)" } : {}}
        className="overdue-tasks-outer"
      >
        <div className="overdue-tasks-inner">
          <div className="overdue-tasks-heading">
            <h1>Overdue Tasks</h1>
          </div>

          {isEmpty ? (
            <div className="overdue-tasks-empty">
              <p>NO OVERDUE TASKS</p>
            </div>
          ) : (
            taskData.map((ins) => (
              <div key={ins.taskId} className="overdue-tasks-data">
                <div className="overdue-tasks-data-task-div">
                  TASK
                  <p>{ins.task}</p>
                </div>
                <div className="overdue-tasks-data-date-div">
                  DUE DATE {`(yyyy-mm-dd)`}
                  <p>{ins.dueDate}</p>
                </div>
                <header>
                  <button
                    onClick={() => {
                      setTaskValue(ins.task!);
                      setTaskIdValue(ins.taskId!);
                      setIsRescheduling(true);
                    }}
                  >
                    RESCHEDULE
                  </button>
                </header>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default OverdueTasks;
