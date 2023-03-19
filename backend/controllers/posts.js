import { db } from "../connection.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getPosts = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.json("vous n'êtes pas connecté");
  const userId = req.params.userId ;
  jwt.verify(token, "secret", (err, userInfo) => {
    if (err) return res.json("token non valide").status(403);
    const q =
      userId !== "undefined"
        ? `SELECT p.*, u.id AS userId, name, profilePic FROM posts AS p JOIN users AS u ON (p.userId = u.id) WHERE u.id = ? ORDER BY p.createdAt DESC`
        : `SELECT p.*, u.id AS userId, name, profilePic FROM posts AS p JOIN users AS u ON (p.userId = u.id)
    LEFT JOIN relationship AS r ON(r.followeredUserId = p.userId) WHERE r.followersUserId = ? OR p.userId = ? 
    ORDER BY p.createdAt DESC`;
    const values = userId !== "undefined" ? [userId] : [userInfo.id, userInfo.id] ;

    db.query(q, values, (err, data) => {
      if (err) return res.json(err);
      return res.status(200).json(data);
    });
  });
};

export const addPost = async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.json("vous n'êtes pas connecté").staus(401);

  jwt.verify(token, "secret", (err, userInfo) => {
    if (err) return res.json("token non valide").status(403);
    const q = "INSERT INTO posts(`desc`, `img`,`userId`,`createdAt`) VALUE (?)";
    const values = [
      req.body.desc,
      req.body.img,
      userInfo.id,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
    ];
    db.query(q, [values], (err, data) => {
      if (err) return res.json(err);
      return res.json("post bien créé").status(202);
    });
  });
};
