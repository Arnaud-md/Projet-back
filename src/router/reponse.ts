import { Router } from "express";
import { Question } from "..";

export const qcmRouter = Router();

qcmRouter.post("/", (req, res) => {
    const categorie = req.body.categorie;
    const id = req.body.id;
    const question = req.body.question;
    const reponseA = req.body.reponseA;
    const reponseB = req.body.reponseB;
    const reponseC = req.body.reponseC;
    const reponseD = req.body.reponseD;
    const bonne_reponse = req.body.bonne_reponse;
    const maQuestion = {id, question, reponseA, reponseB, reponseC, reponseD, bonne_reponse, categorie };
    Question.create(maQuestion);
    res.json(maQuestion);
})
qcmRouter.get("/", async(req, res) => {
    const allQCM = await Question.findAll();
    res.status(200).send(JSON.stringify(allQCM));
})
qcmRouter.get("/:id", async(req, res) => {
    const maQCM = await Question.findOne({where:{id:req.params.id}});
    res.status(200).send(JSON.stringify(maQCM));
})