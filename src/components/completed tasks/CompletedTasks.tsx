import { useEffect, useState } from "react";
import "./CompletedTasks.css";

type taskDataType = {
  taskId?: number;
  task?: string;
  dueDate?: string;
  dateCompleted?: string;
  isComplete?: boolean;
}[];

if (!localStorage.getItem("id")) {
  localStorage.setItem("id", "1");
}

const CompletedTasks = () => {
  const [taskData, setTaskData] = useState<taskDataType>([]);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);

  useEffect(() => {
    getTaskData();
  }, []);

  const getTaskData = () => {
    if (localStorage.getItem("tasks")) {
      let data: taskDataType = JSON.parse(localStorage.getItem("tasks")!);
      if (data.length > 0) {
        let completedTaskData: taskDataType = [];
        let index = 0;

        data.forEach((ins) => {
          if (ins.isComplete) {
            completedTaskData[index] = ins;
            index++;
          }
        });

        if (completedTaskData.length > 0) {
          completedTaskData.sort((a, b) => {
            if (a.dueDate! < b.dueDate!) {
              return -1;
            }
            if (a.dueDate! > b.dueDate!) {
              return 1;
            }
            return 0;
          });
          setTaskData(completedTaskData);
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
  return (
    <>
      <div className="completed-tasks-outer">
        <div className="completed-tasks-inner">
          <div className="completed-tasks-heading">
            <h1>Completed Tasks</h1>
          </div>

          {isEmpty ? (
            <div className="completed-tasks-empty">
              <p>NO COMPLETED TASKS</p>
            </div>
          ) : (
            taskData.map((ins) => (
              <div key={ins.taskId} className="completed-tasks-data">
                <div className="completed-tasks-data-task-div">
                  TASK
                  <p>{ins.task}</p>
                </div>
                <div className="completed-tasks-data-date-div">
                  DUE DATE {`(yyyy-mm-dd)`}
                  <p>{ins.dueDate}</p>
                </div>
                <div className="completed-tasks-data-date-div">
                  DATE COMPLETED {`(yyyy-mm-dd)`}
                  <p>{ins.dateCompleted}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default CompletedTasks;
