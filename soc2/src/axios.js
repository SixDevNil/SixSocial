import axios from "axios";

export const makerequest = axios.create({
     baseURL: "http://localhost:8800/api/",
     withCredentials:true,
});