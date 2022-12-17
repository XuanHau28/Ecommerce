import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    CLEAR_ERRORS,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL
   } from '../constants/userConstans';
import axios from 'axios';

//Login
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST});
        const config = { headers: { "Content-Type": "application/json"}};

        const {data} = await axios.post(
            `/api/v1/login`,
        {email, password},
        config
        );

        dispatch({ type: LOGIN_SUCCESS, payload: data.user});
    }
    catch (error) {
        dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
    }
 };

 //Register
 export const register = (userdata) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_USER_REQUEST});
        const config = { headers: { "Content-Type": "multipart/form-data" }};

        const {data} = await axios.post(`/api/v1/register`, userdata, config);

        dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
    } catch (error) {
        dispatch({ type: REGISTER_USER_FAIL, payload: error.response.data.message})
    }
  }

//Load User
export const loadUser = () => async (dispatch) => {
    try {
        dispatch({ type: LOAD_USER_REQUEST});
        const config = { headers: { "Content-Type": "application/json"}};

        const {data} = await axios.get(
            `/api/v1/me`);

        dispatch({ type: LOAD_USER_SUCCESS, payload: data.user});
    }
    catch (error) {
        dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.message });
    }
 };

//LOGOUT USER 
//Load User
export const logout = () => async (dispatch) => {
    try {
        await axios.get(`/api/v1/logout`);

        dispatch({ type: LOGOUT_SUCCESS});
    }
    catch (error) {
        dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message });
    }
 };

 //CLearning error
 export const clearErrors = () => async (dispatch) => {
    dispatch({type: CLEAR_ERRORS});
 };