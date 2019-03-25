import * as actionTypes from './actionTypes';

export const getPostsData = (data) => ({
        type: actionTypes.GET_POSTS_DATA,
        posts: data
})

export const getUsersData = (data) => {
    return {
        type: actionTypes.GET_USERS_DATA,
        users: data
    }
}
export const getUserLocationData = (data) => {
    return {
        type: actionTypes.GET_USER_LOCATION_DATA,
        locations: data
    }
}