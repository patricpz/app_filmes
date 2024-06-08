import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useCallback, useEffect, useState } from "react";

type Movie = {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    backdrop_path: string;
    runtime: number;
    release_date: string;
    vote_average: number;
};

type MovieContextData = {
    favoriteMovies: number[];
    allFavoriteMovies: Movie[];
    addFavoriteMovies: (movie: Movie) => void;
    removeFavoriteMovies: (movieId: number) => void;
};

export const MovieContext = createContext<MovieContextData>(
    {
        favoriteMovies: [],
        allFavoriteMovies: [],
        addFavoriteMovies: ()  => {},
        removeFavoriteMovies: ()  => {},
    }
);

type MovieProviderProps = {
    children: React.ReactNode;
}

export function MovieProvider({ children }: MovieProviderProps) {
    const [favoriteMovies, setFavoriteMovies] = useState<number[]>([]);
    const [allFavoriteMovies, setAllFavoriteMovies] = useState<Movie[]>([]);

    useEffect(() => {
        async function loadFavoriteMovies() {
            const favoriteMoviesStorage = await AsyncStorage.getItem("@FavoriteMovies");
            if (favoriteMoviesStorage) {
                const parsedFavoriteMovies = JSON.parse(favoriteMoviesStorage);
                setFavoriteMovies(parsedFavoriteMovies.map((movie: Movie) => movie.id));
                setAllFavoriteMovies(parsedFavoriteMovies);
            }
        }
        loadFavoriteMovies();
    }, []);

    const addFavoriteMovies = useCallback(
        async (movie: Movie) => {
            if (!favoriteMovies.includes(movie.id)) {
                const newFavoriteMovies = [...favoriteMovies, movie.id];
                const newAllFavoriteMovies = [...allFavoriteMovies, movie];
                setFavoriteMovies(newFavoriteMovies);
                setAllFavoriteMovies(newAllFavoriteMovies);
                await AsyncStorage.setItem("@FavoriteMovies", JSON.stringify(newAllFavoriteMovies));
            }
        }, 
        [favoriteMovies, allFavoriteMovies]
    );

    const removeFavoriteMovies = useCallback(
        async (movieId: number) => {
            if (favoriteMovies.includes(movieId)) {
                const newFavoriteMovies = favoriteMovies.filter(id => id !== movieId);
                const newAllFavoriteMovies = allFavoriteMovies.filter(movie => movie.id !== movieId);
                setFavoriteMovies(newFavoriteMovies);
                setAllFavoriteMovies(newAllFavoriteMovies);
                await AsyncStorage.setItem("@FavoriteMovies", JSON.stringify(newAllFavoriteMovies));
            }
        }, 
        [favoriteMovies, allFavoriteMovies]
    );

    const contextData : MovieContextData = {
        favoriteMovies,
        allFavoriteMovies,
        addFavoriteMovies,
        removeFavoriteMovies
    };

    return (
        <MovieContext.Provider value={contextData}>
            {children}
        </MovieContext.Provider>
    );
}
