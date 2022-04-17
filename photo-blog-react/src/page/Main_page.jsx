import React, { useState } from "react";
import { Route } from "react-router-dom";
import axios from 'axios';
import '../css/main.css'
import img from '../img/sample1.jpg'
import Header from '../components/header.js'
import ImgBox from "../components/imgbox";
import ImgBox2 from "../components/bottom_img";
function Main() {
  return (
    <div className="wrap">
      <Header />
      <div className="main_wrap">
        <div className="main_img_box_wrap">
          <div className="top_box">
            <ImgBox position="top"/>
            <ImgBox  position="top"/>
            <ImgBox  position="top"/>
          </div>
          <div className="bottom_box">
            <ImgBox2  position="footer"/>
            <ImgBox2  position="footer"/>
            <ImgBox2  position="footer"/>
          </div>

        </div>
      </div>
    </div>
  )
}
export default Main