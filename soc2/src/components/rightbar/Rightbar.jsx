import "./rightbar.scss";
import sary from "../../Dummy/sary.jpg";

const Rightbar = () => {
  return (
    <div className="rightbar">
      <div className="container">
        <div className="suggest">
          <span>Suggestions For You</span>
          <div className="item">
            <div className="left">
              <img src={sary} alt="" />
              <p>Yeahh</p>
            </div>
            <div className="right">
              <button>Follow</button>
              <button>Dismiss</button>
            </div>
          </div>
          <div className="item">
            <div className="left">
              <img src={sary} alt="" />
              <p>Yeahh</p>
            </div>
            <div className="right">
              <button>Follow</button>
              <button>Dismiss</button>
            </div>
          </div>
          <div className="item">
            <div className="left">
              <img src={sary} alt="" />
              <p>Yeahh</p>
            </div>
            <div className="right">
              <button>Follow</button>
              <button>Dismiss</button>
            </div>
          </div>
          <div className="item">
            <div className="left">
              <img src={sary} alt="" />
              <p>Yeahh</p>
            </div>
            <div className="right">
              <button>Follow</button>
              <button>Dismiss</button>
            </div>
          </div>
        </div>
        <div className="activity">
          <span>Latest Activities</span>
          <div className="item">
            <div className="left">
              <img src={sary} alt="" />
              <p>
                Yeahh <span>changed their cover picture</span>
              </p>
            </div>
            <div className="right">
              <span>1 min ago</span>
            </div>
          </div>
          <div className="item">
            <div className="left">
              <img src={sary} alt="" />
              <p>
                Yeahh <span>changed their cover picture</span>
              </p>
            </div>
            <div className="right">
              <span>1 min ago</span>
            </div>
          </div>
        </div>
        <div className="onlineFriends">
          <span>Online Friends</span>
          <div className="onlineStatus">
            <img src={sary} alt="" />
            <div className="dotOnline"></div>
            <p>Yeahh</p>
          </div>
          <div className="onlineStatus">
            <img src={sary} alt="" />
            <div className="dotOnline"></div>
            <p>Yeahh</p>
          </div>
          <div className="onlineStatus">
            <img src={sary} alt="" />
            <div className="dotOnline"></div>
            <p>Yeahh</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rightbar;
