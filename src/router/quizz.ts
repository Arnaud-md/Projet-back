import { Router } from "express";
import { Question, Quizz, Reponse } from "..";
import { QuestionModel } from "../model/Question";
import jwt from "jsonwebtoken";
import { DecodeToken, checkToken } from "../middlewares/checkToken";

export const quizzRouter = Router();

quizzRouter.post("/:type", async (req, res) => {
    //const categorie = req.body.categorie;
    //const numQuestion= req.body.numQuestion;
    let nbfirstquestion = 0;
    let coeff = 0;
    if(req.params.type==="informatique") {
        nbfirstquestion = 1;
        coeff = 30.
    }
    if(req.params.type==="mecanique") {
        nbfirstquestion = 31;
        coeff = 20.
    }
    if(req.params.type==="mecanique-des-fluides") {
        nbfirstquestion = 51;
        coeff = 20.
    }
    if(req.params.type==="thermodynamique") {
        nbfirstquestion = 71;
        coeff = 20.
    }
    if(req.params.type==="physique-des-plasmas") {
        nbfirstquestion = 91;
        coeff = 20.
    }
    if(req.params.type==="electronique") {
        nbfirstquestion = 111;
        coeff = 20.
    }
    let randomNumbers:number[];
    let firstRand = Math.floor(Math.random()*coeff+nbfirstquestion);
    randomNumbers = [firstRand];
    for(let i=1;i<10;i++) {
        let rand = Math.floor(Math.random()*coeff+nbfirstquestion);
        while (randomNumbers.includes(rand)) {
            rand = Math.floor(Math.random()*coeff+nbfirstquestion);
        }
        randomNumbers.push(rand);
    }
    const idq1 = randomNumbers[0];
    const idq2 = randomNumbers[1];
    const idq3 = randomNumbers[2];
    const idq4 = randomNumbers[3];
    const idq5 = randomNumbers[4];
    const idq6 = randomNumbers[5];
    const idq7 = randomNumbers[6];
    const idq8 = randomNumbers[7];
    const idq9 = randomNumbers[8];
    const idq10 = randomNumbers[9];
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

quizzRouter.get("/:idQuizz/question", async(req, res) => {
    const nbResponseForQuizz = await Reponse.count({
        where: {
            quizz_id: req.params.idQuizz
        }
    })
    const quizz = await Quizz.findOne({ where: { id: req.params.idQuizz }})
    const questionId = quizz?.dataValues['idq' + (nbResponseForQuizz + 1)]
    const maQCM = await Question.findOne({where:{id: questionId}});
    res.status(200).send(JSON.stringify(maQCM));
})

quizzRouter.post("/:idQuizz/reponse/:indexReponse", async (req, res) => {
    const decoded = jwt.decode(req.token!) as DecodeToken
    const nbResponseForQuizz = await Reponse.count({
        where: {
            quizz_id: req.params.idQuizz
        }
    })
    const quizz = await Quizz.findOne({ where: { id: req.params.idQuizz }})
    const questionId = quizz?.dataValues['idq' + (nbResponseForQuizz + 1)];
    const maReponse = {user_id: decoded.id, quizz_id:req.params.idQuizz, question_id:questionId, reponse_donnee:req.params.indexReponse};

    const newReponse = await Reponse.create(maReponse);
    res.json(newReponse);
})

quizzRouter.get("/:idQuizz/result", async(req, res) => {
    let score = 0;
    const nbResponseForQuizz = await Reponse.count({
        where: {
            quizz_id: req.params.idQuizz
        }
    })
    const allReponses = await Reponse.findAll({
        where: {
            quizz_id: req.params.idQuizz
        }
    })
    //const newAllReponses = await allReponses.json();
    allReponses.forEach(async (reponse) => {
        const reponsejson=reponse.toJSON();
        const question = await Question.findOne({
            where: {
                id: reponsejson.question_id
            }
        })
        const questionjson=question?.toJSON();
        if(reponsejson.reponse_donnee===questionjson.bonne_reponse) {
            score++;
        }
    })
    res.status(200).send(score);
})

quizzRouter.get("/:idQuizz/status", async(req, res) => {
    let status = "not validate";
    const nbResponseForQuizz = await Reponse.count({
        where: {
            quizz_id: req.params.idQuizz
        }
    })
    if (nbResponseForQuizz===10) {
        status="validate"
    }
    res.status(200).send(status);
})