import React, { useEffect, useState } from "react";
import MainLogo from '../img/logo.svg'
import '../css/header2.css'

function Header2(){
  return(
    <div className="header2">
      <img src={MainLogo}alt="main_logo" className="header_logo"/>
    </div>
  )
}

export default Header2