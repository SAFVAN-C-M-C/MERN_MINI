import axios from "axios"
import { FETCH_USER } from "../ActionType"
import toast from "react-hot-toast"
axios.defaults.baseURL = 'http://localhost:1234';
export const setFetchedUser = (users) => {
    return {
        type: FETCH_USER,
        payload: users
    }
}

export const fetchUserAction = () => {
    return (dispatch) => {
        axios.get('/admin/fetchUsers', { withCredentials: true }).then((response) => {
            if (response.data.status === 'ok') {
                dispatch(setFetchedUser(response?.data?.users));
            }
        });
    }
}
export const saveUserAction = (userDetails, userID, navigate) => {
    console.log(userDetails);
    return () => {

        axios.post(`/admin/saveUser/${userID}`, userDetails, {
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then((result) => {
                if (result.data.status === 'ok') {
                    toast.success("Successfully updated")
                    navigate('/')
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
export const deleteUserAction = (userId, navigate) => {
    return () => {
        axios.delete(`http://localhost:1234/admin/deleteUser/${userId}`, { withCredentials: true })
            .then((result) => {
                if (result.data.status === 'ok') {
                    navigate('/')
                    toast.success('successfully deleted')
                } else {
                    toast.error(result.data.message)
                }
            })
            .catch((error) => {
                toast.error(error.message)
            })
    }
}

export const addUser = (userData, navigate) => {
    return () => {
        axios.post('/admin/addUser', userData, {
            withCredentials: true, headers: {
                "Content-Type": "multipart/form-data"
            }
        })
            .then((result) => {
                if (result.data.status === 'ok') {
                    navigate('/')
                    toast.success('successfully added user')
                } else {
                    toast.error(result.data.message)
                }
            })
            .catch((error) => {
                toast.error(error.message)
            })
    }
}