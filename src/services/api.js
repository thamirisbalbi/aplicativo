import axios from 'axios';

const api = axios.create({
    baseURL: 'https://new-skunk-73.loca.lt' //endereço ip + porta usada no node
});

export default api;