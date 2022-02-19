import axios from 'axios';

const baseURL = 'https://reqres.in/api';

const focusApi = axios.create({ baseURL });

export default focusApi;
