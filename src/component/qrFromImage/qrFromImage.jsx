import QRCode from 'qrcode'
import { useEffect, useState, useRef,forwardRef,useImperativeHandle } from 'react'
import {toPng} from 'html-to-image';
import JsPDF from "jspdf";

const QRCodeFromImage = forwardRef(({imageData, userInput}, _ref) => {
  const [qrImage, setQRImage] = useState('')
  const downloadTagRef = useRef('')

  const handleDownloadImage = ()=>{
    const element = document.getElementById('screenshot')
    if(!element){
      return;
    }
      toPng(downloadTagRef.current, { cacheBust: false })
        .then((dataUrl) => {
          const doc = new JsPDF("p", "mm", "a4");
          doc.addImage(dataUrl,"PNG", 35, 40, 150, 170)
          doc.save(`${userInput}.pdf`);
          const blobPDF = doc.output("blob");
          const blobUrl = URL.createObjectURL(blobPDF);
          window.open(blobUrl)
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
  }, function(err, qrURL){
      // if (err) {
      //    throw err
      // }
      setQRImage(qrURL);
  })
  },[imageData])

  return (
    <div>
    <section className='home-section'>
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
