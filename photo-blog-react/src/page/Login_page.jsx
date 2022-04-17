import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import '../App.css';
import '../css/login.css';
import MainLogin from '../components/login_main';
import SingUp from '../components/signup';
import { useSelector, useDispatch } from 'react-redux';
import { userChangeForm,userInitialize } from '../modules/userReducer';
import userReducer from '../modules/userReducer';
function LoginPage() {
  const dispatch = useDispatch()
  const changeForm = (popupType)=>{
    dispatch(userChangeForm(popupType)) 
  }
  const {type} = useSelector(({userReducer})=>({
    type  : userReducer.formType
  }))
 
  useEffect(
    ()=>{dispatch(userInitialize())}
  ,[])
  return (
    <div className='login_wrap'>
      
      <div className="black_box"></div>
      <div className='gray_box'></div>
      {type==='login'?<MainLogin onChangeForm={changeForm} />:<SingUp onChangeForm={changeForm}/>}
      
      
      <div className="black_box2"></div>
      <div className='gray_box2'></div>
    </div>
  )
}
export default LoginPage