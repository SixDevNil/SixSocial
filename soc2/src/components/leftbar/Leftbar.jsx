import "./leftbar.scss";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";
import Diversity2OutlinedIcon from "@mui/icons-material/Diversity2Outlined";
import LocalGroceryStoreOutlinedIcon from "@mui/icons-material/LocalGroceryStoreOutlined";
import LiveTvOutlinedIcon from "@mui/icons-material/LiveTvOutlined";
import AccessAlarmOutlinedIcon from "@mui/icons-material/AccessAlarmOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import VideogameAssetOutlinedIcon from "@mui/icons-material/VideogameAssetOutlined";
import CollectionsOutlinedIcon from "@mui/icons-material/CollectionsOutlined";
import VideoCameraBackOutlinedIcon from "@mui/icons-material/VideoCameraBackOutlined";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import TravelExploreOutlinedIcon from "@mui/icons-material/TravelExploreOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import CastForEducationOutlinedIcon from "@mui/icons-material/CastForEducationOutlined";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";


const Leftbar = () => {
const {currentUser} = useContext(AuthContext) ;

  return (
    <div className="leftbar">
      <div className="container">
        <div className="about">
          <div className="item">
            <img src={currentUser.profilePic} alt="" />
            <Link to={`/profile/` + currentUser.id} style={{ textDecoration: "none" }}>
              <span> {currentUser.name} </span>
            </Link>
          </div>
          <div className="item">
            <PeopleOutlineOutlinedIcon />
            <p>Friends</p>
          </div>
          <div className="item">
            <Diversity2OutlinedIcon />
            <p>Groups</p>
          </div>
          <div className="item">
            <LocalGroceryStoreOutlinedIcon />
            <p>Market</p>
          </div>
          <div className="item">
            <LiveTvOutlinedIcon />
            <p>Watch</p>
          </div>
          <div className="item">
            <AccessAlarmOutlinedIcon />
            <p>Memories</p>
          </div>
        </div>
        <div className="shortcuts">
          <span> Your shortcuts </span>

          <div className="item">
            <CalendarMonthOutlinedIcon />
            <p>Events</p>
          </div>
          <div className="item">
            <VideogameAssetOutlinedIcon />
            <p>Gaming</p>
          </div>
          <div className="item">
            <CollectionsOutlinedIcon />
            <p>Gallery</p>
          </div>
          <div className="item">
            <VideoCameraBackOutlinedIcon />
            <p>Videos</p>
          </div>
          <div className="item">
            <MessageOutlinedIcon />
            <p>Message</p>
          </div>
        </div>
        <div className="others">
          <span> Others </span>

          <div className="item">
            <TravelExploreOutlinedIcon />
            <p>Fundraiser</p>
          </div>
          <div className="item">
            <SchoolOutlinedIcon />
            <p>Tutorials</p>
          </div>
          <div className="item">
            <CastForEducationOutlinedIcon />
            <p>Courses</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leftbar;
