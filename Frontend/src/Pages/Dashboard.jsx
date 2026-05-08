import React, { useState } from 'react';
import { useEffect } from 'react';
import instance from "../Services/Api"


export default function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");

    //Fetch tasks
    const fetchTasks = async () => {
        try {
            const res = await instance.get('/tasks');
            setTasks(res.data.tasks);
        } catch (err) {
            console.log("fetch err", err)
        }
    }

    // Run on Load
    useEffect(() => {
        fetchTasks();
    })


    const handleAdd = async () => {
        if (!title) return;
        try {
            await instance.post("/tasks", { title });
        } catch (err) {
            console.log("Add err", err)
        }

    };
    const handleDelete = async (id) => {
        try {
            await instance.delete(`/tasks/${id}`);

            fetchTasks();
        } catch (err) {
            console.log("delete err", err)
        }
    }

    const toggleTask = async (id)=>{
        try {
            await instance.patch(`/tasks/${id}`);

            fetchTasks()
        } catch (err) {
            console.log("toggle err", err)
        }
    }

    return (
        <div>
            <h3>Smart Todo</h3>

            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <button onClick={handleAdd}>Add</button>

            {tasks.map((task) => (
                <div>
                    <div key={task._id}>{task.title}</div>
                    <button onClick={()=>handleDelete(task._id)}>Delete</button>
                    <button onClick={()=>toggleTask(task._id)}>
                        {task.status === "pending" 
                        ? "complete" : "Undo"
                        }
                    </button>
                    <p>Status : {task.status}</p>
                    <hr />
                </div>
            ))}
        </div>
    );
}