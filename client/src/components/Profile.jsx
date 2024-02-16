import styles from '../styles/Username.module.css';
import extend from '../styles/Profile.module.css'
import toast, { Toaster } from 'react-hot-toast';
import profile from '../assets/profile.png'
import { useDispatch, useSelector } from 'react-redux';
import { useLayoutEffect, useState } from 'react';
import axios from 'axios';
import { logoutUserAction, updateUserAction } from '../redux/Action/userAction';
import { useNavigate } from 'react-router-dom';
import { validateAddress, validateEmail, validatePassword, validatePhone, validateUsername } from '../helper/validate';

const Profile = () => {
  const [previewImage,setPreviewImage]=useState(null);

  // const [formData,setFormData]=useState({
  //   username:'',
  //   image:'',
  //   phone:'',
  //   email:'',
  //   address:''
  // })
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const userData = useSelector(state => state.user)
  const [userDetails, setUserDetails] = useState(null)

console.log(userData);
useLayoutEffect(() => {
  axios.get(`/user/userDetails/${userData.user.userId}`)
      .then((result) => {
          if (result.data.status === 'ok') {
              setUserDetails(result.data.data.user)
              
          }
          console.log(userDetails, "user details")
      })
  
},[userData])
const handleImageChange = (event) => {
  const file = event.target.files[0];
  const name=event.target.name
  setUserDetails(prevData => ({ ...prevData,[name]:file}))
  if (file) {
    const reader = new FileReader();

    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };

    reader.readAsDataURL(file);
  }
};
const handleChange = (e) => {
  const {name , value} = e.target
  setUserDetails(prevData => ({ ...prevData, [name]: value}))
}
const handleSubmit=(e)=>{
  e.preventDefault();
  if(!validateEmail(userDetails?.email)){
    toast.error("Invalid email")
    return
  }
  if(!validatePassword(userDetails?.password)){
    toast.error("Password must contain 8 characters")
    return
  }
  if(!validateUsername(userDetails?.username)){
    toast.error("Invalid User Name")
    return
  }
  if(!validateAddress(userDetails?.address)){
    toast.error("enter valid toast")
    return
  }
  if(!validatePhone(userDetails?.phone)){
    toast.error("Enter valid phone number with 10 number")
    return
  }
  console.log("clicked",userDetails,userData.user.userId);
  dispatch(updateUserAction(userDetails,userData.user.userId))
  setPreviewImage(null)
}










  return (
    <div className="container mx-auto">

    <Toaster position='top-center' reverseOrder={false}></Toaster>

    <div className='flex justify-center items-center h-screen'>
      <div className={`${styles.glass} ${extend.glass}`} style={{ width: "45%", paddingTop: '3em'}}>

        <div className="title flex flex-col items-center">
          <h4 className='text-5xl font-bold'>Profile</h4>
          <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
              You can update the details.
          </span>
        </div>

        <form className='py-1' onSubmit={handleSubmit}>
            <div className='profile flex justify-center py-4'>
                <label htmlFor="profile">
                  <img src={previewImage?previewImage:userDetails?.image?`http://localhost:1234/profileimages/${userDetails?.image}`:profile} className={`${styles.profile_img} ${extend.profile_img}`} alt="avatar" />
                </label>
                
                <input onChange={handleImageChange} type="file" id='profile' name='image' />
            </div>

            <div className="textbox flex flex-col items-center gap-6">
              
                <input className={`${styles.textbox} `} value={userDetails?.username} onChange={handleChange} type="text" name="username" placeholder='FirstName' />
                
     

              <div className="name flex w-3/4 gap-10">
                <input className={`${styles.textbox} ${extend.textbox}`} type="tel" placeholder='Mobile No.' onChange={handleChange} name='phone' value={userDetails?.phone} />
                <input disabled onChange={handleChange} name='email' className={`${styles.textbox} ${extend.textbox}`} value={userDetails?.email} type="text" placeholder='Email*' />
              </div>

             
                <input  className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='Address' onChange={handleChange} name='address' value={userDetails?.address}/>
                <button className="border bg-indigo-500 w-3/4 py-4 rounded-lg text-gray-50 text-xl shadow-sm text-center" type='submit'>Update</button>
             
                
            </div>

            

        </form>
        <div className="text-center py-4">
              <span className='text-gray-500'>come back later? <button  className='text-red-500' onClick={()=>dispatch(logoutUserAction(navigate))}>Logout</button></span>
        </div>

      </div>
    </div>
  </div>
  )
}

export default Profile