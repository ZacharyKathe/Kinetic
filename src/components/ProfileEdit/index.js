import React, { useState, useEffect } from "react";
// import { Image } from "react-bootstrap";
import API from "../../utils/API";
import "./style.css";

export default function ProfileEdit(props) {
  const [currentProfPic, setCurrentProfPic] = useState("");
  const [previewSource, setPreviewSource] = useState();

  const token = localStorage.getItem("token");
  const profPicURL = props.user.profilePictures;

  useEffect(() => {
    if (profPicURL && profPicURL.length > 0) {
    setCurrentProfPic(
      `${profPicURL ? profPicURL[profPicURL.length - 1].profilePicture : ""}`
    );
    }
  }, [profPicURL]);

  const setFile = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    previewFile(file);

  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const uploadProfilePic = () => {
    if (!previewSource) return;

    const picBody = {
      profilePic: previewSource,
    };
    console.log(picBody, "reached");
    API.uploadProfilePic(picBody, token)
      .then((res) => {
        console.log(res);
        alert("Profile Picture Updated!")
      })
      .catch((err) => console.log(err));
  };

  const deleteProfilePic = () => {
    if (!currentProfPic) return;
    const picId = profPicURL[profPicURL.length - 1].id

    API.deleteProfilePic(picId, token)
      .then((res) => {
        console.log(res);
        alert("Profile picture deleted!")
      })
      .catch(err => console.log(err))
  }

  return (
    <div className="profile-edit">
      <div className="main-prof-pic">
        {previewSource ? (
          <img src={previewSource} alt="chosen" className="profile-pic" />
        ) : (
          <img
            src={currentProfPic}
            alt="current profile pic"
            className="profile-pic"
          />
        )}
        <div className="user-info">
          <p>{props.user.username}</p>
        </div>
      </div>

      <div className="file-upload">
        <input
          type="file"
          name="image"
          onChange={setFile}
        />

        <button className="btn-primary" onClick={uploadProfilePic}>
          {currentProfPic ? "Change" : "Upload"}
        </button>
        <div className="p-2"/>
        <button className="btn-primary" onClick={deleteProfilePic}>
          Delete
        </button>
      </div>
    </div>
  );
}
