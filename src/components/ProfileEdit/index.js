import React, { useState, useEffect } from "react";
// import { Image } from "react-bootstrap";
import API from "../../utils/API";
import "./style.css";

export default function ProfileEdit(props) {
  const [currentProfPic, setCurrentProfPic] = useState("");
  const [profilePic, setProfilePic] = useState({ profilePicture: "" });
  const [previewSource, setPreviewSource] = useState();

  const token = localStorage.getItem("token");
  const baseURL =
    "http://res.cloudinary.com/dsknrjo2r/image/upload/v1626207523/";
  const profPicURL = props.user.profilePictures;

  useEffect(() => {
    setCurrentProfPic(
      `${baseURL}${profPicURL[profPicURL.length - 1].profilePicture}`
    );
  }, [profPicURL]);

  const setFile = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    previewFile(file);

    setProfilePic({ profilePicture: file.name });
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const uploadProfilePic = () => {
    if (!profilePic) return;

    const picBody = {
      profilePic: previewSource,
    };
    console.log(picBody, "reached");
    API.uploadProfilePic(picBody, token)
      .then((res) => {
        console.log(res);
        // setPreviewSource("")
      })
      .catch((err) => console.log(err));
  };

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
          // value={profilePic.profilePicture}
          // className="file-upload"
          onChange={setFile}
        />

        <button className="btn-primary" onClick={uploadProfilePic}>
          {currentProfPic ? "Change" : "Upload"}
        </button>
      </div>
    </div>
  );
}
