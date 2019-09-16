import * as React from 'react'
import './UploadForm.css'
import { BarLoader } from 'react-spinners'

interface UploadFormProps {}

const UploadForm: React.FunctionComponent<UploadFormProps> = () => {
  const [image, setImage] = React.useState<File>()
  const [responseURL, setResponseURL] = React.useState<string>('')
  const [loading, setLoading] = React.useState<boolean>(false)
  const [trans, setTrans] = React.useState<boolean>(false)

  const changeImage = (e:React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0])
    }
  }

  const sendConvertRequest = (targetImage: File) => {
    const data = new FormData()
    data.append('image', targetImage)
    let url = 'https://partyiser-api.herokuapp.com/convert'
    url += `?trans=${trans}`
    fetch(url, {
      method: 'POST',
      body: data,
    }).then((res) => res.json())
      .then((res) => {
        setResponseURL(res.url)
        setLoading(false)
      })
  }

  const convertImage = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (!image) return
    setLoading(true)
    sendConvertRequest(image)
  }

  const check = () => {
    setTrans((t) => !t)
  }

  return (
    <div>
      <form className="form">
        <div className="form-group files">
          <input type="file" className="form-control" onChange={changeImage} />
        </div>
      </form>
      <div className="centreWidth">
        <p>Transparency</p>
        <input type="checkbox" onChange={check} checked={trans} />
        <br />
        {
              loading
                ? <BarLoader loading={loading} width={400} />
                : <button type="button" className="partyBtn" onClick={convertImage}>Partyise Image!</button>
            }
      </div>
      { responseURL
          && (
          <a href={`${responseURL}?download=true`} download="party.gif">
            <img alt="result" id="resultImg" src={responseURL} />
          </a>
          )}

    </div>
  )
}

export default UploadForm
