import React from 'react';
import Header2 from '../components/detail_header';
import '../css/file_upload.scss'

function FileUpload(){
  return(
    <div>
      <Header2></Header2>
      <div className='file_up_wrap'>
        <div className='main_side_menu'>
          <div className="main_side_icon">
            <i className='xi-file-upload file_up_icon'></i>
            <p>파일업로드</p>
          </div>
          <div className="main_side_icon">
            <i className='xi-file-image file_manage'></i>
            <p>파일관리</p>
          </div>
          <div className="main_side_icon">
            <i className='xi-user-plus user_manage'></i>
            <p>회원관리</p>
          </div>
        </div>
        <div className='file_up_main'>
          <p className='file_up_title'>파일 업로드</p>
          <div className='file_up_main_wrap'>
            <div className='file_up_box_section'>
              <div className="file_up_box">

              </div>
              <div className="file_up_box_btn">
                파일 올리기
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
export default FileUpload