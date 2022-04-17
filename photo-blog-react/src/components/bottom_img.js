import React, { useState } from "react";
import { Route } from "react-router-dom";
import axios from 'axios';
import imgSrc from '../img/sample1.jpg'
import imgSrc2 from '../img/sample2.jpg'
import '../css/main.css'
function ImgBox2() {
  return (
    <div className="main_img_box">
      <div className="img_box">
        <img src={imgSrc2} alt="er" />
      </div>
      <div className="title_box">
        <span>title</span> <span>— #a #b #c</span>
      </div>
    </div>
  )
}
export default ImgBox2