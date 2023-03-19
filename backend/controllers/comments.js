import { db } from "../connection.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getComments = (req, res) => {
  const q = `SELECT c.*, u.name, u.profilePic FROM comments AS c JOIN users as u ON(c.userId = u.id ) 
  LEFT JOIN posts AS p ON (c.postId = p.id) WHERE p.id = ? ORDER BY c.createdAt DESC`;
  db.query(q, [req.query.postId], (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json(data);
  });
};

export const getNbComments = (req, res) => {
  const q = `SELECT c.*, u.name, u.profilePic FROM comments AS c JOIN users as u ON(c.userId = u.id ) 
  LEFT JOIN posts AS p ON (c.postId = p.id) WHERE p.id = ? ORDER BY c.createdAt DESC`;
  db.query(q, [req.query.postId], (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json(data.map((commentaire) => commentaire.id));
  });
};

export const addComment = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.json("vous n'êtes pas connecté").status(403);
  jwt.verify(token, "secret", (err, userInfo) => {
    const q =
      "INSERT INTO comments(`desc`,`userId`,`postId`,`createdAt`) VALUES (?)";
    const values = [
      req.body.desc,
      userInfo.id,
      req.body.postId,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
    ];
    db.query(q, [values], (err, data) => {
      if (err) return res.json("commentaire non ajouté").status(401);
      return res.status(200).json("bien ajouté");
    });
  });
};
