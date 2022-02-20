import axios from 'axios';


const movieDB = axios.create({
    baseURL: 'https://api.themoviedb.org/3/movie',
    params: {
        api_key: '38d60a9bd1ba481c6ad1cf6534506299',
        language: 'en-US'
    }
});


export default movieDB;


