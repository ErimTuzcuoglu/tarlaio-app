import * as actionTypes from '../actions/actionTypes';

const initialState = {
    posts: null,
    users: null,
    locations: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_POSTS_DATA:
            return {
                ...state,
                posts: action.posts
            }
        case actionTypes.GET_USERS_DATA:
            return {
                ...state,
                users: action.users
            }
        case actionTypes.GET_USER_LOCATION_DATA:
            return {
                ...state,
                locations: action.locations
            }
        default:
            return state;
    }
}



export default reducer;