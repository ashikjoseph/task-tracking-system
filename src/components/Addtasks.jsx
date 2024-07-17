import React, { useState } from 'react';
import './addtasks.css';
import { addTasks } from '../services/allAPI';
import { useNavigate } from 'react-router-dom';

function Addtasks({ setUploadTodoStatus }) {
    const [taskValue, setTaskValue] = useState({
        title: "",
        startDate: "",
        dueDate: "",
        description: ""
    });
    const navigate = useNavigate();
    const handleAdd = async (e) => {
        e.preventDefault(); // Prevent form submission

        const { title, startDate, dueDate, description } = taskValue;
        if (!title || !startDate || !dueDate || !description) {
            alert("Please fill the form completely");
        } else {
            try {
                const response = await addTasks(taskValue);
                alert("Successfully inserted the task");
                setUploadTodoStatus(response.data);
                setTaskValue({
                    title: "",
                    startDate: "",
                    dueDate: "",
                    description: ""
                });
                navigate('/listtasks');
            } catch (error) {
                console.error("Error adding task:", error);
                alert("Failed to add task. Please try again.");
            }
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-12 col-md-8 col-lg-6">
                    <div className="add-tasks-container">
                        <h3 className="text-primary mt-5 mb-3">Task Tracking System</h3>
                        <form onSubmit={handleAdd}>
                            <div className="form-group mt-3">
                                <label htmlFor="title" className="form-label">Title</label>
                                <input
                                    type="text"
                                    id="title"
                                    className="form-control border-primary"
                                    placeholder="Enter task title"
                                    name="title"
                                    value={taskValue.title}
                                    onChange={(e) => setTaskValue({ ...taskValue, title: e.target.value })}
                                />
                            </div>
                            <div className="form-group mt-3">
                                <label htmlFor="startDate" className="form-label">Start Date</label>
                                <input
                                    type="date"
                                    id="startDate"
                                    className="form-control border-primary"
                                    name="startDate"
                                    value={taskValue.startDate}
                                    onChange={(e) => setTaskValue({ ...taskValue, startDate: e.target.value })}
                                />
                            </div>
                            <div className="form-group mt-3">
                                <label htmlFor="dueDate" className="form-label">Due Date</label>
                                <input
                                    type="date"
                                    id="dueDate"
                                    className="form-control border-primary"
                                    name="dueDate"
                                    value={taskValue.dueDate}
                                    onChange={(e) => setTaskValue({ ...taskValue, dueDate: e.target.value })}
                                />
                            </div>
                            <div className="form-group mt-3">
                                <label htmlFor="description" className="form-label">Description</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    rows="3"
                                    className="form-control border-primary"
                                    placeholder="Enter task description"
                                    value={taskValue.description}
                                    onChange={(e) => setTaskValue({ ...taskValue, description: e.target.value })}
                                />
                            </div>
                            <button type="submit" className="btn w-100 mt-3 btn-primary">ADD TASK</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Addtasks;
