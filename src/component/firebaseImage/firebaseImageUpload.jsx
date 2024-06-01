import {useState, useRef} from 'react';
import {imageDb} from './Config';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import {v4} from 'uuid';
import QRCodeFromImage from '../qrFromImage/qrFromImage';

export default function FireBaseImageUpload(){
  const inputRef = useRef('')
  const [imgURL, setImgURL] = useState('');
  const [error, setError] = useState('')
  const [errorClass, setErrorClass] = useState('');
  const [userInput, setUserInput] = useState('');
  const childStateRef = useRef();

  const handleUserClick =()=>{
    childStateRef.current.resetDisplay()
  }
  const hasExtension =(filename) =>{
    const allowedExt = ["jpg", "png", "jpeg"];
    const fileExt = filename.split(".");
    const isAllowed = allowedExt.includes(fileExt[fileExt.length - 1]);
    if (isAllowed) {
      manageFileUpload()
      setErrorClass('')
      setError("");
    } else {
      setError("Incorrect format. Only .jpg, .jpeg or .png allowed");
      setErrorClass('input-error')
      inputRef.current.value=''
      setImgURL('')
    }
  }
  
  const manageFileUpload = () =>{
    const imgRef = ref(imageDb, `files/${v4()}`)
    uploadBytes(imgRef,inputRef.current.files[0]).then((value)=>{
       getDownloadURL(value.ref).then((url)=>{
        setImgURL(url)
        inputRef.current.value = '';
       }).catch((error)=> {throw new Error(error.code)})
    }).catch((error)=>{ console.log(error); throw new Error("Problem in uploading file", error.code)})
  }

  const handleClick = ()=>{
    hasExtension(inputRef.current.value)
  }
    
  return (
    <>
      <h1>Generate your own QR Code!</h1>
      <div className="main_container">
        <section className={`input-group ${errorClass}`}>
          <input type="file" id="upload-files" ref={inputRef} onClick={handleUserClick}/>
          {error && <p className='error'>*{error}</p>}
          <div className='user-input' value={userInput} onChange={(e)=>{ setUserInput(e.target.value)}}>
          <label>Add something for Title: </label>
          <input type='text' placeholder='Add something for Title'/>
          </div>
          <button className='button button-space' onClick={handleClick}>Generate QR</button>
        </section>
        
        <section>
        <p>Share your <span style={{"fontWeight":'bold'}}>personal code</span> for  whatever reason!</p>
        <div className='qr_section'>
        <QRCodeFromImage imageData={imgURL} userInput={userInput} ref={childStateRef}/>
        </div>
        </section>
      </div>
    </>
  );
}