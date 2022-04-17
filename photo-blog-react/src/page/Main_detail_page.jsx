import React, { useEffect, useState } from "react";
import Header2 from "../components/detail_header";
import '../css/main_detail.scss'
import img1 from '../img/sample6.jpg'
import SlickComponent from'../components/main_detail_slick'

function MainDetail(){
  
  return (
    <div className="wrap">
      <Header2 />
      <div className="main_detail">
        <p className="main_detail_main_title">Main_title</p>
        <p className="main_detail_sub_title">sub_title</p>
        <div className="main_detail_box">
          <div className="main_img_box">
            <img src={img1} alt="" />
          </div>
          <div className="main_desc_wrap">
            <p className="hash_tag">#풍경 #산 #안개</p>
          </div>
        </div>
        <div className="SimpleSlider">
          <SlickComponent/>
        </div>
      </div>
    </div>
  )
}

export default MainDetail
