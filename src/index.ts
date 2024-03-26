import express, { Request } from "express";
import 'dotenv/config';
import bodyParser from "body-parser";
import { IntegerDataType, Sequelize } from "sequelize";
import cors from "cors";
import jwt from 'jsonwebtoken'
import { TokenBlackListModel } from "./model/TokenBlackList";
import { userRouter } from "./router/users";
import { authRouter } from "./router/auth";
import { QuestionModel } from "./model/Question";
import { QuizzModel } from "./model/Quizz";
import { questionRouter } from "./router/qcm";
import { quizzRouter } from "./router/quizz";
import { UsersModel } from "./model/Users";
import { ReponseModel } from "./model/Reponse";

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'db/database.sqlite'
});

const middleware = (req:any, res:any, next:any) => {
  let bearer = req.headers.authorization;
  if(bearer!==undefined) {
    bearer = bearer.replace("Bearer ","");
    const ok = jwt.verify(bearer, 'secret');
    if(ok) {
      next();
    }
    else {
      res.status(401).send("Vous n'avez pas l'autorisation");
    }
  }
  else {
    res.status(401).send("Il n'y a pas de token")
  }
}

const app = express();
app.use(cors());
app.use(bodyParser.json());

export const Question = QuestionModel(sequelize);
export const Quizz = QuizzModel(sequelize);
export const Users = UsersModel(sequelize);
export const TokenBlackList = TokenBlackListModel(sequelize);
export const Reponse = ReponseModel(sequelize);

sequelize.sync();

const port = process.env.PORT ? parseInt(process.env.PORT as string) : 3030

interface IMaRequetBody {
    nom: string,
    image: string,
    duree: IntegerDataType,
    note: IntegerDataType
  }
const apiRouter = express.Router();
const qcmRouter = express.Router();
qcmRouter.use('/informatique', questionRouter);
qcmRouter.use('/mecanique', questionRouter);
qcmRouter.use('/mecanique-des-fluides', questionRouter);
qcmRouter.use('/thermodynamique', questionRouter);
qcmRouter.use('/physique-des-plasmas', questionRouter);
qcmRouter.use('/electronique', questionRouter);
apiRouter.use('/qcm', qcmRouter);
apiRouter.use('/quizz', quizzRouter);
apiRouter.use('/auth', authRouter);
apiRouter.use('/users', userRouter);

app.use("/api", apiRouter);

app.listen(port, () => {
    console.log('serveur running on port : ' + port);
})

