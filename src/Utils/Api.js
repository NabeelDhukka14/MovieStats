import { useQuery } from "react-query";
import axios from "axios";

export const callMoviesAPI = (title) => {
    console.log(` URL: https://www.omdbapi.com/?t=${title}&apikey=b0421fa6`);
    return axios.get(`https://www.omdbapi.com/?t=${title}&apikey=b0421fa6`).then(res => {
        console.log("API response is: " ,res); 
        return res;});
    
}

export const useMovieAPI = (shouldCallAPI, title) => {

    const result = useQuery('movies', () => {return callMoviesAPI(title)},{
        enabled:shouldCallAPI,
        retry:0});
    return result;

}