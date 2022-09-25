import { DataTypes } from 'sequelize'

const Profiles = (sequelize) => {
    const Schema = {
        first_name: {
            type: DataTypes.STRING, //=VARCHAR(255)
            allowNull: false //neleidžiamas tuščias laukas - Standartinė reikšmė true
        },
        last_name: {
            type: DataTypes.STRING, //=VARCHAR(255)
            allowNull: false //neleidžiamas tuščias laukas - Standartinė reikšmė true
        },
        about: {
            type: DataTypes.STRING, //= TEXT
            allowNull: false
        }
    }

    return sequelize.define('profiles', Schema)
}

export default Profiles