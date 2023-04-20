
export const movieReducer = (state, action) =>{
    console.log(action)

    switch(action.type){
        case 'ADD':
            return [...state,
                action.value
            ];
        case 'REMOVE':
            return state.filter(movie => (movie.imdbID !== action?.value?.imdbID));
        case 'CLEAR_ALL':
            return [];
        default:
            return state;
    }

}

