import QRCode from 'qrcode'
import { useEffect, useState, useRef,forwardRef,useImperativeHandle } from 'react'
import {toPng} from 'html-to-image';

const QRCodeFromImage = forwardRef(({imageData, userInput}, _ref) => {
  const [qrImage, setQRImage] = useState('')
  const downloadTagRef = useRef('')

  const handleDownloadImage = ()=>{
    const element = document.getElementById('screenshot')
    console.log(element);
    if(!element){
      return;
    }
      toPng(downloadTagRef.current, { cacheBust: false })
        .then((dataUrl) => {
          console.log(dataUrl);
          const link = document.createElement("a");
          link.download = "my-image-name.png";
          link.href = dataUrl;
          link.click();
        })
        .catch((err) => {
          console.log(err);
        });
  }

  useImperativeHandle(_ref,()=>({
    resetDisplay: () => {
      setQRImage('')
    }}))

  useEffect(()=>{
    QRCode.toDataURL(imageData, {
      width: 300,
      margin: 2,
      color:{
        dark: '#FFFAF4',
        light: '#0000' 
      }
  }, (err, qrURL) => {
      if (err) return console.error(err)
      setQRImage(qrURL)
  })
  },[imageData])

  return (
    <div>
    <section>
        <div id='screenshot' ref={downloadTagRef} >
        {qrImage ?<>
        <img src={qrImage} alt="img"/>
        <p style={{"margin":"0px"}}>{userInput}</p>
        </> : <p className='scan-text'>Upload image to get <span style={{"fontWeight":'bold'}}>Encoded code !</span></p> }
         </div> 
         {qrImage && <button className='button download-button' style={{"width":"80%"}} onClick={handleDownloadImage}>Download</button>}
    </section>
</div>
  );
});

export default QRCodeFromImage;
