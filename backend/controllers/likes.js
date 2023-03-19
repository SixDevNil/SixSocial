import { db } from "../connection.js";
import  jwt from "jsonwebtoken";

export const getLikes = (req, res) => {
  const q = "SELECT userId FROM likes WHERE postId = ? ";
  db.query(q, [req.query.postId], (err, data) => {
    if (err) return res.json(err).status(400);
    return res.json(data.map((like) => like.userId)).status(200);
  });
};

export const like = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.json("vous n'êtes pas connecté").status(403);
  jwt.verify(token, "secret", (err, userInfo) => {
    const q = "INSERT INTO likes(`userId`,`postId`) VALUES (?)";
    const values = [userInfo.id, req.query.postId];
    db.query(q, [values], (err, data) => {
      if (err) return res.json("commentaire non ajouté").status(401);
      return res.status(200).json("bien ajouté");
    });
  });
};

export const disLike = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.json("t'es pas connecté").status(403);
  jwt.verify(token, "secret", (err, userInfo) => {
    const q = "DELETE FROM likes WHERE `userId` = ? AND `postId` = ?";
    db.query(q, [userInfo.id, req.query.postId], (err, data) => {
      if (err) return res.json(err).status(400);
      return res.json("post bien disliké").status(200);
    });
  });
};
