import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { styles } from './style';
import { BookmarkSimple } from 'phosphor-react-native';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

const MyList: React.FC = () => {
  const [myList, setMyList] = useState<Movie[]>([]);
  const route = useRoute();
  
  useEffect(() => {
    // @ts-ignore
      if (route.params && route.params.myList) {
        // @ts-ignore
        setMyList(route.params.myList);
      }
  }, [route.params]);

  const noResult = myList.length === 0;

  const removeMyList = (movieId: number) => {
    const newMyList = myList.filter((movie) => movie.id !== movieId);
    setMyList(newMyList);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Minha Lista de Filmes</Text>
      </View>
      {noResult ? (
        <Text style={styles.noResult}>Nenhum filme encontrado</Text>
      ) : (
        <FlatList
          data={myList}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.movieItem}>
              <Image source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }} style={styles.movieBanner} />
              <Text style={styles.movieTitle}>{item.title}</Text>
              <TouchableOpacity onPress={() => removeMyList(item.id)}>
                <BookmarkSimple color={ "#FFF"} size={32} weight="thin" />
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default MyList;
