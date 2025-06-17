import { DataTypes } from "sequelize";
import sequelize from "../db/database.js";

const User = sequelize.define("user", {
  id:{
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name:{
    type: DataTypes.STRING,
    allowNull:false,
  },
  email:{
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  password:{
    type: DataTypes.STRING,
    allowNull: false
  }
});
sequelize.sync()
.then(()=>{
  console.log("User model Created!");
})
.catch(err=>{
  console.log("Failed to create User model");
});

export default User;