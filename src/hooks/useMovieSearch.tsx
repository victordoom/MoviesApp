import { useEffect, useRef, useState } from 'react';
import movieDB from '../api/movieDB';
import { MovieDBResponse, Movie } from '../interfaces/movieInterface';

interface MovieListState {
    search: Movie[];
}

export const useMovieSearch = () => {
    
    const [ isFetching, setIsFetching ] = useState(true);
    const [ simpleMovieList, setSimpleMovieList ] = useState<MovieListState>({
        search: []
    });
    
    const loadMovies = async() => {
        console.log('entra a cargar');

        const search =  movieDB.get<MovieDBResponse>('movie/popular');

        const resp = await Promise.all([
            search
        ]);
        mapMovieList( resp[0].data.results ) ;
        console.log(resp[0].data.results)
    }

    const mapMovieList = ( movieList: Movie[] ) => {

        
        setSimpleMovieList({
            search: movieList
        });
        setIsFetching(false);
    }


    useEffect(() => {
        loadMovies();
    }, [])

    return {
        isFetching,
        simpleMovieList
    }

}
