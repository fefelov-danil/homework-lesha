import axios from 'axios';

const configOMB = {
    baseURL: 'http://www.omdbapi.com',
};
const key = '&apikey=c26fdbae';
const axiosInstance = axios.create(configOMB);

const API = {
    searchFilmsByTitle: (title: string) => {
        return axiosInstance.get('/?t=' + title + key)
    },
    searchFilmsByType: (title: string, type: string) => {
        return axiosInstance.get(`/?t=${title}&y=${type}${key}`)
    }
};


export default API;
