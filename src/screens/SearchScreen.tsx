import React, { useEffect, useState } from 'react'
import { View, Platform, Text, FlatList, Dimensions, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MovieCard } from '../components/MovieCard';

import { SearchInput } from '../components/SearchInput';
import { useMovieSearch } from '../hooks/useMovieSearch';

import { Movie } from '../interfaces/movieInterface';
import { LoadingScreen } from './LoadingScreen';

const screenWidth = Dimensions.get('window').width;


export const SearchScreen = () => {

    const { top } = useSafeAreaInsets();
    const { isFetching, simpleMovieList } = useMovieSearch();

    const [movieFiltered, setMovieFiltered] = useState<Movie[]>([])

    const [ term, setTerm ] = useState('')

    useEffect(() => {
        
        if ( term.length === 0 ) {
            return setMovieFiltered([]);
        }

        console.log(isNaN( Number(term) ))

        if ( isNaN( Number(term) ) ) {
            setMovieFiltered(
                simpleMovieList.search.filter( 
                    (movie) => movie.original_title.toLocaleLowerCase()
                        .includes( term.toLocaleLowerCase() )
                )
            );
        } else {
            const movieById = simpleMovieList.search.find(movie => movie.id === Number(term));
            setMovieFiltered(
                ( movieById ) ? [movieById] : []
            );
        }
        console.log(term);




    }, [term])


    if ( isFetching ) {
        return <LoadingScreen />
    }  

    return (
        <View style={{ 
            flex: 1, 
            marginHorizontal: 20,
        }}>
            
            <SearchInput
                onDebounce={ (value) => setTerm( value )  }
                style={{
                    position: 'absolute',
                    zIndex: 999,
                    width: screenWidth - 40,
                    top: ( Platform.OS === 'ios' ) ? top : top + 30
                }}
            />


            <FlatList
                data={ movieFiltered }
                keyExtractor={ (movie) => movie.id.toString() }
                showsVerticalScrollIndicator={ false }
                numColumns={ 1 }

                    // Header
                    ListHeaderComponent={(
                        <Text style={{
                            ...styles.title,
                            ...styles.globalMargin,
                            paddingBottom: 10,
                            marginTop: ( Platform.OS === 'ios' ) ? top + 60 : top + 80
                        }}>{ term }</Text>
                    )}

                    renderItem={ ({ item }) => ( <MovieCard movie={ item } /> )}
                />

        </View>
    )
}

const styles = StyleSheet.create({
    globalMargin: {
        marginHorizontal: 20
    },
    title: {
        fontSize: 35,
        fontWeight: 'bold'
    }
});


