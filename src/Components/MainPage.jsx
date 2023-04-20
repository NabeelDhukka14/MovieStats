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

    const movieRes = useMovieAPI(shouldCallAPI,userInput);
    console.log("RES: ",movieRes)
    console.log("ENABLED: ",shouldCallAPI)
    console.log("movieData: ",movieData)

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
        // console.log("RES: ",movieRes)
        if(movieRes.isSuccess === true && movieRes.data !== undefined){
            console.log("has property: ",movieRes?.data?.data?.hasOwnProperty('Error'))
            if(movieRes?.data?.data?.hasOwnProperty('Error')){
                throw Error("Could not find movie with name "+userInput )
            }
            // setMovieData(movieRes?.data?.data)
            let reducerAction = {type: "ADD", value: movieRes?.data?.data}
            dispatchMovieData(reducerAction)
            //reset state so user can be ready for next input
            setUserInput("")
            setShouldCallAPI(false)
            console.log("SETTING TO FALSE")
            document.getElementById("movieTitleInput").value = "";

        }
    },[movieRes.data])

    const clearHandler = () => {
        dispatchMovieData({type:"CLEAR_ALL"})
    }

    const callAPI = () => {
        if(userInput !== ''){
            setShouldCallAPI(true);
            console.log("SETTING TO TRUE")

        }
    }

    const onChange = (event) => {
        console.log("ITS CHANGING: ", event.target.value)
        setUserInput(event.target.value);
    }

    return(
        <>
           <div className="App container">
                <h1>Hello Movie Lovers</h1>
                <hr></hr>
                <input
                    type="text"
                    id="movieTitleInput"
                    onChange={onChange}
                    placeholder="Enter the title of a movie"
                />
                <button id="submitButton" onClick={callAPI}>Fetch Movie Data</button>
                <button id="clearAll" onClick={clearHandler}>Clear All Movies</button>

                { movieRes.isFetching === true ? 
                    (
                        <div className="center">
                            <h1>Loading...</h1>
                        </div>

                    ) : (
                        <div className="carousel-container">
                            <div className="carousel-content">
                                {/* Render the cards here */}
                                {(movieRes.isSuccess === true) && (
                                    <>
                                        <MovieCard movieData={movieRes?.data?.data} dispatcher={dispatchMovieData}/> 
                                        <MovieCard movieData={movieRes?.data?.data} dispatcher={dispatchMovieData}/> 
                                        <MovieCard movieData={movieRes?.data?.data} dispatcher={dispatchMovieData}/> 
                                    </>
                                  )}
                            </div>
                        </div>
                        // <div className="movieContainer">
                        //     <div className="movies">
                        //         {(movieRes.isSuccess === true) && (
                        //             movieData.map((movie,index) => {
                        //                 return(
                        //                     <MovieCard key={index} movieData={movie} dispatcher={dispatchMovieData}/> 
                        //                 )
                        //             })
                        //         )}
                        //     </div>    
                        // </div>
                    )
                }
                
           </div>
        </>
    )
}

export default MainPage;