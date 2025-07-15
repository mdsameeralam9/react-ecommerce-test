import axios from "axios";
const URL = "http://localhost:3000/api";

export const axiosInstance = axios.create({
    baseURL: URL
})

export const axiosPrivateInstance = axios.create({
    baseURL: URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
})