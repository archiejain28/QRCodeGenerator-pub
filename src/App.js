import {useState} from 'react';
import './App.css';
import FireBaseImageUpload from './component/firebaseImage/firebaseImageUpload';
import Login from './component/login';

function App() {
  const [authenticated, setAuthentication] = useState(false)
  const [error, setError] = useState('')
  const [errorClass, setErrorClass] = useState('');
  return (
    <div className="App">
     <h1>Generate your own QR Code!</h1>
     {authenticated ? <FireBaseImageUpload error={error} errorClass={errorClass} setError={setError} setErrorClass={setErrorClass} /> :
      <Login error={error}  setError={setError} setAuthentication={setAuthentication}/>}
    </div>
  );
}

export default App;
