import { useState } from 'react';
import image from '../scanImage.jpeg';
import { BiShow } from "react-icons/bi";

export default function Login({setAuthentication, error, setError}){
    const [userData, setUserData] = useState('');
    const [togglePwd, setTogglePwd] = useState(false);

    function handlePasswordToggle(){
      
      if(togglePwd === false){
        document.getElementById('user-input').type='text'
        setTogglePwd(!togglePwd)
      }else{
        document.getElementById('user-input').type='password'
        setTogglePwd(!togglePwd)
      }
      

    }
    function handleClick(){
      console.log(process.env.REACT_APP_CODE);
      if(process.env.REACT_APP_CODE === userData) {
        setAuthentication(true)
        setError('')
      }else{
        setError('Incorrect Password')
      }     
    }

    return (
      <div className="login-container">
        <div className="login-auth-box">
          <h1 style={{ color: "#050C9C" }}>Namaste,</h1>
          <h1 style={{ color: "#3572EF" }}>Welcome! Let's started</h1>
          <div className="input-container"  style={{ margin: "30px 0px 0px 0" }}>
            <span
              className='input-label'
              style={{ color: "#003285", fontWeight: "bold"}}
            >
              {" "}
              Enter the credentials to login{" "}
            </span>
            <div>
            <input
              id="user-input"
              type="password"
              value={userData}
              onChange={(e) => setUserData(e.target.value)}
            />
            {userData && (
              <span id="#password-field" onClick={handlePasswordToggle}>
                <BiShow />
              </span>
            )}
            {error && <p className="error">*{error}</p>}
            </div>

          </div>
          <p>
            <button className="login-button" onClick={handleClick}>
              Submit
            </button>
          </p>
        </div>
        <section className="login-image-section">
          <img src={image} alt="img" id="login-side-image" />
        </section>
      </div>
    );
}