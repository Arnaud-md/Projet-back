import { DataTypes, Sequelize} from "sequelize";
export const UsersModel = (sequelize: Sequelize) => {
    return sequelize.define('Users', {
    // Chaque champ correspond à une colonne dans la table
    // id: {
    //     type: DataTypes.STRING,
    //     allowNull: false // Indique si ce champ peut être null
    // },
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nom: {
        type: DataTypes.STRING,
        allowNull: false
    },
    prenom: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ismasculin: {
        type: DataTypes.BOOLEAN

    },
    filiere: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mention: {
        type: DataTypes.STRING,
        allowNull: false
    },
    etudes: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
});
}