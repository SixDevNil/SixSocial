import "./profile.scss";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import UserInfo from "../../components/profileUserInfo/UserInfo";
import Posts from "../../components/posts/Posts";
import { useLocation } from "react-router-dom";
// import Post from "../../components/post/Post";



const Profile = () => {
  const { currentUser } = useContext(AuthContext);
  const userId = parseInt(useLocation().pathname.split("/")[2]);
  console.log(userId);
  return (
    <div className="profile">
     <UserInfo userId = {userId}/>
     <Posts userPost = {currentUser} key={currentUser.id} userId={userId}/>
    </div>
  );
};

export default Profile;
