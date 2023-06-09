import axios from "axios";
import { LOGIN_FAILURE, LOGIN_SUCCESS } from "./type";
import { LOGIN_START } from "./type";
import { LOGOUT_USER } from "./type";

const API_URL = "http://localhost:8000";

export const login = (data) => async (dispatch) => {
    dispatch({ type: LOGIN_START });
    try {
        const res = await axios.post(`${API_URL}/api/signin`, data);
        console.log(res.data)
        localStorage.setItem('access_token', res.data.token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
        dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    } catch (error) {
        dispatch({ type: LOGIN_FAILURE});
        console.log(error);
    }
}

export const register = (data) => async (dispatch) => {
    dispatch({ type: LOGIN_START });
    try {
        const res = await axios.post(`${API_URL}/api/signup`, data);
        console.log(res.data)
        localStorage.setItem('access_token', res.data.token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
        dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    } catch (error) {
        dispatch({ type: LOGIN_FAILURE});
        console.log(error);
    }
}

export const logout = () => async (dispatch) => {
    dispatch({ type: LOGOUT_USER});
}
