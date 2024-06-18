import {useState, useRef} from 'react';
import {imageDb} from './Config';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import QRCodeFromImage from '../qrFromImage/qrFromImage';

export default function FireBaseImageUpload({error,errorClass,setErrorClass, setError}){
  const inputRef = useRef('')
  const [imgURL, setImgURL] = useState('');
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
    const imgRef = ref(imageDb, `files/${userInput}`)
    uploadBytes(imgRef,inputRef.current.files[0]).then((value)=>{
       getDownloadURL(value.ref).then((url)=>{
        setImgURL(url)
        inputRef.current.value = '';
       }).catch((error)=> {throw new Error(error.code)})
    }).catch((error)=>{ console.log(error); throw new Error("Problem in uploading file", error.code)})
  }

  const handleClick = (e)=>{
    console.log(userInput);
    if(userInput !== ''){
      e.preventDefault()
      hasExtension(inputRef.current.value)
    }
  }
    
  return (
    <>
      <div className="main_container">
        <section className={`input-group ${errorClass}`}>
          <input type="file" id="upload-files" ref={inputRef} onClick={handleUserClick}/>
          {error && <p className='error'>*{error}</p>}
          <form>
          <div className='user-input' value={userInput} onChange={(e)=>{ setUserInput(e.target.value)}}>
          <label>Add something for Title: </label>
          <input type='text' className='user-input-title' placeholder='Add something for Title' required/>
          </div>
          <button className='button button-space' onClick={handleClick}>Generate QR</button>
          </form>
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