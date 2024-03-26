import { Router } from "express";
import { Question } from "..";

export const questionRouter = Router();

questionRouter.post("/", async (req, res) => {
    const categorie = req.body.categorie;
    const question = req.body.question;
    const reponseA = req.body.reponseA;
    const reponseB = req.body.reponseB;
    const reponseC = req.body.reponseC;
    const reponseD = req.body.reponseD;
    const bonne_reponse = req.body.bonne_reponse;
    const maQuestion = {question, reponseA, reponseB, reponseC, reponseD, bonne_reponse, categorie };
    const newQuestion = await Question.create(maQuestion)
    res.json(newQuestion);
})
questionRouter.get("/", async(req, res) => {
    const allQCM = await Question.findAll();
    res.status(200).send(JSON.stringify(allQCM));
})
questionRouter.get("/:id", async(req, res) => {
    const maQCM = await Question.findOne({where:{id:req.params.id}});
    res.status(200).send(JSON.stringify(maQCM));
})
questionRouter.put("/:id", async(req, res) => {
    const id=req.params.id;
    const question = req.body.question;
    const reponseA = req.body.reponseA;
    const reponseB = req.body.reponseB;
    const reponseC = req.body.reponseC;
    const reponseD = req.body.reponseD;
    const bonne_reponse = req.body.bonne_reponse;
    const categorie = req.body.categorie;
    const maQuestion = { question, reponseA ,reponseB, reponseC, reponseD, bonne_reponse, categorie };
    await Question.update(maQuestion,{where: {id}});
    res.status(200).send(JSON.stringify(maQuestion));
})
questionRouter.delete("/:id", async(req, res) => {
    await Question.destroy({
        where: {id: req.params.id }
    });
    res.send('ok');
})