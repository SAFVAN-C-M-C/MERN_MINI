import axios from 'axios';
import  { useLayoutEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { validateAddress, validateEmail, validatePassword, validatePhone, validateUsername } from '../helper/validate';
import toast, { Toaster } from 'react-hot-toast';
import styles from '../styles/Username.module.css';
import extend from '../styles/Profile.module.css'
import profile from '../assets/profile.png'

import { saveUserAction } from '../redux/Action/adminAction';


const EditUser = () => {
  const id=useParams().id;
  console.log(id);
  const [previewImage,setPreviewImage]=useState(null);
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const [userDetails, setUserDetails] = useState(null)
  useLayoutEffect(() => {
    axios.get(`http://localhost:1234/user/userDetails/${id}`)
        .then((result) => {
            if (result.data.status === 'ok') {
                setUserDetails(result.data.data.user)
            }
            console.log(userDetails, "user details")
        })
    
  },[id])
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
    console.log("clicked",userDetails);
    dispatch(saveUserAction(userDetails,id,navigate))
    setPreviewImage(null)
  }
  
  
  
  
  
  
  
  
  
  
    return (
      <div className="container mx-auto">
  
      <Toaster position='top-center' reverseOrder={false}></Toaster>
  
      <div className='flex justify-center items-center h-screen'>
        <div className={`${styles.glass} ${extend.glass}`} style={{ width: "45%", paddingTop: '3em'}}>
  
          <div className="title flex flex-col items-center">
            <h4 className='text-5xl font-bold'>Edit user</h4>
            
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

          
  
        </div>
      </div>
    </div>
    )
}

export default EditUser