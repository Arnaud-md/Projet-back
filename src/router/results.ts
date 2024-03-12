// import { Router } from "express";
// import { Result } from "..";

// export const resultRouter = Router();

// resultRouter.post("/", (req, res) => {
//     const mail = req.body.email;
//     const score = req.body.score;
//     const subject = req.body.subject;
//     const monResultat = { email:mail, score ,subject }
//     console.log(monResultat);
//     Result.create(monResultat);
//     res.json(monResultat);
// })
// resultRouter.get("/", async(req, res) => {
//     const allResults = await Result.findAll();
//     res.json(allResults);
// })