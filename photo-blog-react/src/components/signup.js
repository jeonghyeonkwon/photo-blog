import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

import '../css/login.css'
import '../css/sign_up.css'

function SingUp({onChangeForm}) {
 
  return(
    <div className='logo_plus_wrap'>
      
      <div className='main_login'>
        <form className='login_form sign_form'  action="">
          <p className='sign_title'>Sign Up</p>
          <div className='sign_wrap'>
            <div className='sign_list'>
              <p>아이디</p>
              <div className='sign_list_input_box'>
                <input type="text" placeholder='아이디를 입력하세요' className='sign_input' name='sign_id_input'autoComplete='off'/>
                <div className='deli_btn deli_id'>중복확인</div>
              </div>
            </div>
            <div className='sign_list'>
              <p>비밀번호</p>
              <div className='sign_list_input_box one_input_box'>
                <input type="password" placeholder='비밀번호를 입력하세요' className='sign_input one_input' name='sign_pass_input'autoComplete='off'/>
              </div>
            </div>
            <div className='sign_list'>
              <p>비밀번호 확인</p>
              <div className='sign_list_input_box one_input_box'>
                <input type="password" placeholder='비밀번호를 확인' className='sign_input one_input' name='sign_pass_check_input'autoComplete='off'/>
              </div>
            </div>
            <div className='sign_list'>
              <p>이름</p>
              <div className='sign_list_input_box one_input_box'>
                <input type="text" placeholder='이름을 입력하세요' className='sign_input one_input' name='sign_name_input'autoComplete='off'/>
              </div>
            </div>
            <div className='sign_list'>
              <p>전화번호</p>
              <div className='sign_list_input_box one_input_box'>
                <input type="text" placeholder='전화번호를 입력하세요' className='sign_input one_input' name='sign_number_input' autoComplete='off'/>
              </div>
            </div>
            <div className='sign_list'>
              <p>이메일</p>
              <div className='sign_list_input_box'>
                <input type="text" placeholder='이메일을 입력하세요' className='sign_input' name='sign_email_input'autoComplete='off'/>
                <div className='deli_btn deli_email'>중복확인</div>
              </div>
            </div>
            <div className='sign_list'>
              <p>코드입력</p>
              <div className='sign_list_input_box'>
                <input type="text" placeholder='코드를 입력하세요' className='sign_input' name='sign_id_input' autoComplete='off'/>
                <div className='deli_btn code_check_btn'>코드확인</div>
              </div>
            </div>
            <div className='sign_btn_wrap'>
              <div>회원가입</div>
              <div onClick={()=>onChangeForm('login')}>가입취소</div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
export default SingUp