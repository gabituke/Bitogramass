import { DataTypes } from 'sequelize'

const Users = (sequelize) => {
    const Schema = {
        first_last_names: {

            type: DataTypes.STRING, //=VARCHAR(255)
            allowNull: false
        },
        username: {
            type: DataTypes.STRING, //=VARCHAR(255)
            allowNull: false //neleidžiamas tuščias laukas - Standartinė reikšmė true
        },
        email: {
            type: DataTypes.STRING, //= TEXT
            allowNull: false
        },
        password: {
            type: DataTypes.STRING, //= TEXT
            allowNull: false
        },
        role: {
            type: DataTypes.INTEGER, //= INT
            allowNull: false,
            defaultValue: 0
        }
    }

    return sequelize.define('users', Schema)
}

export default Users