import { useState } from 'react';
import image from '../scanImage.jpeg';
//import '../App.css';
let code = '1234';
export default function Login({setAuthentication, error, setError}){
    const [userData, setUserData] = useState('');

    function handleClick(){
      if(code==userData) {
        setAuthentication(true)
        setError('')
      }else{
        setError('Incorrect Password')
      }     
    }

    return <div className='login-container'>
        <div className='login-auth-box'>
        <h1 style={{'color':'#050C9C'}}>Namaste,</h1>
        <h1 style={{'color':'#3572EF'}}>Welcome! Let's started</h1>
        <span style={{'color':'#003285', 'fontWeight':'bold', "margin":'5px'}}> Enter the credentials to login </span>
        <input style={{'margin':'30px 30px 30px 0'}} type='text' value={userData} onChange={(e)=>setUserData(e.target.value)}/>
        {error && <p className='error'>*{error}</p>}
        <p><button className='login-button' onClick={handleClick}>Submit</button></p>
        </div>
        <section className='login-image-section'>
            <img src={image} alt='img' id='login-side-image'/>
        </section>
    </div>
}