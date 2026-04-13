import React, { useState } from 'react'
import TaskCard from '../Components/TaskCard';

export default function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");

    const HandleAdd = () => {
        if (!title) return;

        const newTask = {
            id: Date.now(),
            title,
            completed: false,
        }

        setTasks([...tasks, newTask]);
        setTitle("");
    }

    const handleDelete = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const handleToggle = (id) => {
        setTasks(
            tasks.map(task =>
                task.id === id ? { ...task, completed: !task.completed } : task));
    };
    return (
        <div>
            <h1>Smart Todo App</h1>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <button onClick={HandleAdd}>Add</button>

            {tasks.map(task => (
                <TaskCard
                    key={task.id}
                    task={task}
                    onDelete={handleDelete}
                    onToggle={handleToggle}
                />
            ))}
        </div>
    )
}
