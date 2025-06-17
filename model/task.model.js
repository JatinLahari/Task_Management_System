import { DataTypes } from "sequelize";
import sequelize from "../db/database.js";

const Task = sequelize.define("task",{
  id:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  title:{
    type: DataTypes.STRING,
    allowNull: false
  },
  description:{
    type: DataTypes.STRING,
  },
  status:{
    type: DataTypes.ENUM('pending','in-progress','completed'),
    allowNull: false
  },
  dueDate:{
    type: DataTypes.DATE,
    allowNull: false,
  },
  userId:{
    type: DataTypes.INTEGER,
    allowNull: false
  }
});
sequelize.sync()
.then(()=>{
  console.log("Task model Created!");
})
.catch(err=>{
  console.log("Failed to create Task model");
});

export default Task;