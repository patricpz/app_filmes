import React, { useEffect, useState } from "react";
import { Text, View, Image, ScrollView, ActivityIndicator, TouchableOpacity } from "react-native";
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
    const { movieId } = route.params as { movieId: number };

    const [movieDetail, setMovieDetail] = useState<MovieDetail | null>(null);
    const [loading, setLoading] = useState(true); // Alterado para true
    const navigation = useNavigation();

    useEffect(() => {
        async function fetchMovieDetails() {
            try {
                const response = await api.get<MovieDetail>(`/movie/${movieId}`, {
                    params: {
                        api_key: '769325d3803f802595c2581cefa68988',
                        language: 'pt-BR',
                    }
                });
                setMovieDetail(response.data);
            } catch (error) {
                console.error("Erro ao buscar detalhes do filme:", error);
            } finally {
                setLoading(false); // Definido como false após a requisição
            }
        }

        fetchMovieDetails();
    }, [movieId]);

    function getYear(data: string) {
        const ano = new Date(data).getFullYear();
        return `Ano ${ano}`;
    }

    if (loading) {
        return (
            <View style={[styles.container, styles.loadingContainer]}>
                <ActivityIndicator size={50} color="#FCAF17" />
            </View>
        );
    }

    if (!movieDetail) {
        return <Text>Erro ao carregar detalhes do filme.</Text>;
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                >
                    <CaretLeft color="#FFF" size={32} weight="thin" />
                </TouchableOpacity>

                <Text style={styles.headerText}>Detalhes</Text>
                <TouchableOpacity>
                    <BookmarkSimple color="#FFF" size={32} weight="thin" />
                </TouchableOpacity>
            </View>

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
                        <Star color={
                            movieDetail.vote_average.toFixed(2) >= "7.0" ? "#E8A14B" : "#92929D"
                        }
                            size={25}
                            weight={movieDetail.vote_average.toFixed(2) >= "7.0" ? "duotone" : "thin"} />

                        <Text style={[
                            movieDetail.vote_average.toFixed(2) >= "7.0" ? styles.descriptionText1 : styles.descriptionText
                        ]}>
                            {(movieDetail.vote_average.toFixed(1))}
                        </Text>
                    </View>
                </View>
            </View>
            <View style={styles.about}>
                <Text style={styles.aboutText}>Sinopse</Text>
                <Text style={styles.aboutText}>{movieDetail.overview === "" ? "Ops! Parece que esse filme não possue sinopse" : movieDetail.overview}</Text>
            </View>
        </View>
    );
}
