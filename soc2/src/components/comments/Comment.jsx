import React, { useContext, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { makerequest } from "../../axios";
import { AuthContext } from "../../context/authContext";
import moment from "moment";
import "./comment.scss";
import { Link } from "react-router-dom";


const Comment = ({ postId }) => {
  const { currentUser } = useContext(AuthContext);
  const [desc, setDesc] = useState("");

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (newComment) => {
      makerequest.post("/comments/addComment", newComment);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["comments"]);
      },
    }
  );

  const { isLoading, error, data } = useQuery(["comments"], () =>
    makerequest.get("/comments/getComments?postId=" + postId).then((res) => {
      return res.data;
    })
  );

  async function handleClick(e) {
    e.preventDefault();
    await mutation.mutateAsync({ desc, postId });
    setDesc("");
  }

  return (
    <div className="comments">
      <div className="currentUserComment">
        <img src={currentUser.profilePic} alt="" className="userPdp" />
        <input
          type="text"
          placeholder="Write a comment.."
          className="commentaire"
          name="desc"
          onChange={(e) => setDesc(e.target.value)}
          value={desc}
        />
        <button onClick={handleClick}>Send</button>
      </div>
      {error
        ? "il y a une erreur"
        : isLoading
        ? "isloading"
        : data.map((commentaire) => (
            <div className="comment">
              <img src={commentaire.profilePic} alt="" className="userPdp" />
              <div className="comms">
                <Link to={`/profile/${commentaire.userId}`}>
                  <span
                    className="username"
                    style={{ cursor: "pointer", textDecoration: "none" }}
                  >
                    {" "}
                    {commentaire.name}
                  </span>
                </Link>
                <p>{commentaire.desc}</p>
              </div>
              <span className="time">
                {moment(commentaire.createdAt).fromNow()}
              </span>
            </div>
          ))}
    </div>
  );
};

export default Comment;
