import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.15.169:3333' //endereço ip + porta usada no node
});

export default api;