import { DataTypes, Sequelize} from "sequelize";
export const ResultModel = (sequelize: Sequelize) => {
    return sequelize.define('Results', {
// export const Result = sequelize.define('Results', {
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    score: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    subject: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
        timestamps: false,
});
}