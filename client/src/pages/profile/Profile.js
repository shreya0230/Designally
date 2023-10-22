// import "./profile.css";
// import Sidebar from "../../components/sidebar/Sidebar";
// import { useContext, useState } from "react";
// import { Context } from "../../context/Context";
// import axios from "axios";
// import avatar from "../../images/avatar.svg";
// import { useHistory } from 'react-router-dom';


// export default function Profile() {
//   const { user, dispatch } = useContext(Context);
//   const [password, setPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [Message, setMessage] = useState('');
//   const history = useHistory();
//   const [selectedFile, setSelectedFile] = useState(null);

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setSelectedFile(file);
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();
  
//     try {
//       const formData = new FormData();
  
//       if (selectedFile) {
//         formData.append("profilePic", selectedFile);
//       }
  
//       if (newPassword) {
//         formData.append("password", newPassword);
//       }
  
//       await axios.put(`/users/${user._id}`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
  
//       console.log("Profile and/or password updated successfully.");
//       setMessage('Your profile has been updated successfully!');
//     } catch (error) {
//       console.error("Error updating profile and/or password:", error);
//       setMessage('There is some issue updating your account. Try again!');
//     }
//   };
  

//   const handlePasswordUpdate = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.put(`/api/users/${user._id}`, {
//         password,
//         newPassword,
//       });
//       setMessage('Your account has been updated successfully!');
//       // Handle the response, e.g., show a success message
//     } catch (err) {
//       // Handle errors, e.g., show an error message
//       setMessage('There is some issue updating your account. Try again!');
//     }
//   };

//   const handleAccountDeletion = async () => {
//     try {
//       const res = await axios.delete(`/users/${user._id}`);
//       // Handle the response, e.g., redirect the user to the login page
//       setMessage('Your account has been deleted successfully!');
//       history.push('/login');
//       dispatch({ type: "LOGOUT" });
//     } catch (err) {
//       // Handle errors, e.g., show an error message
//       setMessage('There is some issue deleting your account. Try again!');
//     }
//   };

//   return (
//     <div className="settings">
//       <div className="settingsWrapper">
//         <div className="settingsTitle">
//           <div className="settingsTitleUpdate"><b>Profile</b></div>
//           {/* <div className="settingsTitleDelete" onClick={handleAccountDeletion}><i className="deleteAccount far fa-trash-alt"></i>Delete Account</div> */}
//         </div>
//         <form className="settingsForm" onSubmit={handleUpdate}>
//           <label>Profile Pic</label>
//           <div className="settingsPP">
//             <img src={selectedFile ? URL.createObjectURL(selectedFile) : user.profilePic === '' ? avatar : user.profilePic} alt="" />
//             {/* <label htmlFor="fileInput">
//               <i className="settingsPPIcon fas fa-solid fa-pen"></i>{" "}
//             </label>
//             <input
//               id="fileInput"
//               type="file"
//               style={{ display: "none" }}
//               className="settingsPPInput"
//               onChange={handleFileChange}
//             /> */}
//           </div>
//           <label>Username</label>
//           <input type="text" placeholder={user.username} name="name" readOnly/>
//           <label>Email</label>
//           <input type="email" placeholder={user.email} name="email" readOnly/>
//           <label>Password</label>
//           <input type="password" placeholder="********" name="password" value={newPassword}
//   onChange={(e) => setNewPassword(e.target.value)} readOnly/>
//           {/* <button className="settingsSubmitButton" type="submit">
//             Update
//           </button> */}
//         </form>
//       </div>
//       {Message && <p>{Message}</p>}
//       {/* <Sidebar /> */}
//     </div>
//   );
// }


import React, { useContext, useState, useEffect } from "react";
import { Context } from "../../context/Context";
import axios from "axios";
import avatar1 from "../../images/avatar.svg";
import avatar2 from "../../images/header.svg"; // Import your profile picture images
import avatar3 from "../../images/login.svg";
import avatar4 from "../../images/logo.png";
import "./profile.css";
// import avatar4 from "../../images/avatar4.jpg";
// import avatar5 from "../../images/avatar5.jpg";

export default function Profile() {
  const { user } = useContext(Context);
  const [selectedProfilePic, setSelectedProfilePic] = useState(user.selectedProfilePic);
  const [Message, setMessage] = useState('');

  const handleUpdate = async () => {
    try {
      // Send the selectedProfilePic index to the server
      await axios.put(`/users/${user._id}`, { selectedProfilePic });

      setMessage('Selected profile picture updated successfully!');
    } catch (error) {
      console.error("Error updating selected profile picture:", error);
      setMessage('There is some issue updating your profile picture. Try again!');
    }
  };

  const profilePictures = [avatar1, avatar2, avatar3, avatar4];

  useEffect(() => {
    if (selectedProfilePic === undefined) {
      setSelectedProfilePic(0); // Set to the default (avatar1) if not specified
    }
  }, [selectedProfilePic]);

  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <div className="settingsTitleUpdate"><b>Profile</b></div>
        </div>
        <div className="settingsForm">
          <label>Profile Pic</label>
          <div className="settingsPP">
            <img src={profilePictures[selectedProfilePic]} alt="Selected Profile" />
            {/* <select
              onChange={(e) => setSelectedProfilePic(e.target.value)}
              value={selectedProfilePic}
            >
              {profilePictures.map((picture, index) => (
                <option key={index} value={index}>
                  Profile {index + 1}
                </option>
              ))}
            </select> */}
          </div>
          <label>Username</label>
          <input type="text" placeholder={user.username} name="name" readOnly/>
          <label>Email</label>
          <input type="email" placeholder={user.email} name="email" readOnly/>
          <label>Password</label>
          <input type="password" placeholder="********" name="password"  readOnly/>
          
        </div>
      </div>
      {Message && <p>{Message}</p>}
    </div>
  );
}
