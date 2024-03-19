import { Router } from "express";
import { Question, Quizz, Reponse } from "..";
import { QuestionModel } from "../model/Question";
import jwt from "jsonwebtoken";
import { DecodeToken, checkToken } from "../middlewares/checkToken";
import { log } from "console";

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
    const newQuizzData = newQuizz.dataValues;
    delete newQuizzData.idq1;
    delete newQuizzData.idq2;
    delete newQuizzData.idq3;
    delete newQuizzData.idq4;
    delete newQuizzData.idq5;
    delete newQuizzData.idq6;
    delete newQuizzData.idq7;
    delete newQuizzData.idq8;
    delete newQuizzData.idq9;
    delete newQuizzData.idq10;
    res.json(newQuizzData);
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
    const idQuizzNumber = parseInt(req.params.idQuizz);
    const nbResponseForQuizz = await Reponse.count({
        where: {
            quizz_id: req.params.idQuizz
        }
    })
    const quizz = await Quizz.findOne({ where: { id: req.params.idQuizz }})
    const questionId = quizz?.dataValues['idq' + (nbResponseForQuizz + 1)];
    let decodedId = -1;
    if (req.token) {
        decodedId=decoded.id;
    }
    const maReponse = {user_id: decodedId, quizz_id:idQuizzNumber, question_id:questionId, reponse_donnee:parseInt(req.params.indexReponse)};

    const newReponse = await Reponse.create(maReponse);
    res.json(newReponse);
})

quizzRouter.get("/:idQuizz/result", async(req, res) => {
    let score = 0;
    // const nbResponseForQuizz = await Reponse.count({
    //     where: {
    //         quizz_id: req.params.idQuizz
    //     }
    // })
    const allReponses = await Reponse.findAll({
        where: {
            quizz_id: req.params.idQuizz
        }
    })
    console.log("allReponses : ",allReponses);
    let cat = "";

    const allQuestions = await Promise.all(
        allReponses.map(reponse => 
            Question.findOne({
                where: {
                    id: reponse.question_id
                }
            })
        )
    )

    allReponses.forEach( (reponse, indexReponse) => {
        const question = allQuestions[indexReponse]
        console.log("question : ",question);
        if(question) {
            if(reponse.reponse_donnee === question.bonne_reponse) {
                score++;
            }
            console.log("reponse.reponse_donnee : ",reponse.reponse_donnee);
            console.log("question.bonne_reponse : ", question.bonne_reponse);
            cat = question.categorie;
            console.log("cat : ",cat);
            console.log("scoreBack : ",score);
        }
    })

    console.log('thomas');
    
    res.status(200).json({score : score, subject : cat});
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

quizzRouter.get("/:idQuizz/result/correction", async(req, res) => {
    let objCorrection = {};
    // const nbResponseForQuizz = await Reponse.count({
    //     where: {
    //         quizz_id: req.params.idQuizz
    //     }
    // })
    const allReponses = await Reponse.findAll({
        where: {
            quizz_id: req.params.idQuizz
        }
    })
    console.log("allReponses : ",allReponses);
    let cat = "";

    const allQuestions = await Promise.all(
        allReponses.map(reponse => 
            Question.findOne({
                where: {
                    id: reponse.question_id
                }
            })
        )
    )
    let reponse_donnee_def = [] as string[];
    let question_bonne_reponse_def = [] as string[];
    let question_def = [] as string[];
    allReponses.forEach( (reponse, indexReponse) => {
        const question = allQuestions[indexReponse]
        console.log("question : ",question);
        if(question) {
            
            if(reponse.reponse_donnee !== question.bonne_reponse) {
                if(reponse.reponse_donnee===1) {
                    reponse_donnee_def.push(question.reponseA);
                }
                if(reponse.reponse_donnee===2) {
                    reponse_donnee_def.push(question.reponseB);
                }
                if(reponse.reponse_donnee===3) {
                    reponse_donnee_def.push(question.reponseC);
                }
                if(reponse.reponse_donnee===4) {
                    reponse_donnee_def.push(question.reponseD);
                }
                if(question.bonne_reponse===1) {
                    question_bonne_reponse_def.push(question.reponseA);
                }
                if(question.bonne_reponse===2) {
                    question_bonne_reponse_def.push(question.reponseB);
                }
                if(question.bonne_reponse===3) {
                    question_bonne_reponse_def.push(question.reponseC);
                }
                if(question.bonne_reponse===4) {
                    question_bonne_reponse_def.push(question.reponseD);
                }
                question_def.push(question.question);
            }
        }
    })
    const resultat = {"question_def" : question_def,"reponse_donnee_def" : reponse_donnee_def,"question_bonne_reponse_def" : question_bonne_reponse_def};
    res.status(200).json(resultat);    
})