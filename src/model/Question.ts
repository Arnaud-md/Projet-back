import { DataTypes, Sequelize} from "sequelize";
//export const QCM = sequelize.define('QCM_content', {
export const QuestionModel = (sequelize: Sequelize) => {
    return sequelize.define('Question', {
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