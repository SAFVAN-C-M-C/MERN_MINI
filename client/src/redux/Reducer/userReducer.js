import * as actionType from "../ActionType"

const initialState={user:'',isAuthenticated: false }
const userReducer = (state = initialState,action) => {
    switch (action.type) {
        case actionType.REGISTER_USER:
            return {
                ...state, 
                user: action.payload,
                isAuthenticated: true
            }
        
        case actionType.LOGOUT_USER:
            return{
                ...state,
                user: '',
                isAuthenticated: false
            }

        default:
            return state
    }
}

export default userReducer;

