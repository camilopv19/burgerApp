import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-8a278-default-rtdb.firebaseio.com/'
});

export default instance;
