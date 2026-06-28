import axios from 'axios';

const API = axios.create({
    baseURL: "https://mern-task-tracker-2ekl.onrender.com/api",});

    export default API;