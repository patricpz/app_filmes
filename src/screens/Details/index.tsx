import React, { useEffect, useState } from "react";
import { Text, View, Image, ActivityIndicator, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { api } from '../../../services/api';
import { styles } from './styles';
import { BookmarkSimple, CalendarBlank, CaretLeft, Clock, Star } from "phosphor-react-native";

type MovieDetail = {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    backdrop_path: string;
    runtime: number;
    release_date: string;
    vote_average: number;
};

export function Details() {
    const route = useRoute();
    const { movieId, myList: initialMyList = [] } = route.params as { movieId: number, myList?: MovieDetail[] };

    const [movieDetail, setMovieDetail] = useState<MovieDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [myList, setMyList] = useState<MovieDetail[]>(initialMyList);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                setLoading(true);
                const response = await api.get(`/movie/${movieId}`);
                if (response.data) {
                    setMovieDetail(response.data);
                }
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        };
        fetchMovieDetails();
    }, [movieId]);

    function getYear(data: string) {
        return new Date(data).getFullYear();
    }

    const addToMyList = () => {
        if (movieDetail) {
            const movieIndex = myList.findIndex(movie => movie.id === movieDetail.id);
            let updatedList = [...myList];
            if (movieIndex !== -1) {
                updatedList.splice(movieIndex, 1);
            } else {
                updatedList = [...myList, movieDetail];
            }
            setMyList(updatedList);
            // @ts-ignore
            navigation.navigate('MyList', { myList: updatedList });
        }
    };

    const isMovieInList = (movieId: number): boolean => {
        return myList.some(movie => movie.id === movieId);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <CaretLeft color="#FFF" size={32} weight="thin" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Detalhes</Text>
                <TouchableOpacity onPress={addToMyList}>
                    <BookmarkSimple color={isMovieInList(movieId) ? "#FCAF17" : "#FFF"} size={32} weight="thin" />
                </TouchableOpacity>
            </View>

            {loading ? (
                <ActivityIndicator size={50} color="#FCAF17" />
            ) : (
                movieDetail && (
                    <>
                        <View>
                            <Image
                                source={{ uri: `https://image.tmdb.org/t/p/w500${movieDetail.backdrop_path}` }}
                                style={styles.detailsImage}
                            />
                            <Image
                                source={{ uri: `https://image.tmdb.org/t/p/w500${movieDetail.poster_path}` }}
                                style={styles.detailsPosterImage}
                            />
                            <Text style={styles.titleMovie}> {movieDetail.title} </Text>
                            <View style={styles.description}>
                                <View style={styles.descriptionGroup}>
                                    <CalendarBlank color="#92929D" size={25} weight="thin" />
                                    <Text style={styles.descriptionText}>
                                        {getYear(movieDetail.release_date)}
                                    </Text>
                                </View>
                                <View style={styles.descriptionGroup}>
                                    <Clock color="#92929D" size={25} weight="thin" />
                                    <Text style={styles.descriptionText}>
                                        {`${movieDetail.runtime} Minutos`}
                                    </Text>
                                </View>
                                <View style={styles.descriptionGroup}>
                                    <Star
                                        color={movieDetail.vote_average >= 7.0 ? "#E8A14B" : "#92929D"}
                                        size={25}
                                        weight={movieDetail.vote_average >= 7.0 ? "duotone" : "thin"}
                                    />
                                    <Text style={movieDetail.vote_average >= 7.0 ? styles.descriptionText1 : styles.descriptionText}>
                                        {movieDetail.vote_average.toFixed(1)}
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.about}>
                            <Text style={styles.aboutText}>Sinopse</Text>
                            <Text style={styles.aboutText}>
                                {movieDetail.overview === "" ? "Ops! Parece que esse filme não possui sinopse" : movieDetail.overview}
                            </Text>
                        </View>
                    </>
                )
            )}
        </View>
    );
}
