import "./post.scss";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import TextsmsIcon from "@mui/icons-material/Textsms";
import ShareIcon from "@mui/icons-material/Share";
import "./post.scss";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useContext, useState } from "react";
import Comment from "../comments/Comment";
import moment from "moment";
import { AuthContext } from "../../context/authContext";
import { makerequest } from "../../axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Link } from "react-router-dom";

const Post = ({ userPost }) => {
  const { currentUser } = useContext(AuthContext);

  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery(["likes", userPost.id], () =>
    makerequest.get("/likes?postId=" + userPost.id).then((res) => {
      return res.data;
    })
  );
  const {
    isLoading: coIsLoading,
    error: coError,
    nbComms,
  } = useQuery(
    ["comments", userPost.id],
    () =>
      (makerequest
        .get("/comments/getNbComments?postId=" + userPost.id)
        .then((res) => {
          return res.nbComms;
        }))
  );
  console.log(nbComms);

  const mutation = useMutation(
    (liked) => {
      if (liked)
        return makerequest.delete("/likes/disLike?postId=" + userPost.id);
      return makerequest.post("/likes/like?postId=" + userPost.id);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["likes"]);
      },
    }
  );
  const toggleLike = () => {
    mutation.mutate(data.includes(currentUser.id));
  };
  const [openComment, setOpenComment] = useState(false);

  return (
    <div className="post">
      <div className="container">
        <div className="infoUser">
          <div className="left">
            <img src={userPost.profilePic} alt="" />
            <div className="statutInfo">
              <Link to={`/profile/${userPost.userId}`}>
                <p style={{ cursor: "pointer", textDecoration: "none" }}>
                  {userPost.name}
                </p>
              </Link>
              <span>{moment(userPost.createdAt).fromNow()}</span>
            </div>
          </div>
          <div className="right">
            <MoreHorizIcon />
          </div>
        </div>

        <div className="userPost">
          <p>{userPost.desc}</p>
          <img src={"/upload/" + userPost.img} alt="" />
        </div>

        <div className="interraction">
          <div className="item">
            {error ? (
              "misy error eto @ like"
            ) : isLoading ? (
              "is loading"
            ) : data?.includes(currentUser.id) ? (
              <FavoriteIcon onClick={toggleLike} style={{ color: "red" }} />
            ) : (
              <FavoriteBorderIcon onClick={toggleLike} />
            )}
            <p>{data?.length} Likes</p>
          </div>
          <div className="item" onClick={() => setOpenComment(!openComment)}>
            <TextsmsIcon />
            <p>{nbComms?.length} Commentaires</p>
          </div>
          <div className="item">
            <ShareIcon />
            <p>Partager</p>
          </div>
        </div>
        {openComment && <Comment postId={userPost.id} />}
      </div>
    </div>
  );
};

export default Post;
