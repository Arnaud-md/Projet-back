import { Router } from "express";
import { TokenBlackList, Users } from "..";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { DecodeToken, checkToken } from "../middlewares/checkToken";

export const authRouter = Router();

authRouter.post("/local/register", async(req, res) => {
  
    const nom=req.body.nom;
    const prenom=req.body.prenom;
    const email = req.body.email;
    const ismasculin = req.body.ismasculin;
    const filiere = req.body.filiere;
    const mention = req.body.mention;
    const etudes = req.body.etudes;

    const userEmail = await Users.findOne({ where: {email:email}});
    
    if (userEmail===null) {
      const password = req.body.password;
      
      const saltRounds = 10;
      const hash = await bcrypt.hash(password, saltRounds);
      const monUser = { nom,prenom,email,ismasculin,filiere,mention,etudes, password:hash };
      const newUser = await Users.create(monUser);
      const newUserData = newUser.dataValues
      delete newUserData.password
     
      const tokenJWT = jwt.sign(newUserData, process.env.JWT_SECRET!, { expiresIn: '1h' });
        res.status(200).send(tokenJWT);
    }
    else {
      res.status(400).send("l'email que vous avez saisi est déjà utilisé");
    }
    
})
authRouter.post("/local/logout", checkToken, async (req, res) => {
    const decoded = jwt.decode(req.token!) as DecodeToken
    const user = await Users.findOne({ where: { id: decoded.id } });
    if (user) {
        await TokenBlackList.create({ token: req.token });
        res.send("Logged out");
    }
    else {
        res.status(404).send("User not found");
    }
})
authRouter.post("/local", async(req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const userEmail = await Users.findOne({ where: {email:email}});
    if (userEmail!==null) {
      const userEmailData = userEmail.dataValues;
      const match = await bcrypt.compare(password, userEmailData.password);
      if(!match) {
        res.status(400).send("le mot de passe n'est pas le bon");
      }
      else {
        const tokenJWT = jwt.sign(userEmailData, process.env.JWT_SECRET!, { expiresIn: '1h' });
        res.status(200).send(tokenJWT);
      }
    }
    else {
      res.status(400).send("l'email saisi n'est pas le bon");
    }
})