import React, { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import "./stories.scss";

const Stories = () => {
  const { currentUser } = useContext(AuthContext);
  const stories = [
    {
      id: 1,
      name: "Ashley",
      img: "images/asus.jpg",
    },
    {
      id: 2,
      name: "Beyonce",
      img: "images/react.jpg",
    },
    {
      id: 3,
      name: "Channel",
      img: "images/viking.jpg",
    },
    {
      id: 4,
      name: "Damso",
      img: "images/sary.jpg",
    },
  ];
  return (
    <div className="stories">
      <div className="story" key={currentUser.id}>
        <img src={currentUser.profilePic} alt="" />
        <span>{currentUser.name}</span>
        <div className="button">+</div>
      </div>
      {stories.map((story) => (
        <div className="story" key={story.id}>
          <img src={story.img} alt="" />
          <span>{story.name}</span>
        </div>
      ))}
    </div>
  );
};

export default Stories;
