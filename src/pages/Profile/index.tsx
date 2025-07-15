import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import "./profile.scss";
import { axiosInstance } from "../../services/APIConfig";
import { ClipLoader } from "react-spinners";
import useAuth from "../../hooks/useAuth";

// some static data
const user = {
  name: "John Doe",
  email: "john.doe@example.com",
  address: "123 Main Street, Bangalore, India",
  mobile: "+91 9876543210",
  occupation: "Software Engineer",
  company: "Tech Solutions Pvt Ltd"
};

type UserInterface = Record<string, any>

const Profile = () => {
  const [userData, setUserData] = useState<UserInterface>(user);
  const [loading, setLoading] = useState<boolean>(false);
  const { accessToken } = useAuth()

  const fetchUserCred = async (signal) => {
    setLoading(true)
    try {
      const response = await axiosInstance.get('/user',
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`
          },
          withCredentials: true,
          signal
        }
      );
      if (!response?.data?.ok) {
        throw new Error("samothing went wrong")
      }
      setUserData(u => ({ ...u, ...response?.data?.user }))
    } catch (error) {
      alert("failed to fetch user data")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const controller = new AbortController()
    fetchUserCred(controller.signal)
    return () => {
      controller.abort()
    }
  }, [])

  return (
    <div className="profile-container">
      {loading && <ClipLoader />}
      {!loading &&
        <div className="profile-card">
          <FaUserCircle className="profile-icon" />
          <h2>{userData?.name}</h2>
          <p><strong>Email:</strong> {userData?.email}</p>
          <p><strong>Mobile:</strong> {userData?.mobile}</p>
          <p><strong>Address:</strong> {userData?.address}</p>
          <p><strong>Occupation:</strong> {userData?.occupation}</p>
          <p><strong>Company:</strong> {userData?.company}</p>
        </div>
      }
    </div>
  );
};

export default Profile;