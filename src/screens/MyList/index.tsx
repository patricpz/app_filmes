import React from 'react';
import { View, Text, FlatList } from 'react-native';

interface Movie {
  id: number;
  title: string;
}

const MyList: React.FC = ({ route }) => {
  const { myList } = route.params;

  const renderMovies = () => {
    return myList.map((movie, index) => (
      <View key={index} style={{ marginBottom: 10 }}>
        <Text style={{ color: 'white' }}>{movie.title}</Text>
      </View>
    ));
  };

  return (
    <View>
      <Text>Minha Lista de Filmes</Text>
      {renderMovies()}
    </View>
  );
};

export default MyList;
