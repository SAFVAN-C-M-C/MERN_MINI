import {Link, useNavigate} from 'react-router-dom'
import profile from '../assets/profile.png'
import toast, {Toaster} from 'react-hot-toast'
import style from '../styles/Username.module.css'
import { useState } from 'react'
import { validateEmail, validatePassword } from '../helper/validate'
import { loginUserAction } from '../redux/Action/userAction'
import { useDispatch } from 'react-redux'
const Username = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const handleChange = (e) => {
    const {name , value} = e.target
    setFormData(prevData => ({ ...prevData, [name]: value}))
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if(!validateEmail){
      toast.error("Invalid email")
      return
    }
    if(!validatePassword){
      toast.error("Password must contain 8 characters")
    }
    dispatch(loginUserAction(formData,navigate))

};
  // const formik = useFormik({
  //   initialValues : {
  //     username : ''
  //   },
  //   validate : usernameValidate,
  //   validateOnBlur: false,
  //   validateOnChange: false,
  //   onSubmit : async values => {
  //     setUsername(values.username);
  //     navigate('/password')
  //   }
  // })
  return (
    <div className="container mx-auto">
      <Toaster position='top-center' reverseOrder={false}></Toaster>
      <div className="flex justify-center items-center h-screen">
        <div className={style.glass}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Hello Again!</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Explore More by connecting with us.
            </span>
          </div>
          <form className="py-1" onSubmit={handleSubmit}>
            <div className="profile flex justify-center py-4">
              <img src={profile} className={style.profile_img} alt="avtar" />
            </div>
            <div className="textbox textbox flex flex-col items-center gap-6">
              <input onChange={handleChange} type="text" name='email' className={style.textbox} placeholder="Email" />
              <input onChange={handleChange} type="password" name='password' className={style.textbox} placeholder="Password" />
              <button type="submit" className="border bg-indigo-500 hover:bg-red-500 w-3/4 py-4 rounded-lg text-gray-50 text-xl shadow-sm text-center"> Lets GO</button>
            </div>
            <div className="text-center py-4">
              <span className="text-gray-500">Not a Member <Link to='/register' className="text-red-500" >Register Now</Link></span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Username;
