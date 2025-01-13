import React, { useEffect, useState } from "react";
import axios from "axios";


const DatePicker = ({ selectedDate, setSelectedDate }) => (
  <input
    type="date"
    value={selectedDate}
    onChange={(e) => setSelectedDate(e.target.value)}
    className="w-36 p-2 border rounded-md mb-2"
  />
);

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [achievedTasks, setAchievedTasks] = useState([]);
  const [empData, setEmpData] = useState({ Empname: "", Role: "", EmpId: "" });
  const [taskData, setTaskData] = useState({
    Title: "",
    ActionPlanned: "",
    StartTime: "",
    EndTime: "",
    ActionAchieved: false,
    CreatedDate: new Date().toISOString(),
    EmpId: "",
  });
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]); 

  const fetchData = async (date) => {
    try {
      setError("");
      const empId = sessionStorage.getItem("empId");

      const { data: allTasks } = await axios.get(
        `http://localhost:8000/datas?EmpId=${empId}&CreatedDate=${date}`
      );
      setTasks(allTasks);

      setAchievedTasks(allTasks.filter((task) => task.ActionAchieved));


      const { data: employee } = await axios.get(
        `http://localhost:8000/employees/${empId}`
      );

      if (employee) {
        setEmpData({
          Empname: employee.Empname,
          Role: employee.Role?.RoleName,
          EmpId: employee.EmpId,
        });

        setTaskData((prev) => ({
          ...prev,
          EmpId: employee.EmpId,
        }));
      }
    } catch (err) {
      setError("Error fetching tasks or employee data.");
      console.error(err);
    }
  };

  useEffect(() => {
  
    fetchData(selectedDate);
  }, [selectedDate]); 

  const handleAddTask = async (e) => {
    e.preventDefault();

    try {
      const { data: newTask } = await axios.post(
        "http://localhost:8000/datas",
        taskData
      );

      setShowForm(false);
      setTaskData({
        Title: "",
        ActionPlanned: "",
        StartTime: "",
        EndTime: "",
        ActionAchieved: false,
        EmpId: empData.EmpId,
      });

      setTasks((prev) => [...prev, newTask]);
    } catch (err) {
      console.error("Error creating task:", err);
      setError("Error creating task.");
    }
  };

  const handleTaskComplete = async (taskId) => {
    try {
      const response = await axios.put(`http://localhost:8000/datas/${taskId}`, {
        ActionAchieved: true,
      });

      console.log("Response from server:", response);

      fetchData(selectedDate); 

      const completedTask = tasks.find((task) => task._id === taskId);
      if (completedTask) {
        setAchievedTasks((prev) => [
          ...prev,
          { ...completedTask, ActionAchieved: true },
        ]);
      }
    } catch (err) {
      console.error("Error updating task:", err);
      setError("Error marking task as complete.");
    }
  };

  return (
    <div className="p-4 md:p-10">
      {/* Employee Information */}
      <div className="bg-white shadow rounded-md p-4 mb-4 w-96">
        <h2 className="text-xl font-bold">
          Name: {empData.Empname || "Loading..."}
        </h2>
        <p>EmpId : {empData.EmpId}</p>
        <p>Role: {empData.Role || "Loading..."}</p>
        <p>Reporting Time: 9:30 AM - 6:30 PM</p>
      </div>

      {/* Date Picker */}
      <div className="mb-4">
        <h3 className="text-lg font-bold">Select Date</h3>
        <DatePicker selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Planned Tasks */}
        <div className="bg-white shadow rounded-md p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">Action Planned ({tasks.length})</h3>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
              onClick={() => setShowForm(true)}
            >
              + New Task
            </button>
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <div className="space-y-4 max-h-[300px] overflow-y-auto">
            {tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                handleTaskComplete={handleTaskComplete}
                showCompleteButton={!task.ActionAchieved}
              />
            ))}
          </div>
        </div>

        {/* Achieved Tasks */}
        <div className="bg-white shadow rounded-md p-4">
          <h3 className="text-lg font-bold">Action Achieved ({achievedTasks.length})</h3>
          <div className="space-y-4 max-h-[300px] overflow-y-auto">
            {achievedTasks.map((task) => (
              <TaskCard key={task._id} task={task} />
            ))}
          </div>
        </div>
      </div>

      {/* Add Task Modal */}
      {showForm && (
        <TaskForm
          taskData={taskData}
          setTaskData={setTaskData}
          handleAddTask={handleAddTask}
          closeForm={() => setShowForm(false)}
        />
      )}
    </div>
  );
};

// Task Card component to display task details
const TaskCard = ({ task, handleTaskComplete, showCompleteButton }) => (
  <div className="border p-4 rounded-md shadow-sm bg-gray-50">
    <h4 className="font-bold">{task.Title}</h4>
    <p className="text-sm text-gray-600">
      {task.ActionAchieved ? "Action Completed" : task.ActionPlanned}
    </p>
    <p className="text-sm text-gray-500">
      {task.StartTime} - {task.EndTime}
    </p>
    <div>
      {showCompleteButton && (
        <button
          onClick={() => handleTaskComplete(task._id)}
          className="px-4 py-2 mt-2 rounded-md bg-green-500 text-white"
        >
          Task Completed
        </button>
      )}
    </div>
  </div>
);

// Task Form component for adding new tasks
const TaskForm = ({ taskData, setTaskData, handleAddTask, closeForm }) => (
  <div className="fixed inset-0 flex justify-center items-center">
    <div className="bg-white p-6 shadow-lg rounded-md w-full max-w-md mx-4">
      <h3 className="text-lg font-bold mb-4">Add New Task</h3>
      <form onSubmit={handleAddTask}>
        <input
          type="text"
          name="Title"
          value={taskData.Title}
          onChange={(e) => setTaskData({ ...taskData, Title: e.target.value })}
          className="w-full p-2 border rounded-md mb-2"
          placeholder="Task Title"
        />
        <textarea
          name="ActionPlanned"
          value={taskData.ActionPlanned}
          onChange={(e) =>
            setTaskData({ ...taskData, ActionPlanned: e.target.value })
          }
          className="w-full p-2 border rounded-md mb-2"
          placeholder="Action Planned"
        />
        <input
          type="time"
          name="StartTime"
          value={taskData.StartTime}
          onChange={(e) =>
            setTaskData({ ...taskData, StartTime: e.target.value })
          }
          className="w-full p-2 border rounded-md mb-2"
        />
        <input
          type="time"
          name="EndTime"
          value={taskData.EndTime}
          onChange={(e) =>
            setTaskData({ ...taskData, EndTime: e.target.value })
          }
          className="w-full p-2 border rounded-md mb-2"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-md mt-2"
        >
          Add Task
        </button>
      </form>
      <button
        onClick={closeForm}
        className="w-full bg-red-500 text-white px-4 py-2 rounded-md mt-2"
      >
        Cancel
      </button>
    </div>
  </div>
);

export default TaskManager;


