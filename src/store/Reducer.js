import { GET_LIST_CAMERA, SET_DATA_REGISTER, SET_EMAIL_FORGOT_PASS, SET_TOKEN_USER } from "./Constants"

const initState = {
    dataUserRegister: {
        name: '',
        username: '',
        email: '',
        password: '',
        confirmpassword: '',
        company_code: '',
        permissions_code: ''
    },
    emailForgotPassword: '',
    tokenUser: '',
    wareHouses: {
        camera: [],
        code: '',
        name: '',
    }
}


function reducer(state, action) {
    switch (action.type) {
        case SET_DATA_REGISTER:
            return {
                ...state,
                dataUserRegister: {
                    name: action.payload.name,
                    username: action.payload.userName,
                    email: action.payload.email,
                    password: action.payload.password,
                    confirmpassword: action.payload.confirmPassword,
                    company_code: action.payload.companyName,
                    permissions_code: action.payload.permission,
                }
            }
        case SET_EMAIL_FORGOT_PASS:
            return {
                ...state,
                emailForgotPassword: action.payload
            }
        case SET_TOKEN_USER:
            return {
                ...state,
                tokenUser: action.payload
            }
        case GET_LIST_CAMERA:
            return {
                ...state,
                wareHouses: {
                    name: action.payload.data.name,
                    code: action.payload.data.code,
                    camera: action.payload.data.camera
                }
            }
        default:
            throw new Error('Invalid action')
    }
}

export { initState }
export default reducer