import "./navbar.scss";
import HomeIcon from "@mui/icons-material/Home";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import DatasetIcon from "@mui/icons-material/Dataset";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Person3OutlinedIcon from "@mui/icons-material/Person3Outlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import { AuthContext } from "../../context/authContext";
const Navbar = () => {
  const { toggle, darkMode } = useContext(DarkModeContext);
  const { currentUser, logout } = useContext(AuthContext);


  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <h1>Six Blog</h1>
        </Link>
        <HomeIcon />
        {darkMode ? (
          <WbSunnyIcon onClick={toggle} />
        ) : (
          <DarkModeIcon onClick={toggle} />
        )}
        <DatasetIcon />
        <div className="search">
          <SearchOutlinedIcon />
          <input type="text" placeholder="Search..." />
        </div>
      </div>
      <div className="right">
        <Person3OutlinedIcon onClick = {logout}/>
        <EmailOutlinedIcon />
        <NotificationsNoneOutlinedIcon />
        <div className="users">
          <img src={currentUser.profilePic} alt="" />
          <p>{currentUser.name}</p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
