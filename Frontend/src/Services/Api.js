import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:6000/",
  timeout: 2000,
});

//Attach token automatically
instance.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;  
  }
  return req;
});

export default instance;
