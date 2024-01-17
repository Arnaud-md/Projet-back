import { Router } from "express";
import { QCM } from "..";

export const qcmRouter = Router();

qcmRouter.post("/", (req, res) => {
    const numQuestion= req.body.numQuestion;
    const question = req.body.question;
    const reponseA = req.body.reponseA;
    const reponseB = req.body.reponseB;
    const reponseC = req.body.reponseC;
    const reponseD = req.body.reponseD;
    const bonnereponse = req.body.valide;
    const monQCM = { numQuestion, question, reponseA, reponseB, reponseC, reponseD, valide:bonnereponse };
    console.log("monQCM : ",monQCM);
    QCM.create(monQCM);
    res.json(monQCM);
})
qcmRouter.get("/", async(req, res) => {
    const allQCM = await QCM.findAll();
    res.status(200).send(JSON.stringify(allQCM));
})
qcmRouter.get("/:numQuestion", async(req, res) => {
    const monQCM = await QCM.findOne({where:{numQuestion:req.params.numQuestion}});
    res.status(200).send(JSON.stringify(monQCM));
})