import React, { useEffect, useState } from "react";
import { useMovieAPI } from "../Utils/Api";

const MainPage = () =>{
    const movieRes = useMovieAPI();
    const [movieData, setMovieData] = useState({})

    useEffect(() => {
        console.log(movieRes.isFetching)
        if(movieRes.isSuccess === true){
            setMovieData(movieRes.data.data)
            console.log("MOVIE DATA: ",movieData)
        }
    },movieRes)


    return(
        <>
           <div className="App">
                <h1>Hello Movie Lovers</h1>
                <input />
                {movieRes.isSuccess && (
                    <>
                        <h1>{movieData?.Title}</h1>
                        <img src={movieData?.Poster} alt="movie poster" />
                    </>
                )}
           </div>
        </>
    )
}

export default MainPage;