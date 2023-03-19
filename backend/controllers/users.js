import { db } from "../connection.js";

export const findUser = (req, res) => {
  const userId = req.params.userId ;
  const q = "SELECT * FROM users WHERE id = ?";
  db.query(q, [userId], (err, data) => {
    if (err) return res.json("cet utilisateur n'existe pas").status(404);
    const { password, ...infos } = data[0];
    return res.json(infos).status(200);
  });
};
