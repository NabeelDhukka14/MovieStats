import React, { useEffect, useReducer, useState } from "react";
import { useMovieAPI } from "../Utils/Api";
import '../CSS/container.css'
import '../CSS/movieCard.css'

import MovieCard from "./MovieCard";
import { movieReducer } from "../Utils/movieReducer";


const MainPage = () =>{
    const [movieData, dispatchMovieData] = useReducer(movieReducer, [])
    const [userInput, setUserInput] = useState("")
    const [shouldCallAPI, setShouldCallAPI] = useState(false);
    const [movieNotFound, setMovieNotFound] = useState(false);
    const [badMovieName, setBadMovieName] = useState("")
    
    const movieRes = useMovieAPI(shouldCallAPI,userInput);
    
   
    //Allow user to submit movie title by pressing "enter" key instead of pressing button via mouse
    useEffect(() =>{
        var input = document.getElementById("movieTitleInput");
        input.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            document.getElementById("submitButton").click();
        }
        });
    })

    useEffect(() => {
        if(movieRes.isSuccess === true && movieRes.data !== undefined){
            console.log("has property: ",movieRes?.data?.data?.hasOwnProperty('Error'))
            if(movieRes?.data?.data?.hasOwnProperty('Error')){
                setBadMovieName(userInput);
                setMovieNotFound(true)
            }else{
            let reducerAction = {type: "ADD", value: movieRes?.data?.data}
            dispatchMovieData(reducerAction)
            setUserInput("")
            setMovieNotFound(false)
            setBadMovieName("")
            setShouldCallAPI(false)
            document.getElementById("movieTitleInput").value = "";
            }

        }
    },[movieRes.data])

    const clearHandler = () => {
        dispatchMovieData({type:"CLEAR_ALL"})
    }

    const callAPI = () => {
        if(userInput !== ''){
            setShouldCallAPI(true);
            movieRes.refetch()

        }
    }

    const onChange = (event) => {
        setUserInput(event.target.value);
    }

    return(
        <>
           <div className="App container">
                <h1 id="title">Hello Movie Lovers</h1>
                <hr id="titleHR"></hr>
                <input
                    type="text"
                    id="movieTitleInput"
                    onChange={onChange}
                    placeholder="Enter the title of a movie"
                />
                <button className={'ovalButton'} id="submitButton" onClick={callAPI}>Fetch Movie Data</button>
                <button className={'ovalButton'} id="clearAll" onClick={clearHandler}>Clear All Movies</button>

                {movieNotFound &&  <h2 className="errMsg">Could not find movie with name "{badMovieName}". Please Try a diffrent movie name</h2>}

                { movieRes.isFetching === true ? 
                    (
                        <div className="center">
                            <h1 id="loading">Loading...</h1>
                        </div>

                    ) : (
                        <div className="carousel-container">
                            <div className="carousel-content">
                                {/* Render the cards here */}
                                {(movieRes.isSuccess === true) && (
                                    movieData.map((movie,index) => {
                                        return(
                                            <MovieCard key={index} movieData={movie} dispatcher={dispatchMovieData}/>
                                        )
                                    })
                                  )}
                            </div>
                        </div>
                    )
                }
                
           </div>
        </>
    )
}

export default MainPage;