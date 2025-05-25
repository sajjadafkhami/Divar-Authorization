import axios from "axios";
import { getCookie, setCookie } from "../utils/cookie";
import { getNewTokens } from "../services/token";

const api = axios.create({
    baseURL: "http://localhost:3400/",
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use((request) => {
    const accessToken = getCookie("accessToken");
    if(accessToken) {
        request.headers["Authorization"] = `bearer ${accessToken}`;
    }
    return request
}, error => {
    return Promise.reject(error)
});

api.interceptors.response.use((response) => {
    return response; 
},
async (error) => {
    const originalRequest = error.config;
    if(error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const res = await getNewTokens();
        if(!res?.response) return;
        setCookie(res.response.data);
        console.log(res)

        return api(originalRequest)
    }
})

export default api