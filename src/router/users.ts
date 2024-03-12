import { Router } from "express";
import jwt from "jsonwebtoken";
import { DecodeToken, checkToken } from "../middlewares/checkToken";
import { Users } from "..";
export const userRouter = Router();


userRouter.get("/", async(req, res) => {
    const allUsers = await Users.findAll();
    res.status(200).send(JSON.stringify(allUsers));
})
userRouter.get("/me", checkToken, async (req, res) => {
    const decoded = jwt.decode(req.token!) as DecodeToken
    const user = await Users.findOne({ where: { id: decoded.id } });
    if (user) {
        delete user.dataValues.password;
        res.json(user);
    }
    else {
        res.status(404).send("User not found");
    }
});
userRouter.post("/", async(req, res) => {
    const nom = req.body.nom;
    const prenom = req.body.prenom;
    const email = req.body.email;
    const ismasculin = req.body.ismasculin;
    const filiere = req.body.filiere;
    const mention = req.body.mention;
    const etudes = req.body.etudes;
    const password = req.body.password;
    if (nom!==null) {
      const monResultat = {nom, prenom , email, ismasculin, filiere, mention, etudes, password }
      console.log("monResultat : ", monResultat);
      await Users.create(monResultat);
      res.status(200).json(monResultat);
    }
})