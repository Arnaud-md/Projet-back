import { Router } from "express";
import { QCM } from "..";

export const qcminfoRouter = Router();

qcminfoRouter.post("/", (req, res) => {
    const subject = "informatique";
    const numQuestion= req.body.numQuestion;
    const question = req.body.question;
    const reponseA = req.body.reponseA;
    const reponseB = req.body.reponseB;
    const reponseC = req.body.reponseC;
    const reponseD = req.body.reponseD;
    const bonnereponse = req.body.valide;
    const monQCM = { subject, numQuestion, question, reponseA, reponseB, reponseC, reponseD, valide:bonnereponse };
    console.log("monQCM : ",monQCM);
    QCM.create(monQCM);
    res.json(monQCM);
})
qcminfoRouter.get("/", async(req, res) => {
    const allQCM = await QCM.findAll();
    res.status(200).send(JSON.stringify(allQCM));
})
qcminfoRouter.get("/:numQuestion", async(req, res) => {
    const monQCM = await QCM.findOne({where:{numQuestion:req.params.numQuestion}});
    res.status(200).send(JSON.stringify(monQCM));
})