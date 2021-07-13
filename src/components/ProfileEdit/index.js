import React, {useState} from 'react'
import API from '../../utils/API';
import './style.css'

export default function ProfileEdit(props) {
  
  const [profilePic, setProfilePic] = useState({ profilePicture: ""});
  const [previewSource, setPreviewSource] = useState()

  const token = localStorage.getItem('token')


  const setFile = event => {
    event.preventDefault();
    const file = event.target.files[0];
    previewFile(file)

    setProfilePic({profilePicture: file.name})
  }

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result)
    }
  }

  const uploadProfilePic = () => {
    if (!profilePic) return;

    const picBody = {
      profilePic: previewSource
    }
    console.log(picBody, "reached")
    API.uploadProfilePic(picBody, token)
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }


  return (
    <div className="profile-edit">
      <input 
        type="file" 
        name="image"
        // value={profilePic.profilePicture}
        className="file-upload" 
        onChange={setFile}/>

      <button className="btn-primary" onClick={uploadProfilePic}>Upload</button>

      {previewSource && (
        <img 
          src={previewSource} 
          alt="chosen" 
          style={{ height: '300px'}} 
          />
      )}

    </div>
  )
}
