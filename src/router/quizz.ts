import { Router } from "express";
import { Quizz } from "..";
import { QuestionModel } from "../model/Question";

export const quizzRouter = Router();

quizzRouter.post("/", async (req, res) => {
    //const categorie = req.body.categorie;
    //const numQuestion= req.body.numQuestion;
    const idq1 = req.body.idq1;
    const idq2 = req.body.idq2;
    const idq3 = req.body.idq3;
    const idq4 = req.body.idq4;
    const idq5 = req.body.idq5;
    const idq6 = req.body.idq6;
    const idq7 = req.body.idq7;
    const idq8 = req.body.idq8;
    const idq9 = req.body.idq9;
    const idq10 = req.body.idq10;
    const dateCreationQuizz = new Date();
    const dateToString = dateCreationQuizz.toString();
    const date_creation = dateToString;
    const pourcentage_reussite = 0;
    
    //const monQCM = { subject, numQuestion, question, reponseA, reponseB, reponseC, reponseD, valide:bonnereponse };
    const monQuizz = {idq1, idq2, idq3, idq4, idq5, idq6, idq7, idq8, idq9, idq10, date_creation, pourcentage_reussite};
    //console.log("monQCM : ",monQCM);
    //QCM.create(monQCM);
    const newQuizz = await Quizz.create(monQuizz);
    //res.json(monQCM);
    res.json(newQuizz);
})
quizzRouter.get("/", async(req, res) => {
    const allQuizz = await Quizz.findAll();
    res.status(200).send(JSON.stringify(allQuizz));
})
//qcmRouter.get("/:numQuestion", async(req, res) => {
quizzRouter.get("/:id", async(req, res) => {
    const monQuizz = await Quizz.findOne({where:{id:req.params.id}});
    res.status(200).send(JSON.stringify(monQuizz));
})
quizzRouter.put("/:id", async(req, res) => {
    const id=req.params.id;
    const idq1 = req.body.idq1;
    const idq2 = req.body.idq2;
    const idq3 = req.body.idq3;
    const idq4 = req.body.idq4;
    const idq5 = req.body.idq5;
    const idq6 = req.body.idq6;
    const idq7 = req.body.idq7;
    const idq8 = req.body.idq8;
    const idq9 = req.body.idq9;
    const idq10 = req.body.idq10;
    const date_creation = (new Date).toDateString;
    const pourcentage_reussite = 0;
    const monQuizz = { idq1, idq2, idq3, idq4, idq5, idq6, idq7, idq8, idq9, idq10, date_creation, pourcentage_reussite };
    await Quizz.update(monQuizz,{where: {id}});
    res.status(200).send(JSON.stringify(monQuizz));
})

quizzRouter.delete("/:id", async(req, res) => {
    await Quizz.destroy({
        where: {id: req.params.id }
    });
  
    res.send('ok');
})