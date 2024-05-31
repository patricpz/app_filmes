import React from 'react';
import { View, Text, FlatList } from 'react-native';

interface Movie {
  id: number;
  title: string;
}

const MyList: React.FC = ({ route }) => {
  const myList = route.params === undefined ? [] : route.params.myList;
  console.log(route.params.myList)

  const renderMovies = () => {
    return myList.map((movie) => (
      <View key={movie.id} style={{ marginBottom: 10 }}>
        <Text style={{ color: '#000' }}>{movie.title}</Text>
      </View>
    ));
  };

  return (
    <View>
      <Text>Minha Lista de Filmes</Text>
      {myList.length <= 0 ? <Text>Não tem nada na lista</Text> : renderMovies()}
    </View>
  );
};

export default MyList;
