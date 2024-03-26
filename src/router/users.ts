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
// userRouter.put("/", async(req,res) => {
//     const id=req.params.id;
//     const nom = req.body.nom;
//     const prenom = req.body.prenom;
//     const email = req.body.email;
//     const ismasculin = req.body.ismasculin;
//     const filiere = req.body.filiere;
//     const mention = req.body.mention;
//     const etudes = req.body.etudes;
//     const password = req.body.password;
//     // const qidinfo1 = req.body.qidinfo1;
//     // const qidinfo2 = req.body.qidinfo2;
//     // const qidinfo3 = req.body.qidinfo3;
//     // const qidmeca1 = req.body.qidmeca1;
//     // const qidmeca2 = req.body.qidmeca2;
//     // const qidmeca3 = req.body.qidmeca3;
//     // const qidfluides1 = req.body.qidfluides1;
//     // const qidfluides2 = req.body.qidfluides2;
//     // const qidfluides3 = req.body.qidfluides3;
//     // const qidthermo1 = req.body.qidthermo1;
//     // const qidthermo2 = req.body.qidthermo2;
//     // const qidthermo3 = req.body.qidthermo3;
//     // const qidplasmas1 = req.body.qidplasmas1;
//     // const qidplasmas2 = req.body.qidplasmas2;
//     // const qidplasmas3 = req.body.qidplasmas3;
//     // const qidelec1 = req.body.qidelec1;
//     // const qidelec2 = req.body.qidelec2;
//     // const qidelec3 = req.body.qidelec3;
//     if (nom!==null) {
//         const monResultat = {nom, prenom , email, ismasculin, filiere, mention, etudes, password}
//         // qidinfo1, qidinfo2, qidinfo3, qidmeca1, qidmeca2, qidmeca3, qidfluides1, qidfluides2, qidfluides3, qidthermo1, qidthermo2, qidthermo3, qidplasmas1, qidplasmas2, qidplasmas3, qidelec1, qidelec2, qidelec3}
//         await Users.update(monResultat,{where: {id}});
//         res.status(200).json(monResultat);
//     }
// })