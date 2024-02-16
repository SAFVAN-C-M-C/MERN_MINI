// import { useSelector } from 'react-redux'
// import { Navigate } from 'react-router-dom'


// const ProtectedRoute = ({auth=false,children}) => {
//   const userData = useSelector(state => state.user)
//     console.log(userData.isAuthenticated);
//     if(auth){
//         if(userData.isAuthenticated && userData?.user.role==="user"){
//             return <Navigate to='/'/>
//         }else{
//             return children
//         }
//     }else{
//         if(!userData.isAuthenticated){
//             return <Navigate to='/login'/>
//         }else{
//             return children
//         }
//     }
// }

// export default ProtectedRoute


