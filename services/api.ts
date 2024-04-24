import axios from "axios";

export const api = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    params: {
        api_key:"769325d3803f802595c2581cefa68988",
        language: "pt-BR",
        include_adult: false,
    }
})