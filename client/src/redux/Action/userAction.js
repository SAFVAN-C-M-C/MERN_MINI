import * as actionType from "../ActionType"
import axios from 'axios'
import { toast } from 'react-hot-toast'
axios.defaults.baseURL = 'http://localhost:1234';
export const userSetAction = (userData) => {
    return {
        type: actionType.REGISTER_USER,
        payload: userData
    }
}

export const userLogoutAction = () => {
    return {
        type: actionType.LOGOUT_USER,
    }
}
export const registerUserAction = (userData, navigate) => {
    console.log(userData);
    return (dispatch) => {

        axios.post("/user/signup", userData, {
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then((result) => {
                if (result.data.status === 'ok') {
                    const userData = result.data.data
                    dispatch(userSetAction(userData))
                    toast.success("Successfully registered")
                    console.log('reached here', userData)
                    navigate('/', { replace: true })
                } else {
                    toast.error(result.data.message);
                }
            })
            .catch((error) => {
                console.log(error);
                toast.error(error.message);
            })
    }
}
export const updateUserAction = (userData,userId) => {
    console.log(userData);
    return (dispatch) => {

        axios.post(`/user/update/${userId}`, userData, {
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then((result) => {
                if (result.data.status === 'ok') {
                    const userData = result.data.data
                    dispatch(userSetAction(userData))
                    toast.success("Successfully updated")
                    console.log('reached here', userData)
                } else {
                    toast.error(result.data.message);
                }
            })
            .catch((error) => {
                console.log(error);
                toast.error(error.message);
            })
    }
}
export const loginUserAction = (userData, navigate) => {
    return (dispatch) => {
        axios.post("/user/login", userData, { withCredentials: true })
            .then((result) => {
                if (result.data.status === 'ok') {
                    const userData = result.data.data
                    dispatch(userSetAction(userData))
                    toast.success("Successfully Logged in")
                    console.log('reached here', userData)
                    navigate('/', { replace: true })
                } else {
                    toast.error(result.data.message);
                }
            })
            .catch((err) => {
                toast.error(err.message);
            })
    }
}
export const logoutUserAction = (navigate) => {
    return (dispatch) => {
        axios.get("/user/logout", { withCredentials: true }).then(() => {
            dispatch(userLogoutAction())
            navigate('/')
        })
    }
}