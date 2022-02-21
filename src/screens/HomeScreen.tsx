import React, { useContext, useEffect } from 'react';
import { ActivityIndicator, Dimensions, View, ScrollView, TouchableOpacity, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import ImageColors from 'react-native-image-colors';

import Carousel from 'react-native-snap-carousel';

import { MoviePoster } from '../components/MoviePoster';
import { useMovies } from '../hooks/useMovies';
import { HorizontalSlider } from '../components/HorizontalSlider';
import { GradientBackground } from '../components/GradientBackground';
import { getImageColors } from '../helpers/getImageColors';
import { GradientContext } from '../context/GradientContext';
import { loginStyles } from '../theme/loginTheme';
import { AuthContext } from '../context/AuthContext';

const { width: windowWidth } = Dimensions.get('window');

export const HomeScreen = () => {

    const { nowPlaying, popular, topRated, upcoming, isLoading } = useMovies();
    const { top } = useSafeAreaInsets();
    const { setMainColors } = useContext(GradientContext)
    const { logOut} = useContext(AuthContext)

    const getPosterColors = async (index: number) => {
        const movie = nowPlaying[index];
        const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

        const [primary = 'green', secondary = 'orange'] = await getImageColors(uri);
        setMainColors({ primary, secondary })
    }

    useEffect(() => {
        if (nowPlaying.length > 0) {
            getPosterColors(0)
        }
    }, [nowPlaying])

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
                <ActivityIndicator color="red" size={100} />
            </View>
        )
    }


    return (
        <GradientBackground>

            <ScrollView>

                <View style={{ marginTop: top + 20 }}>

                    {/* First carusel portada */}
                    <View style={{ height: 440 }}>
                        <Carousel
                            data={nowPlaying}
                            renderItem={({ item }: any) => <MoviePoster movie={item} />}
                            sliderWidth={windowWidth}
                            itemWidth={300}
                            inactiveSlideOpacity={0.9}
                            onSnapToItem={index => getPosterColors(index)}
                        />
                    </View>

                    {/*mini carusel */}
                    <HorizontalSlider title="Popular" movies={popular} />
                    <HorizontalSlider title="Top Rated" movies={topRated} />
                    <HorizontalSlider title="Upcoming" movies={upcoming} />

                    {/* logout */}
                    <View style={ {
                        ...loginStyles.buttonContainer,
                        marginTop: 2,
                        marginBottom: 20} }>
                        <TouchableOpacity
                            activeOpacity={ 0.8 }
                            style={ {
                                ...loginStyles.button,
                                 backgroundColor: 'red',} }
                            onPress={ logOut }
                        >
                            <Text style={ loginStyles.buttonText } >LogOut</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </ScrollView>
        </GradientBackground>
    )
}
