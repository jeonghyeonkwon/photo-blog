import React, { useState } from 'react';
import { BrowserRouter, Link, Route, Router, Switch } from 'react-router-dom'
import './App.css';
import Main from './page/Main_page.jsx'
import LoginPage from './page/Login_page';
import MainDetail from './page/Main_detail_page';
import FileUpload from './page/File_upload_page';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <LoginPage />
        </Route>
        <Route exact path="/main">
          <Main/>
          
        </Route>
        <Route exact path="/main_detail">
          <MainDetail />
        </Route>
        <Route exact path='/file_upload'>
          <FileUpload />
        </Route>
      </Switch>
      </BrowserRouter>
     
    </div>
  );
}
export default App;
