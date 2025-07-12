import axios from "axios";
const URL = "http://localhost:3000/api";

export const axiosInstance = axios.create({
    baseURL: URL
})