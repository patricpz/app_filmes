import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, FlatList, Text, TextInput, View } from 'react-native';
import { styles } from './Style';
import { MagnifyingGlass } from 'phosphor-react-native';
import { useEffect, useState } from 'react';
import { api } from '../../../services/api';
import { CardMovies } from '../../components/CardMovies';
import { useNavigation } from '@react-navigation/native';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
}

export default function Home() {
  const [discoveryMovies, setDiscoveryMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (search.length > 2) {
      handleSearch(search);
    } else {
      loadMoreData();
    }
  }, [page, search]);

  const loadMoreData = async () => {
    setLoading(true);
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
      setLoading(false);
    }
  };

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

  const navigation = useNavigation();

  const renderMovieItem = ({ item }: { item: Movie }) => (
    <CardMovies data={item} onPress={() => navigation.navigate("Details", { movieId: item.id })} />
  );

  const noResult = discoveryMovies.length === 0 && search.length > 2;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>O que você deseja assistir?</Text>
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
      </View>

      {noResult && (
        <Text style={styles.noResult}>
          Nenhum filme encontrado para "{search}"
        </Text>
      )}

      <View>
        <FlatList
          data={discoveryMovies}
          numColumns={3}
          renderItem={renderMovieItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: 35, paddingBottom: 100 }}
          onEndReached={() => setPage((prevPage) => prevPage + 1)}
          onEndReachedThreshold={0.5}
          onRefresh={handleRefresh}
          refreshing={refreshing}
        />
        {loading && <ActivityIndicator size={50} color="#FCAF17" />}
      </View>
    </View>
  );
}
