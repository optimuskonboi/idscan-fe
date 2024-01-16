import { GET_LIST_CAMERA, SET_DATA_REGISTER, SET_EMAIL_FORGOT_PASS, SET_TOKEN_USER } from "./Constants";

export const setDataRegister = (payload) => ({
    type: SET_DATA_REGISTER,
    payload
})

export const setEmailForgotPassword = (payload) => ({
    type: SET_EMAIL_FORGOT_PASS,
    payload
})

export const setTokenUser = (payload) => ({
    type: SET_TOKEN_USER,
    payload
})

export const getListCamera = (payload) => ({
    type: GET_LIST_CAMERA,
    payload
})