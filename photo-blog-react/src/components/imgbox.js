import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import axios from 'axios';
import imgSrc from '../img/sample1.jpg'
import '../css/main.css'
function ImgBox({position}) {
  
  return (
    <div className="main_img_box">
      <div className="title_box">
        <span className="title_box_title">title </span> <span>— #a #b #c</span>
      </div>
      <div className="img_box">
        
        <img src={imgSrc} alt="er" />
      </div>
    </div>
  )
}

 export default ImgBox