import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080/" || "https://jsonplaceholder.typicode.com",
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;

export const searchAPI = (searchValue, fillter, currentPage) => {
    console.log('searchValue : ', searchValue)
    return api.get(`/search?q=${searchValue}&p=${fillter}&PageNumber=${currentPage}&PageSize=3`);
}