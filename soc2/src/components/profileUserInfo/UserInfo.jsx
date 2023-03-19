import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailIcon from "@mui/icons-material/Email";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "./userInfo.scss";
import { useQuery } from "react-query";
import { makerequest } from "../../axios";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext.js";

const UserInfo = ({ userId }) => {

  const {currentUser} = useContext(AuthContext)

  const { isLoading, error, data } = useQuery(["likes"], () =>
    makerequest.get("/users/find/" + userId).then((res) => {
      return res.data;
    })
  );

  return error ? (
    "misy error"
  ) : isLoading ? (
    "loading"
  ) : (
    <>
      <div className="userInfo">
        <div className="images">
          <img src={data.coverPic} alt="" className="cover" />
          <img src={data.profilePic} alt="" className="profile" />
        </div>
        <div className="profileContainer">
          <div className="coordonnees">
            <div className="social">
              <FacebookIcon />
              <InstagramIcon />
              <TwitterIcon />
              <LinkedInIcon />
            </div>
            <div className="interractUser">
              <span>{data.name}</span>
              <div className="info">
                <div className="item">
                  <PlaceIcon />
                  <p>{data.city}</p>
                </div>
                <div className="item">
                  <LanguageIcon />
                  <p>{data.website}</p>
                </div>
              </div>
              {currentUser.id === userId ? (
                <button>Update</button>
              ) : (
                <button>Follow</button>
              )}
            </div>
            <div className="option">
              <EmailIcon />
              <MoreVertIcon />
            </div>
          </div>
          <div className="posts"></div>
        </div>
      </div>
    </>
  );
};

export default UserInfo;
