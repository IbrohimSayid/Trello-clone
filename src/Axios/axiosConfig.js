import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://trello.vimlc.uz/api",
});

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            return Promise.reject(error.response.data);
        } else {
            return Promise.reject({ message: "Network Error" });
        }
    }
);

export default axiosInstance;