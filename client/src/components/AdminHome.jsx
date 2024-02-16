import axios from 'axios';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUserAction, setFetchedUser } from '../redux/Action/adminAction';
import profile from '../assets/profile.png'
import { useNavigate } from 'react-router-dom';
import { logoutUserAction } from '../redux/Action/userAction';


const AdminHome = () => {
  const [searchTerm,setSearchTerm]=useState('')
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const [dataFromDb,setDataFromDb]=useState([])
  const [filtered,setFiltered]=useState([])

  const [reload,setReload]=useState(false)
  const usersData=useSelector(state=>state.users);
  useEffect(()=>{
    axios.get('http://localhost:1234/admin/fetchUsers', { withCredentials: true })
    .then((response) => {
      console.log("good respose");

      if (response.data.status === 'ok') {
        dispatch(setFetchedUser(response?.data?.users));
        setDataFromDb(response.data?.users)
      }
    })
    .catch((err)=>{
      toast.error("err.message");
      console.log("errorrrrr",err.message);
    })
    setReload(false)
    
  },[dataFromDb.length,reload])
  const deleteClick=(userId)=>{
    dispatch(deleteUserAction(userId,navigate))
    setReload(true)
  }
  console.log(dataFromDb.length,"dataFromDB",usersData);


  const searchHandle=(e)=>{
    setSearchTerm(e.target.value);
    setFiltered(dataFromDb.filter(data => data.username.toLowerCase().startsWith(searchTerm)))
  }
  return (
    <>
      <div className="container mx-auto">
        <Toaster />
        <div className="bg-blue-100 h-[80px]">
          <h1 className="text-3xl text-center p-6 font-serif mb-4">
            ADMIN DASHBOARD
          </h1>
        </div>
        <div className="text-right me-6">
          <button onClick={()=>dispatch(logoutUserAction(navigate))} className="border bg-indigo-500 w-[150px] hover:bg-red-400 py-4  rounded-lg text-gray-50 text-xl shadow-sm text-center">
            LOGOUT
          </button>
        </div>
        <div className="text-right "></div>
        <div className="text-right">
          <button onClick={()=>navigate('/add-user')} className="border bg-green-500 w-[125px] hover:bg-red-400 py-2 rounded-lg text-gray-50 text-xl shadow-sm text-center">
            ADD USER
          </button>
          <input
          onChange={searchHandle}
            type="text"
            placeholder="Search..."
            className="w-[300px] p-2 border-green-600 border rounded m-2 my-3"
          />
        </div>
        <table className="min-w-[1500px] ms-5 bg-white border my-4 border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-0 border-b"></th>
              <th className="py-2 px-0 border-b">Name</th>
              <th className="py-2 px-0 border-b">Email</th>
              <th className="py-2 px-0 border-b">Phone</th>
              <th className="py-2 px-0 border-b">Address</th>
              <th className="py-2 px-0 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            
              {
                searchTerm!==''?
                filtered.map((user,id)=>(
                  <tr key={id} className="border-b">
                <td className="py-2 px-4 text-center"><img src={user?.image?`http://localhost:1234/profileimages/${user?.image}`:profile} className='h-[50px] w-[50px] rounded-full' alt="avatar" /></td>
                <td className="py-2 px-4 text-center">{user?.username}</td>
                <td className="py-2 px-4 text-center">{user?.email}</td>
                <td className="py-2 px-4 text-center">{user?.phone}</td>
                <td className="py-2 px-4 text-center">{user?.address}</td>
                <td className="py-2 px-4 text-center">
                  <button onClick={()=>navigate(`/editUser/${user._id}`)} className="bg-blue-500 text-white py-1 px-2 mr-2 rounded hover:bg-blue-700">
                    Edit
                  </button>
                  <button onClick={()=>deleteClick(user._id)} className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-700">
                    Delete
                  </button>
                </td>
              </tr>
                )):dataFromDb.map((user,id)=>(
                  <tr key={id} className="border-b">
                <td className="py-2 px-4 text-center"><img src={user?.image?`http://localhost:1234/profileimages/${user?.image}`:profile} className='h-[50px] w-[50px] rounded-full' alt="avatar" /></td>
                <td className="py-2 px-4 text-center">{user?.username}</td>
                <td className="py-2 px-4 text-center">{user?.email}</td>
                <td className="py-2 px-4 text-center">{user?.phone}</td>
                <td className="py-2 px-4 text-center">{user?.address}</td>
                <td className="py-2 px-4 text-center">
                  <button onClick={()=>navigate(`/editUser/${user._id}`)} className="bg-blue-500 text-white py-1 px-2 mr-2 rounded hover:bg-blue-700">
                    Edit
                  </button>
                  <button onClick={()=>deleteClick(user._id)} className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-700">
                    Delete
                  </button>
                </td>
              </tr>
                ))
              }
             
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AdminHome;
