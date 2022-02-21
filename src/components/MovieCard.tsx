import React from 'react'
import { Image, Text, View, StyleSheet } from 'react-native';
import { Movie } from '../interfaces/movieInterface';

interface Props {
    movie: Movie
}


export const MovieCard = ({ movie }: Props) => {

    const uri = `https://image.tmdb.org/t/p/w500${ movie.poster_path }`;

    return (
        <View style={ styles.container }>
            {
                movie.poster_path && (
                    <Image 
                        source={{ uri }}
                        style={{ width: 50, height: 50, borderRadius: 10 }}
                    />
                )
            }
            

            <View style={ styles.actorInfo }>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                    { movie.title }
                </Text>
                <Text style={{ fontSize: 16, opacity: 0.7 }}>
                    { movie.original_title }
                </Text>
            </View>


        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 10,
        height: 50,
        marginBottom: 20
    },
    actorInfo: {
        marginLeft: 10,
        marginTop: 4,
    }
});