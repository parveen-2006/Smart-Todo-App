import axios from "axios";

const instance = axios.create({
  baseUrl: "http://localhost:6000/",
  timeout: 2000,
});

export default instance;
