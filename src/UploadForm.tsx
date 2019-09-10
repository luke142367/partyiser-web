import * as React from 'react';
import './UploadForm.css'

interface UploadFormProps {
}

const UploadForm: React.FunctionComponent<UploadFormProps> = (props) => {

  const [image, setImage] = React.useState<File>()
  const [responseURL, setResponseURL] = React.useState<string>('')

  const changeImage = (e:React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0){
      setImage(e.target.files[0])
    }
  }

  const convertImage = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (!image) return
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
    })
    console.log("Request sent")
  }

  return (
      <div>
          <form className="form">
            <div className="form-group files">
                <input type="file" className="form-control" onChange={changeImage}></input>    
            </div>
              <button className="partyBtn" onClick={convertImage}>Partyise Image!</button>
          </form>
          { responseURL && <img alt="result" id="resultImg" src={responseURL}/> }

      </div>
  );
};

export default UploadForm;
