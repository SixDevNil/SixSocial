import "./share.scss";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import PlaceIcon from "@mui/icons-material/Place";
import GroupIcon from "@mui/icons-material/Group";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useMutation, useQueryClient } from "react-query";
import { makerequest } from "../../axios";

const Share = () => {
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);

  const { currentUser } = useContext(AuthContext);

  const queryClient = useQueryClient();

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makerequest.post("upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const mutation = useMutation(
    (newPost) => {
      makerequest.post("/posts/addPost", newPost);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );
  const handleClick = async (e) => {
    e.preventDefault();
    let imgUrl = "";
    if (file) {
      imgUrl = await upload();
      await mutation.mutateAsync({ desc, img: imgUrl });
      setDesc("");
      setFile(null);
    }
    else{
      await mutation.mutateAsync({desc})
      setDesc("") ;
    }
  };

  return (
    <div className="share">
      <div className="container">
        <div className="commentaire">
          <img src={currentUser.profilePic} alt="" />
          <input
            type="text"
            placeholder={`à quoi penses tu ${currentUser.name} ? `}
            name="desc"
            onChange={(e) => setDesc(e.target.value)}
            value={desc}
          />
        </div>
        <div className="fonctionnalité">
          <div className="left">
            <div className="item">
              <InsertPhotoIcon />
              <input
                type="file"
                name="file"
                id="file"
                style={{ display: "none" }}
                onChange={(e) => {
                  setFile(e.target.files[0]);
                }}
              />
              <label
                htmlFor="file"
                className="item"
                style={{ cursor: "pointer" }}
              >
                {" "}
                Add image{" "}
              </label>
            </div>
            <div className="item">
              <PlaceIcon />
              <span>Map</span>
            </div>
            <div className="item">
              <GroupIcon />
              <span>Tag Friends</span>
            </div>
          </div>
          <div className="right">
            <button onClick={handleClick}>Partager</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
