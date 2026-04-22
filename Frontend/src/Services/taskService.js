import instance from "./Api";



export const createTask = (data) => instance.post("/tasks" , data);
export const getTasks = () => instance.get("/tasks");
