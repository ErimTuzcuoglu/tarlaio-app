import axios from 'axios';
import * as actions from '../actions/actions';


const API = 'https://jsonplaceholder.typicode.com/';


export const getPosts = () => dispatch => {

    return axios.get(API + "posts")
            .then(results => {
                //console.log(dispatch)
                dispatch(actions.getPostsData(results.data))
            });
    }

export const getUsers = () => dispatch => {
    return axios.get(API + "users")
            .then(results => {
                //console.log(results.data)
                dispatch(actions.getUsersData(results.data))
            });
    }