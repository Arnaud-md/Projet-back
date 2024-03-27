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
    }
    // qidinfo1: {
    //     type:DataTypes.INTEGER,
    //     allowNull: true
    // },
    // qidinfo2: {
    //     type:DataTypes.INTEGER,
    //     allowNull: true
    // },
    // qidinfo3: {
    //     type:DataTypes.INTEGER,
    //     allowNull: true
    // },
    // qidmeca1: {
    //     type:DataTypes.INTEGER,
    //     allowNull: true
    // },
    // qidmeca2: {
    //     type:DataTypes.INTEGER,
    //     allowNull: true
    // },
    // qidmeca3: {
    //     type:DataTypes.INTEGER,
    //     allowNull: true
    // },
    // qidfluides1: {
    //     type:DataTypes.INTEGER,
    //     allowNull: true
    // },
    // qidfluides2: {
    //     type:DataTypes.INTEGER,
    //     allowNull: true
    // },
    // qidfluides3: {
    //     type:DataTypes.INTEGER,
    //     allowNull: true
    // },
    // qidthermo1: {
    //     type:DataTypes.INTEGER,
    //     allowNull: true
    // },
    // qidthermo2: {
    //     type:DataTypes.INTEGER,
    //     allowNull: true
    // },
    // qidthermo3: {
    //     type:DataTypes.INTEGER,
    //     allowNull: true
    // },
    // qidplasmas1: {
    //     type:DataTypes.INTEGER,
    //     allowNull: true
    // },
    // qidplasmas2: {
    //     type:DataTypes.INTEGER,
    //     allowNull: true
    // },
    // qidplasmas3: {
    //     type:DataTypes.INTEGER,
    //     allowNull: true
    // },
    // qidelec1: {
    //     type:DataTypes.INTEGER,
    //     allowNull: true
    // },
    // qidelec2: {
    //     type:DataTypes.INTEGER,
    //     allowNull: true
    // },
    // qidelec3: {
    //     type:DataTypes.INTEGER,
    //     allowNull: true
    // }
});
}