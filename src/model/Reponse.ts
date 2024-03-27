import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize} from "sequelize";

interface IReponseModel extends Model<InferAttributes<IReponseModel>, InferCreationAttributes<IReponseModel>> {
    // Some fields are optional when calling UserModel.create() or UserModel.build()
    resp_id: CreationOptional<number>;
    user_id: number;
    quizz_id: number;
    question_id: number;
    reponse_donnee: number;
  }
  

export const ReponseModel = (sequelize: Sequelize) => {
    return sequelize.define<IReponseModel>('Reponse', {
    resp_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    quizz_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    question_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    reponse_donnee: {
        type: DataTypes.NUMBER,
        allowNull: false
    }
});
}