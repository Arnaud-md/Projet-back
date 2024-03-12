import { Router } from "express";
import { Question } from "..";
import { QuestionModel } from "../model/Question";

export const qcmRouter = Router();

qcmRouter.post("/", (req, res) => {
    const categorie = req.body.categorie;
    //const numQuestion= req.body.numQuestion;
    const id = req.body.id;
    const question = req.body.question;
    const reponseA = req.body.reponseA;
    const reponseB = req.body.reponseB;
    const reponseC = req.body.reponseC;
    const reponseD = req.body.reponseD;
    const bonne_reponse = req.body.bonne_reponse;
    //const monQCM = { subject, numQuestion, question, reponseA, reponseB, reponseC, reponseD, valide:bonnereponse };
    const maQuestion = {id, question, reponseA, reponseB, reponseC, reponseD, bonne_reponse, categorie };
    //console.log("monQCM : ",monQCM);
    //QCM.create(monQCM);
    Question.create(maQuestion);
    //res.json(monQCM);
    res.json(maQuestion);
})
qcmRouter.get("/", async(req, res) => {
    const allQCM = await Question.findAll();
    res.status(200).send(JSON.stringify(allQCM));
})
//qcmRouter.get("/:numQuestion", async(req, res) => {
qcmRouter.get("/:id", async(req, res) => {
    const maQCM = await Question.findOne({where:{id:req.params.id}});
    res.status(200).send(JSON.stringify(maQCM));
})