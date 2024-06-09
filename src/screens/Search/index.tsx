import React, { useEffect, useState } from "react";
import { Text, View, TextInput, FlatList, Image, ActivityIndicator, TouchableOpacity } from "react-native";
import { styles } from './style';
import { MagnifyingGlass } from "phosphor-react-native";
import { api } from '../../../services/api';
import { useNavigation } from "@react-navigation/native";

interface Movie {
    id: number;
    title: string;
    poster_path: string;
}

export function Search() {
    const [discoveryMovies, setDiscoveryMovies] = useState<Movie[]>([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [page, setPage] = useState(1);
    const [isFetchingMore, setIsFetchingMore] = useState(false);

    const navigation = useNavigation();

    useEffect(() => {
        if (search.length > 2) {
            handleSearch(search);
        } else {
            loadMoreData();
        }
    }, [page, search]);

    const noResult = discoveryMovies.length === 0 && search.length > 2;

    const handleSearch = async (text: string) => {
        setLoading(true);
        try {
            const response = await api.get('/search/movie', {
                params: {
                    query: text,
                    page: 1,
                },
            });
            setDiscoveryMovies(response.data.results);
        } catch (error) {
            console.error("Erro ao buscar filmes:", error);
        } finally {
            setLoading(false);
        }
    };

    const loadMoreData = async () => {
        if (isFetchingMore || search.length > 2) return;
        setIsFetchingMore(true);
        try {
            const response = await api.get("/movie/popular", {
                params: {
                    page,
                },
            });
            setDiscoveryMovies((prevMovies) => [...prevMovies, ...response.data.results]);
        } catch (error) {
            console.error("Erro ao carregar dados da API:", error);
        } finally {
            setIsFetchingMore(false);
        }
    };

    const handleRefresh = async () => {
        setRefreshing(true);
        setPage(1); 
        setDiscoveryMovies([]); 
        try {
          const response = await api.get("/movie/popular", {
            params: {
              page: 1,
            },
          });
          setDiscoveryMovies(response.data.results);
        } catch (error) {
          console.error("Erro ao carregar dados da API:", error);
        } finally {
          setRefreshing(false);
        }
      };

    const renderMovieItem = ({ item }: { item: Movie }) => (
        <TouchableOpacity onPress={() => navigation.navigate("Details", { movieId: item.id })} style={styles.movieItem}>
            <Image source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }} style={styles.movieBanner} />
            <Text style={styles.movieTitle}>{item.title}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Procurar filme</Text>
            </View>
            <View style={styles.containerInput}>
                <TextInput
                    placeholderTextColor={"#FFF"}
                    placeholder="Buscar"
                    style={styles.input}
                    value={search}
                    onChangeText={setSearch}
                />
                <MagnifyingGlass color="#FFF" size={25} weight="light" />
            </View>
            {noResult && (
                <Text style={styles.noResult}>
                    Nenhum filme encontrado para "{search}"
                </Text>
            )}

            <FlatList
                data={discoveryMovies}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ padding: 35, paddingBottom: 100 }}
                onEndReached={() => setPage((prevPage) => prevPage + 1)}
                onEndReachedThreshold={0.5}
                onRefresh={handleRefresh}
                refreshing={refreshing}
                renderItem={renderMovieItem}
            />
            {loading && <ActivityIndicator size={50} color="#FCAF17" />}
        </View>
    );
}
