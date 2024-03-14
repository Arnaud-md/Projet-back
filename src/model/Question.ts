import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize} from "sequelize";
interface IQuestionModel extends Model<InferAttributes<IQuestionModel>, InferCreationAttributes<IQuestionModel>> {
    // Some fields are optional when calling UserModel.create() or UserModel.build()
    id: CreationOptional<number>;
    question: string;
    reponseA: string;
    reponseB: string;
    reponseC: string;
    reponseD: string;
    bonne_reponse: number;
    categorie: string;
  }
export const QuestionModel = (sequelize: Sequelize) => {
    return sequelize.define<IQuestionModel>('Question', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    question: {
        type: DataTypes.STRING,
        allowNull: false
    },
    reponseA: {
        type: DataTypes.STRING,
        allowNull: false
    },
    reponseB: {
        type: DataTypes.STRING,
        allowNull: false
    },
    reponseC: {
        type: DataTypes.STRING,
        allowNull: false
    },
    reponseD: {
        type: DataTypes.STRING,
        allowNull: false
    },
    bonne_reponse: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    categorie: {
        type: DataTypes.STRING,
        allowNull: false
    }
});
}