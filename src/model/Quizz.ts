import { DataTypes, Sequelize} from "sequelize";

export const QuizzModel = (sequelize: Sequelize) => {
    return sequelize.define('Quizz', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idq1: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    idq2: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    idq3: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    idq4: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    idq5: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    idq6: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    idq7: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    idq8: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    idq9: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    idq10: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    date_creation: {
        type: DataTypes.STRING,
        allowNull: false
    },
    pourcentage_reussite: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});
}