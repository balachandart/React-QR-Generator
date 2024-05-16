import React,{useState} from 'react'

const QrCode = () => {
  const [img,setImg]=useState()
  const [loading,setLoading]=useState(false)
  const[name,setName]=useState("")
  const[size,setSize]=useState("")
function downloadQR(){
        fetch(img)
        .then((response)=>response.blob())
        .then((blob)=>{
          const link=document.createElement("a")
          link.href=URL.createObjectURL(blob); // download data && image
          link.download="QR.png";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link)
 }).catch((err)=>{
  console.log("Error downloading QR Code",err)})
   setName("")
  setSize("")}
   async function generateQR(){
       setLoading(true)
        try{
          const url= await `https://api.qrserver.com/v1/create-qr-code/?size=${size}&data=${name}`
          setImg(url)
        }
        catch(error)
        {
          console.log(error)
        }
        finally{
          setLoading(false)
        }
  }
  return (
    <div className='app-container'>
       <h1>QR CODE GENERATOR</h1>
        {loading && <p>Please wait...</p>}
        {img && <img src={img} alt="" className='QrImage' />}
        <div>
        <label htmlFor="dataInput" className='input-label'>
        Data for QR code:
        </label>
        <input type="text"
        id="dataInput"
        placeholder='Enter data for QR code' 
        autoComplete='on'
        value={name}
        onChange={(e)=>setName(e.target.value)}
        required/>

        <label htmlFor="sizeInput" className='input-label'>
        Image size(eg., 150):
       </label>
    
        <input type="number"
        id="sizeInput"
        placeholder='Enter image size'
        value={size}
        onChange={(e)=>setSize(e.target.value)}
        required/>
        <button onClick={generateQR}
        className='generate'
        disabled={loading===true}>
        Generate QR Code
        </button>
        <button
        className='download'
        onClick={downloadQR}>
        Download QR Code
        </button>
        </div>
        <p className='footer'>Designed By <a href="https://balachandart.github.io/Portfolio/">balachandar.</a></p>
    </div>
  )
}

export default QrCode