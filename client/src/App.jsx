import { Navigate, Route, Routes } from "react-router-dom"

import Login from "./components/Username"
import PageNoteFound from "./components/PageNoteFound"
import Profile from "./components/Profile"
import Register from "./components/Register"
import { useLayoutEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { userSetAction } from "./redux/Action/userAction"
// import ProtectedRoute from "./ProtectedRoute"
import AdminHome from "./components/AdminHome"
import EditUser from "./components/EditUser"
import AddUser from "./components/AddUser"


function App() {

const user=useSelector(state=>state.user)
const dispatch=useDispatch()
  useLayoutEffect(() => {
    if (!user.isAuthenticated) {
      axios.get('/user/authentication', { withCredentials: true })
        .then((result) => {
          if (result.data.status === "ok") {
            console.log(result.data.data, "result here")
            const { username, userId, role } = result.data.data
            console.log("heree", result)
            const userData = { username, userId, role }
            dispatch(userSetAction(userData))
          }
        })
    }
  }, [user])
 

  return (
    <Routes>
      <Route path="*" element={<PageNoteFound/>}/>
      {user.isAuthenticated?(
        <>
          {user.user.role==='user'?(
            <Route path="/" element={<Profile/>}/>
          ):user.user.role==='admin'?(
            <>
            <Route path="/" element={<AdminHome/>}/>
            <Route path="/editUser/:id" element={<EditUser/>}/>
            <Route path="/add-user" element={<AddUser/>}/>
            </>
          ):null}
          <Route path="/register" element={<Navigate to="/" />} />
        </>
      ):(
        <>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </>
      )}
    </Routes>
  )
}

export default App
