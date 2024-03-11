import { DataTypes, Sequelize} from "sequelize";

export const ReponseModel = (sequelize: Sequelize) => {
    return sequelize.define('Reponse', {
    resp_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
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
        type: DataTypes.STRING,
        allowNull: false
    }
},{
        timestamps: false,
});
}