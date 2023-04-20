import React from "react";
import '../CSS/movieCard.css'
import '../CSS/container.css'
import closeIcon from "../images/close.png"; 

const MovieCard = (props) => {
    console.log("PROPS: ", props)
    const {movieData,dispatcher} = props;
    const {Title, Poster,Metascore,Ratings,imdbRating, BoxOffice} = movieData;

    const handleClick = () => {
        let reducerAction = {type: "REMOVE", value:movieData}
        dispatcher(reducerAction)
    }

    return (

        <div className="card">
            <button className="close-button" onClick={handleClick}>
                <img src={closeIcon} alt="Close" className="close-icon" />
            </button>
            <h1>{Title}</h1>
            <hr></hr>
            
            <img  className={'poster'} src={Poster} alt="movie poster" />
            
            <hr></hr>
            <h2>Box Office: {BoxOffice}</h2>
            <hr></hr>
            <h2>Review Scores</h2>
            <h3>Metascore: {Metascore}</h3>
            <h3>imdbRating: {imdbRating}</h3>
            {Ratings.map((rating,index) => {
                return (
                    <h3 key={index}>{rating.Source}: {rating.Value}</h3>
                )
            })}
        </div>

    )
}

export default MovieCard;