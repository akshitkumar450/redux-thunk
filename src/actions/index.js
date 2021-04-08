import axios from 'axios'
import _ from 'lodash'
// this is a action creater 
// when action creater is called it returns a action object
// but when using async await it does not returns action object ,rather it returns request object

// export const fetchPosts = async () => {
//     // bad approach (use thunk) ->actions must be  plain objects 
//     const resposne = await axios.get('https://jsonplaceholder.typicode.com/posts')
//     return {
//         type: 'FETCH_POSTS',
//         payload: resposne
//     }
// }

// when the action creater is called an action object is returned and send to reducers and then reducers will run
// but..all the steps will be so fast ,that we can't get our data from api as api request will take some amount of time
// export const fetchPosts = () => {
//     const resposne = axios.get('https://jsonplaceholder.typicode.com/posts')
//     return {
//         type: 'FETCH_POSTS',
//         payload: resposne
//     }
// }

// redux thunk.
// action creater can return action objects or function
// we can use asycn await with redux thunk 
// when ever we are making api request in action creater we will always be using redux thunk
export const fetchPosts = () => {
    return async (dispatch, getState) => {
        const resposne = await axios.get('https://jsonplaceholder.typicode.com/posts')
        // we don't return action object from inner function ,instead call dispatch function with action object
        dispatch({
            type: 'FETCH_POSTS',
            payload: resposne.data
        })
    }
}

// with this we are getting multiple request for same id having the same id

// export const fetchUser = (id) => {
//     return async (dispatch, getState) => {
//         const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
//         dispatch({
//             type: "FETCH_USER",
//             payload: response.data
//         })
//     }
// }

// using memoization we can reduce the network requests with  same id single time

// export const fetchUser = (id) => {
//     return (dispatch, getState) => {
//         _fetchUser(id, dispatch)
//     }
// }

// EASY APPROACH FOR SINGLE REQUEST with single user id

// const _fetchUser = _.memoize(async (id, dispatch) => {
//     const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
//     dispatch({
//         type: "FETCH_USER",
//         payload: response.data
//     })
// })


export const fetchUser = (id) => {
    return async (dispatch, getState) => {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
        dispatch({
            type: "FETCH_USER",
            payload: response.data
        })
    }
}

//HARD APPROACH FOR SINGLE REQUEST with single user id

// create  single action creater which call other action creater and dispatch results of calling action creaters
export const fetchPostsAndUsers = () => {
    return async (dispatch, getState) => {
        await dispatch(fetchPosts())
        const userIds = _.map(getState().posts, 'userId')
        const uniqueIds = _.uniq(userIds)
        uniqueIds.forEach(id => dispatch(fetchUser(id)))
        // console.log(getState().posts);
    }
}