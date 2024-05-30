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
    addFavoriteMovies: (movieId: number) => void;
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
                setFavoriteMovies(JSON.parse(favoriteMoviesStorage));
            }
        }
        loadFavoriteMovies();
    }, []);

    const addFavoriteMovies = useCallback(
        async (movieId: number) => {
            if (!favoriteMovies.includes(movieId)) {
                const newFavoriteMovies = [...favoriteMovies, movieId];
                setFavoriteMovies(newFavoriteMovies);
                await AsyncStorage.setItem("@FavoriteMovies", JSON.stringify(newFavoriteMovies));
            }
        }, 
        [favoriteMovies]
    );

    const removeFavoriteMovies = useCallback(
        async (movieId: number) => {
            if (favoriteMovies.includes(movieId)) {
                const newFavoriteMovies = favoriteMovies.filter(id => id !== movieId);
                setFavoriteMovies(newFavoriteMovies);
                await AsyncStorage.setItem("@FavoriteMovies", JSON.stringify(newFavoriteMovies));
            }
        }, 
        [favoriteMovies]
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
