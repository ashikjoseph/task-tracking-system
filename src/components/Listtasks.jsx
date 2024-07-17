import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { allTaskApi, deleteTaskApi, getTaskDetailsById, updateTaskById } from '../services/allAPI';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Pagination from './Pagination';
import './listtasks.css';

function Listtasks() {
    const [eachTaskValue, setEachTaskValue] = useState({
        title: "",
        startDate: "",
        dueDate: "",
        description: ""
    });
    const [allTask, setAllTask] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [tasksPerPage] = useState(5);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        getAllTask();
    }, []);

    const getAllTask = async () => {
        try {
            const result = await allTaskApi();
            if (result && result.data && Array.isArray(result.data)) {
                setAllTask(result.data);
            } else {
                console.error('Invalid data format:', result);
            }
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const result = await deleteTaskApi(id);
            if (result.status === 200) {
                alert("Task deleted successfully");
                getAllTask();
            } else {
                console.error('Error deleting task:', result);
            }
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const getTaskDetails = async (id) => {
        handleShow();
        try {
            const res = await getTaskDetailsById(id);
            const { data } = res;
            setEachTaskValue(data);
        } catch (error) {
            console.error('Error fetching task details:', error);
        }
    };

    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    const currentTasks = allTask.slice(indexOfFirstTask, indexOfLastTask);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const updateTask = async () => {
        handleClose();
        try {
            await updateTaskById(eachTaskValue._id, eachTaskValue);
            alert("Task updated successfully");
            getAllTask();
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row mb-4">
                <div className="col-6 col-md-4">
                <Link to="/" className="btn btn-primary ">
                        <i className="fa-solid fa-arrow-left me-2"></i>Add Task
                    </Link>
                </div>
                <div className="col-12 col-md-4 text-center">
                    <h3>List of Tasks</h3>
                </div>
                <div className="col-6 col-md-4"></div>
            </div>
            <div className="table-responsive">
                <table className="table table-bordered table-striped">
                    <thead className="thead-dark">
                        <tr>
                            <th>Title</th>
                            <th>Start Date</th>
                            <th>Due Date</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentTasks.length > 0 ? (
                            currentTasks.map((task) => (
                                <tr key={task._id}>
                                    <td>{task.title}</td>
                                    <td>{task.startDate}</td>
                                    <td>{task.dueDate}</td>
                                    <td>{task.description}</td>
                                    <td>
                                        <button
                                            className="btn btn-warning btn-sm mx-1"
                                            onClick={() => getTaskDetails(task._id)}>
                                            <i className="fas fa-edit"></i>
                                        </button>
                                        <button
                                            className="btn btn-danger btn-sm mx-1"
                                            onClick={() => handleDelete(task._id)}>
                                            <i className="fas fa-trash-alt"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center">No tasks available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <Pagination
                tasksPerPage={tasksPerPage}
                totalTasks={allTask.length}
                paginate={paginate}
            />
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group mt-3">
                        <input
                            type="text"
                            className="form-control border-primary"
                            value={eachTaskValue.title}
                            onChange={(e) => setEachTaskValue({ ...eachTaskValue, title: e.target.value })}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <input
                            type="date"
                            className="form-control border-primary"
                            value={eachTaskValue.startDate}
                            onChange={(e) => setEachTaskValue({ ...eachTaskValue, startDate: e.target.value })}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <input
                            type="date"
                            className="form-control border-primary"
                            value={eachTaskValue.dueDate}
                            onChange={(e) => setEachTaskValue({ ...eachTaskValue, dueDate: e.target.value })}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <textarea
                            id="description"
                            rows="3"
                            className="form-control border-primary"
                            value={eachTaskValue.description}
                            onChange={(e) => setEachTaskValue({ ...eachTaskValue, description: e.target.value })}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={updateTask}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Listtasks;
