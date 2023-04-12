import React, { useEffect, useState } from "react";
import { useMovieAPI } from "../Utils/Api";
import '../CSS/container.css'
const MainPage = () =>{
    const [movieData, setMovieData] = useState({})
    const [userInput, setUserInput] = useState("")
    const [shouldCallAPI, setShouldCallAPI] = useState(false);

    const movieRes = useMovieAPI(shouldCallAPI,userInput);
    // console.log("RES: ",movieRes)

    useEffect(() => {
        console.log("RES: ",movieRes)
        if(movieRes.isSuccess === true && movieRes.data !== undefined){
            console.log("has property: ",movieRes?.data?.data?.hasOwnProperty('Error'))
            if(movieRes?.data?.data?.hasOwnProperty('Error')){
                throw Error("Could not find movie with name "+userInput )
            }
            setMovieData(movieRes?.data?.data)
            //reset state so user can be ready for next input
            setUserInput("")
            setShouldCallAPI(false)
            document.getElementById("movieTitleInput").value = "";

        }
    },[movieRes])

    const callAPI = () => {
        if(userInput !== ''){
            setShouldCallAPI(true);
        }
    }

    const onChange = (event) => {
        setUserInput(event.target.value);
    }

    return(
        <>
           <div className="App">
                <h1>Hello Movie Lovers</h1>
                <hr></hr>
                <input
                    type="text"
                    id="movieTitleInput"
                    onChange={onChange}
                    placeholder="Enter the title of a movie"
                />
                <button onClick={callAPI}>Fetch Movie Data</button>
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