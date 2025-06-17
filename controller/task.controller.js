import Task from "../model/task.model.js";

export const deleteTask = async(request,response,next)=>{
  try{
    let id = request.params.id;
    let userId = request.user.userId;
    if(!id) return response.status(404).json({message: "Task not available!"});
    if(!userId) return response.status(404).json({message:"User not logged in!"});

    await Task.destroy({where: {id, userId}});
    return response.status(200).json({message:"Task Removal Successful!"});
  }
  catch(err){
    console.log("Failed to update task", err);
    return response.status(500).json({error:"Internal Server Error"});
  }
}
export const updateTask = async(request,response, next)=>{
  try{
    let id = request.params.id;
    let userId = request.user.userId;

    let task = await Task.findOne({where:{ id, userId}});
    if(!task) return response.status(404).json({message: "Task not available!"});
    
    let {title, description, status, dueDate} = request.body;
    // if((task.status!='pending' && task.status!='in-progress' && task.status!='completed') || (status!='pending' && status!='in-progress' && status!='completed')){
    //   return response.status(400).json({message:"Invalid status! It should be either pending, in-progess, completed"});
    // }


    await task.update({
      title: title === undefined ? task.title : title,
      description: description === undefined ? task.description : description,
      status: status === undefined ? task.status : status,
      dueDate: dueDate === undefined ? task.dueDate : dueDate,
    });
    let updated = await Task.findOne({where:{ id, userId}});

    return response.status(200).json({message:"Task Updation Successful!", Task: updated});
  }
  catch(err){
    console.log("Failed to update task", err);
    return response.status(500).json({error:"Internal Server Error"});
  }
}
export const getTaskById = async(request, response,next)=>{
  try {
    let id = request.params.id;
    let userId = request.user.userId;
    let task = await Task.findOne({where:{id, userId}});
    if(!task) return response.status(404).json({message:"Task not available!"});

    return response.status(200).json({message:"Task found!", Task:task});
  } catch (error) {
    console.log("Failed to fetch task", error);
    return response.status(500).json({error:"Internal Server Error"});
  }
}
export const getAllTask = async(request,response,next)=>{
  try{
    let userId = request.user.userId;
    let tasks = await Task.findAll({where: {userId}});
    if(!tasks) return response.status(404).json({message: "No task available!"});

    return response.status(200).json({message:"All Tasks", Tasks: tasks});
  }
  catch(err){
    console.log("Failed to fetch all tasks", err);
    return response.status(500).json({error:"Internal Server Error"});
  }
}
export const createTask = async(request, response, next)=>{
  try{
    let {title, description, status, dueDate} = request.body;
    let userId = request.user.userId;
    if(!title || !status || !dueDate) return response.status(400).json({message: "Title, Status and Due Date all are required!"});
    if(!userId) return response.status(404).json({message:"User not logged in!"});
    if(status != 'pending' && status != 'in-progress' && status != 'completed')
      return response.status(404).json({message:"Invalid Status! It should be either pending, in-progress or completed."});

    let task = await Task.create({title, description, status, dueDate, userId});
    return response.status(200).json({message:"Task creation Successful!", Task: task});
  }
  catch(err){
    console.log("Task not created", err);
    return response.status(500).json({error:"Internal Server Error"});
  }
}