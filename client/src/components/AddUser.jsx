// import {Link} from 'react-router-dom'
import profile from '../assets/profile.png'
import toast, {Toaster} from 'react-hot-toast'
import style from '../styles/Register.module.css'
import { useState } from 'react'
import { validateEmail, validatePassword, validateUsername } from '../helper/validate'
import { useDispatch } from 'react-redux';

import { useNavigate } from 'react-router-dom';
import { addUser } from '../redux/Action/adminAction'

const AddUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [previewImage,setPreviewImage]=useState(null);
  // const [image, setImage] = useState(null);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    image:''
  });
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const name=event.target.name
    setFormData(prevData => ({ ...prevData,[name]:file}))
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
    setFormData(prevData => ({ ...prevData, [name]: value}))
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if(!validateEmail(formData?.email)){
      toast.error("Invalid email")
      return
    }
    if(!validatePassword(formData?.password)){
      toast.error("Password must contain 8 characters")
      return
    }
    if(!validateUsername(formData?.username)){
      toast.error("Invalid User Name")
      return
    }
    console.log(formData);
    dispatch(addUser(formData,navigate))

};
  return (
    <>
      <div className="container mx-auto">
        <Toaster position="top-center" reverseOrder={false}></Toaster>
        <div className="flex justify-center items-center h-screen">
          <div className={style.glass}>
            <div className="title flex flex-col items-center">
              <h4 className="text-5xl font-bold">Add User</h4>
              
            </div>
            <form className="py-1" onSubmit={handleSubmit}>
              <div className="profile flex justify-center py-4">
              <label htmlFor="profile">
                    <img  src={previewImage?previewImage :profile} className={style.profile_img} alt="avatar" />
                  </label>
                  
                  <input onChange={handleImageChange} type="file" id='profile' name='image' />
              </div>
              <div className="textbox textbox flex flex-col items-center gap-6">
              <input
                  onChange={handleChange}
                  type="text"
                  name="username"
                  className={style.textbox}
                  placeholder="User Name"
                  required
                />
                <input
                  onChange={handleChange}
                  type="email"
                  name="email"
                  className={style.textbox}
                  placeholder="Email"
                  required
                />
                <input
                  onChange={handleChange}
                  type="password"
                  name="password"
                  className={style.textbox}
                  placeholder="Password"
                  required
                />
                <button
                  type="submit"
                  className="border bg-indigo-500 hover:bg-red-500 w-3/4 py-4 rounded-lg text-gray-50 text-xl shadow-sm text-center"
                >
                  {" "}
                  Lets GO
                </button>
              </div>
              
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddUser;
