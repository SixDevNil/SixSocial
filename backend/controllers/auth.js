import { db } from "../connection.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
  // mi check hoe efa misy user ohatranio ve
  // enregistrement

  const q = "SELECT * FROM users WHERE username = ? ";
  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length)
      return res.status(404).json("efa misy utilisateur ohatran'io");
    const salt = bcrypt.genSaltSync(10);
    const passwordHashed = bcrypt.hashSync(req.body.password, salt);
    const values = [
      req.body.username,
      req.body.email,
      passwordHashed,
      req.body.name,
    ];
    const insertion =
      "INSERT INTO users (`username`, `email`, `password`, `name`) VALUES (?)";
    db.query(insertion, [values], (err, data) => {
      if (err) return res.json(err).status(404);
      return res.status(200).json("tafiditra tsara");
    });
  });
};

export const login = (req, res) => {
  const q = "SELECT * FROM users WHERE username = ?";
  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.json(err).status(500);
    if (data.length === 0) return res.json("identifiant non reconnu");
    const comparePassword = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );
    if (!comparePassword) return res.json("mot de passe erroné").status(404);

    const token = jwt.sign({ id: data[0].id }, "secret");
    const { password, ...others } = data[0];
    res
      .cookie("accessToken", token, { httpOnly: true, })
      .status(200)
      .json(others);
  });
};



export const logout = (req, res) => {
  res
    .clearCookie("accessToken", {
      secure: true,
      sameSite: "none",
    })
    .status(200)
    .json("bien déconnecté");
};
