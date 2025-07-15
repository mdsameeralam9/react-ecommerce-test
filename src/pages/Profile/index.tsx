import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import "./profile.scss";
import { ClipLoader } from "react-spinners";
import useAPIPrivateRoute from "../../hooks/useAPIPrivateRoute";
import { useLocation, useNavigate } from "react-router-dom";

// some static data
const user = {
  name: "John Doe",
  email: "john.doe@example.com",
  address: "123 Main Street, Bangalore, India",
  mobile: "+91 9876543210",
  occupation: "Software Engineer",
  company: "Tech Solutions Pvt Ltd",
  imageSrc: "https://fastly.picsum.photos/id/591/800/800.jpg?hmac=_mz15a8UGapfdZncmLtJrGRFU8__ZWftHRqAWz321Wc"
};

type UserInterface = Record<string, any>

const Profile = () => {
  const [userData, setUserData] = useState<UserInterface>(user);
  const [loading, setLoading] = useState<boolean>(false);
  const axiosPrivateInstance = useAPIPrivateRoute();
  const navigate  = useNavigate();
  const location = useLocation();

  const fetchUserCred = async (signal: AbortSignal) => {
    setLoading(true)
    try {
      const response = await axiosPrivateInstance('/user', { signal });
      if (!response?.data?.ok) {
        throw new Error("samothing went wrong")
      }
      setUserData(u => ({ ...u, ...response?.data?.user }))
    } catch (error) {
      console.log(error)
      navigate('/login', {state: {from: location}, replace: true})
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
          {userData?.imageSrc ?
            <div className="imagesIconWrapuser" >
              <img src={userData?.imageSrc} alt="user icon" width={"100%"} height={"100%"} style={{ borderRadius: "50%" }} />
            </div>
            :
            <FaUserCircle className="profile-icon" />
          }
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