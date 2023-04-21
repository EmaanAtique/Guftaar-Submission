import axios from "axios";

const instance = axios.create({
  baseURL: "/api",
});

export const login = (email, password) =>
  instance.post("/client/login", { email, password });

export default instance;
