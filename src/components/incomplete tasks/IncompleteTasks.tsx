import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import "./IncompleteTasks.css";
import CustomAlert from "../custom components/custom alert/CustomAlert";

type taskDataType = {
  taskId?: number;
  task?: string;
  dueDate?: string;
  dateCompleted?: string;
  isComplete?: boolean;
}[];

const IncompleteTasks = () => {
  if (!localStorage.getItem("id")) {
    localStorage.setItem("id", "1");
  }

  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [dataAdded, setDataAdded] = useState<boolean>(false);
  const [dataRemoved, setDataRemoved] = useState<boolean>(false);
  const [taskMarked, setTaskMarked] = useState<boolean>(false);

  const [inputTask, setInputTask] = useState<string>("");
  const [inputDate, setInputDate] = useState<string>("");

  const [fullData, setFullData] = useState<taskDataType>([]);
  const [taskData, setTaskData] = useState<taskDataType>([]);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);

  const [dateToday, setDateToday] = useState<string>("");

  const [showNormalAlert, setShowNormalAlert] = useState<boolean>(false);
  const [showOptionAlert, setShowOptionAlert] = useState<boolean>(false);
  const [showMarkAlert, setShowMarkAlert] = useState<boolean>(false);
  const [alertMsg, setAlertMsg] = useState<string>("");

  const [hideTask, setHideTask] = useState<boolean>(false);
  const [activeTaskId, setActiveTaskId] = useState<number>(0);

  useEffect(() => {
    let todayDate = new Date().toISOString().slice(0, 10);
    setDateToday(todayDate);
    getTaskData();
    setDataAdded(false);
    setDataRemoved(false);
    setTaskMarked(false);
  }, [dataAdded, dataRemoved, taskMarked]);

  const getTaskData = () => {
    if (localStorage.getItem("tasks")) {
      let data: taskDataType = JSON.parse(localStorage.getItem("tasks")!);
      if (data.length > 0) {
        setFullData(data);
        let todayDate = new Date().toISOString().slice(0, 10);
        let incompleteTaskData: taskDataType = [];
        let index = 0;

        data.forEach((ins) => {
          if (!(ins.dueDate! < todayDate) && !ins.isComplete) {
            incompleteTaskData[index] = ins;
            index++;
          }
        });

        if (incompleteTaskData.length > 0) {
          incompleteTaskData.sort((a, b) => {
            if (a.dueDate! < b.dueDate!) {
              return -1;
            }
            if (a.dueDate! > b.dueDate!) {
              return 1;
            }
            return 0;
          });
          setTaskData(incompleteTaskData);
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

  const taskInputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setInputTask(event.target.value);
  };

  const dateInputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setInputDate(event.target.value);
  };

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputDate < dateToday) {
      setInputDate("");
      setAlertMsg("Due date should be today's or future date");
      setShowNormalAlert(true);
    } else {
      let taskId = Number(localStorage.getItem("id"));
      let task = inputTask;
      let dueDate = inputDate;
      let dateCompleted = "";
      let isComplete = false;

      let newId = Number(localStorage.getItem("id")) + 1;
      localStorage.setItem("id", JSON.stringify(newId));

      let prevTasks = [];
      if (localStorage.getItem("tasks")) {
        prevTasks = JSON.parse(localStorage.getItem("tasks")!);
      }

      let newTask = [
        ...prevTasks,
        {
          taskId: taskId,
          task: task,
          dueDate: dueDate,
          dateCompleted: dateCompleted,
          isComplete: isComplete,
        },
      ];

      localStorage.setItem("tasks", JSON.stringify(newTask));
      setInputTask("");
      setInputDate("");
      setDataAdded(true);
      setIsAdding(false);
    }
  };

  const removeTask = (val: boolean) => {
    if (val) {
      let newData = fullData;
      let index = newData.map((ins) => ins.taskId).indexOf(activeTaskId);
      newData.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(newData));
      setDataRemoved(true);
    }
    setShowOptionAlert(false);
    setHideTask(false);
    document.body.style.overflow = "auto";
  };

  const markTask = (val: boolean) => {
    if (val) {
      let newData = fullData;
      let index = newData.map((ins) => ins.taskId).indexOf(activeTaskId);
      newData[index].isComplete = true;
      newData[index].dateCompleted = dateToday;
      localStorage.setItem("tasks", JSON.stringify(newData));
      setTaskMarked(true);
    }
    setShowMarkAlert(false);
    setHideTask(false);
    document.body.style.overflow = "auto";
  };

  const cancelAlert = () => {
    setShowNormalAlert(false);
  };

  return (
    <>
      {showNormalAlert && (
        <CustomAlert msg={alertMsg} type="normal" cancelFunc={cancelAlert} />
      )}

      {showOptionAlert && (
        <CustomAlert msg={alertMsg} type="option" optionFunc={removeTask} />
      )}

      {showMarkAlert && (
        <CustomAlert msg={alertMsg} type="option" optionFunc={markTask} />
      )}

      {isAdding && (
        <div className="incomplete-tasks-add">
          <div className="incomplete-tasks-add-data">
            <header className="incomplete-tasks-add-data-cancel">
              <p
                onClick={() => {
                  setInputTask("");
                  setInputDate("");
                  setIsAdding(false);
                }}
              >
                X
              </p>
            </header>
            <header>
              <h2>ADD TASK</h2>
            </header>
            <form onSubmit={submitHandler}>
              <header className="incomplete-tasks-add-data-form-header">
                <label htmlFor="task">Task</label>
                <input
                  id="task"
                  autoComplete="off"
                  value={inputTask}
                  onChange={taskInputChangeHandler}
                  required
                  type="text"
                />
              </header>
              <header className="incomplete-tasks-add-data-form-header">
                <label htmlFor="task">Due Date</label>
                <input
                  id="date"
                  value={inputDate}
                  onChange={dateInputChangeHandler}
                  required
                  type="date"
                />
              </header>
              <header>
                <button type="submit">ADD</button>
              </header>
            </form>
          </div>
        </div>
      )}

      <div
        style={isAdding ? { filter: "blur(10px)" } : {}}
        className="incomplete-tasks-outer"
      >
        <div className="incomplete-tasks-inner">
          <div className="incomplete-tasks-add-btn">
            <button
              onClick={() => {
                setIsAdding(true);
              }}
            >
              ADD TASK
            </button>
          </div>

          <div className="incomplete-tasks-heading">
            <h1>Incomplete Tasks</h1>
          </div>

          {isEmpty ? (
            <div className="incomplete-tasks-empty">
              <p>NO TASKS CLICK ADD TASKS TO ADD ONE</p>
            </div>
          ) : (
            taskData.map((ins) => {
              return (
                <div
                  style={
                    hideTask && ins.taskId === activeTaskId
                      ? { border: "2px solid white" }
                      : {}
                  }
                  className="incomplete-tasks-data"
                  key={ins.taskId}
                >
                  <div className="incomplete-tasks-data-task-div">
                    TASK
                    <p>{ins.task}</p>
                  </div>
                  <div className="incomplete-tasks-data-date-div">
                    DUE DATE{` (yyyy-mm-dd)`}
                    <p> {ins.dueDate}</p>
                  </div>
                  <header>
                    <button
                      onClick={() => {
                        document.body.style.overflow = "hidden";
                        setAlertMsg("Do you want to mark task completed");
                        setHideTask(true);
                        setActiveTaskId(ins.taskId!);
                        setShowMarkAlert(true);
                      }}
                    >
                      MARK COMPLETE
                    </button>
                    <button
                      onClick={() => {
                        document.body.style.overflow = "hidden";
                        setAlertMsg("Do you want to remove the task");
                        setHideTask(true);
                        setActiveTaskId(ins.taskId!);
                        setShowOptionAlert(true);
                      }}
                    >
                      REMOVE
                    </button>
                  </header>
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

export default IncompleteTasks;
