import { useQuery } from "react-query";
import axios from "axios";

export const callMoviesAPI = () => {
    axios.get("http://www.omdbapi.com/?i=tt3896198&apikey=b0421fa6").then(res => {console.log("API response is: " ,res)});
    
}

export const useMovieAPI = () => {

    const result = useQuery('movies', callMoviesAPI);
    return result;
}