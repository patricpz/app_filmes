import React, { useContext } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { styles } from './style';
import { BookmarkSimple } from 'phosphor-react-native';
import { MovieContext } from '../../contexts/MOviesContext';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

const MyList: React.FC = () => {
  const { allFavoriteMovies, removeFavoriteMovies } = useContext(MovieContext);

  const movies = allFavoriteMovies || [];
  const noResult = movies.length === 0;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Minha Lista de Filmes</Text>
      </View>
      {noResult ? (
        <Text style={styles.noResult}>Nenhum filme encontrado</Text>
      ) : (
        <FlatList
          data={movies}
          keyExtractor={(item) => item.id?.toString() ?? String(Math.random())}
          renderItem={({ item }) => (
            <View style={styles.movieItem}>
              <Image source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }} style={styles.movieBanner} />
              <Text style={styles.movieTitle}>{item.title}</Text> 
              <TouchableOpacity style={styles.bookmarkContainer} onPress={() => removeFavoriteMovies(item.id)}>
                <BookmarkSimple 
                // @ts-ignore
                style={styles.bookmarkSimple} 
                weight="thin" />
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default MyList;
