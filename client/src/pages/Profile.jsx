/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  logOutStart,
  logOutSuccess,
  logOutFailure,
  deleteUserAccountStart,
  deleteUserAccountSuccess,
  deleteUserAccountFailure,
} from "../redux/user/userSlice";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import MyBookings from "./user/MyBookings";
import UpdateProfile from "./user/UpdateProfile";
import MyHistory from "./user/MyHistory";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [profilePhoto, setProfilePhoto] = useState(undefined);
  const [photoPercentage, setPhotoPercentage] = useState(0);
  const [activePanelId, setActivePanelId] = useState(1);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    address: "",
    phone: "",
    avatar: "",
  });

  useEffect(() => {
    if (currentUser !== null) {
      setFormData({
        username: currentUser.username,
        email: currentUser.email,
        address: currentUser.address,
        phone: currentUser.phone,
        avatar: currentUser.avatar,
      });
    }
  }, [currentUser]);

  const handleProfilePhoto = (photo) => {
    try {
      dispatch(updateUserStart());
      const storage = getStorage(app);
      const photoname = new Date().getTime() + photo.name.replace(/\s/g, "");
      const storageRef = ref(storage, `profile-photos/${photoname}`);
      const uploadTask = uploadBytesResumable(storageRef, photo);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.floor(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setPhotoPercentage(progress);
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadUrl) => {
            const res = await fetch(
              `/api/user/update-profile-photo/${currentUser._id}`,
              {
                method: "POST",
                headers: {
                  "Content-Type": " application/json",
                },
                body: JSON.stringify({ avatar: downloadUrl }),
              }
            );
            const data = await res.json();
            if (data?.success) {
              alert(data?.message);
              setFormData({ ...formData, avatar: downloadUrl });
              dispatch(updateUserSuccess(data?.user));
              setProfilePhoto(null);
              return;
            } else {
              dispatch(updateUserFailure(data?.message));
            }
            dispatch(updateUserFailure(data?.message));
            alert(data?.message);
          });
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleSetDefaultPhoto = () => {
    // Default profile photo URL
    const defaultPhotoUrl = "https://w1.pngwing.com/pngs/743/500/png-transparent-circle-silhouette-logo-user-user-profile-green-facial-expression-nose-cartoon-thumbnail.png";
    
    // Update the profile photo with the default URL
    try {
      dispatch(updateUserStart());
      fetch(`/api/user/update-profile-photo/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ avatar: defaultPhotoUrl }),
      }).then((res) => res.json()).then((data) => {
        if (data?.success) {
          alert(data?.message);
          setFormData({ ...formData, avatar: defaultPhotoUrl });
          dispatch(updateUserSuccess(data?.user));
        } else {
          dispatch(updateUserFailure(data?.message));
          alert(data?.message);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    try {
      dispatch(logOutStart());
      const res = await fetch("/api/auth/logout");
      const data = await res.json();
      if (data?.success !== true) {
        dispatch(logOutFailure(data?.message));
        return;
      }
      dispatch(logOutSuccess());
      navigate("/login");
      alert(data?.message);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteAccount = async (e) => {
    e.preventDefault();
    const CONFIRM = confirm(
      "Are you sure? Your account will be permanently deleted!"
    );
    if (CONFIRM) {
      try {
        dispatch(deleteUserAccountStart());
        const res = await fetch(`/api/user/delete/${currentUser._id}`, {
          method: "DELETE",
        });
        const data = await res.json();
        if (data?.success === false) {
          dispatch(deleteUserAccountFailure(data?.message));
          alert("Something went wrong!");
          return;
        }
        dispatch(deleteUserAccountSuccess());
        alert(data?.message);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="flex w-full flex-wrap max-sm:flex-col p-4">
      {currentUser ? (
        <>
          <div className="w-[40%] p-4 max-sm:w-full">
            <div className="flex flex-col items-center gap-4 p-4">
              <div className="w-full flex flex-col items-center relative">
                <img
                  src={
                    (profilePhoto && URL.createObjectURL(profilePhoto)) ||
                    formData.avatar
                  }
                  alt="Profile photo"
                  className="w-64 min-h-52 max-h-64 rounded-lg cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105"
                  onClick={() => fileRef.current.click()}
                />
                <input
                  type="file"
                  name="photo"
                  id="photo"
                  hidden
                  ref={fileRef}
                  accept="image/*"
                  onChange={(e) => setProfilePhoto(e.target.files[0])}
                />
                <label
                  htmlFor="photo"
                  id="photoLabel"
                  className="w-64 bg-slate-300 absolute bottom-0 p-2 text-center text-lg text-white font-semibold rounded-b-lg"
                  hidden
                >
                  Choose Photo
                </label>
              </div>
              {profilePhoto && (
                <div className="flex w-full justify-between gap-1">
                  <button
                    onClick={() => handleProfilePhoto(profilePhoto)}
                    className="bg-green-700 p-2 text-white mt-3 flex-1 hover:opacity-90"
                  >
                    {loading ? `Uploading...(${photoPercentage}%)` : "Upload"}
                  </button>
                </div>
              )}
              <button
                onClick={handleSetDefaultPhoto}
                className="bg-yellow-500 p-2 mt-3 text-white flex-1 hover:opacity-90"
              >
                Set Default Photo
              </button>
              <p
                style={{
                  width: "100%",
                  borderBottom: "1px solid black",
                  lineHeight: "0.1em",
                  margin: "10px",
                }}
              >
                <span className="font-semibold" style={{ background: "#fff" }}>
                  Details
                </span>
              </p>
              <div className="w-full flex justify-between px-1">
                <button
                  onClick={handleLogout}
                  className="text-red-600 text-lg font-semibold self-start border border-red-600 p-2 rounded-lg hover:bg-red-600 hover:text-white"
                >
                  Log-out
                </button>
                <button
                  onClick={() => setActivePanelId(3)}
                  className="text-white text-lg self-end bg-gray-500 p-2 rounded-lg hover:bg-gray-700"
                >
                  Edit Profile
                </button>
              </div>
              <div className="w-full shadow-xl rounded-lg p-4">
                <p className="text-3xl font-semibold m-1">
                  Hi {currentUser.username}!
                </p>
                <p className="text-lg font-semibold">Email: {currentUser.email}</p>
                <p className="text-lg font-semibold">Phone: {currentUser.phone}</p>
                <p className="text-lg font-semibold">Address: {currentUser.address}</p>
              </div>
              <button
                onClick={handleDeleteAccount}
                className="text-red-600 hover:underline mt-3"
              >
                Delete account
              </button>
            </div>
          </div>

          <div className="w-[60%] max-sm:w-full">
            <div>
              <nav className="w-full border-blue-500 border-b-4">
                <ul className="flex gap-6 p-2 justify-center">
                  <li>
                    <button
                      className={`${
                        activePanelId === 1 ? "text-blue-600" : "text-gray-500"
                      } text-lg font-semibold`}
                      onClick={() => setActivePanelId(1)}
                    >
                      My Bookings
                    </button>
                  </li>
                  <li>
                    <button
                      className={`${
                        activePanelId === 2 ? "text-blue-600" : "text-gray-500"
                      } text-lg font-semibold`}
                      onClick={() => setActivePanelId(2)}
                    >
                      My History
                    </button>
                  </li>
                  <li>
                    <button
                      className={`${
                        activePanelId === 3 ? "text-blue-600" : "text-gray-500"
                      } text-lg font-semibold`}
                      onClick={() => setActivePanelId(3)}
                    >
                      Update Profile
                    </button>
                  </li>
                </ul>
              </nav>
              <div className="p-4 mt-4">
                {activePanelId === 1 && <MyBookings />}
                {activePanelId === 2 && <MyHistory />}
                {activePanelId === 3 && <UpdateProfile />}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="w-full flex justify-center items-center">
          <h2 className="text-2xl">User not logged in!</h2>
        </div>
      )}
    </div>
  );
};

export default Profile;
