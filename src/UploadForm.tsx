import * as React from 'react';
import './UploadForm.css'
import { BarLoader } from 'react-spinners';

interface UploadFormProps {
}

const UploadForm: React.FunctionComponent<UploadFormProps> = (props) => {

  const [image, setImage] = React.useState<File>()
  const [responseURL, setResponseURL] = React.useState<string>('')
  const [loading, setLoading] = React.useState<boolean>(false)

  const changeImage = (e:React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0){
      setImage(e.target.files[0])
    }
  }

  const convertImage = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (!image) return
    setLoading(true)
    console.log("Uploading image", image.name)
    sendConvertRequest(image)
  }

  const sendConvertRequest = (image: File) => {
    const data = new FormData()
    data.append('image', image)
    fetch('https://partyiser-api.herokuapp.com/convert', {
      method: 'POST',
      body: data
    }).then(res => res.json())
    .then(res => {
      console.log(res)
      setResponseURL(res.url)
      setLoading(false)
    })
    console.log("Request sent")
  }

  return (
      <div>
          <form className="form">
            <div className="form-group files">
                <input type="file" className="form-control" onChange={changeImage}></input>    
            </div>
              {
                loading ?
                <BarLoader loading={loading}  width={400} />
                :
                <button className="partyBtn" onClick={convertImage}>Partyise Image!</button>
              }
          </form>
          { responseURL && 
          <a href={responseURL + '?download=true'} download='party.gif'>
            <img alt="result" id="resultImg" src={responseURL}/> 
          </a>
          }

      </div>
  );
};

export default UploadForm;
