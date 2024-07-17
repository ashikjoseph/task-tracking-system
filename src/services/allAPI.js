import { commonAPI } from "./commonAPI";
import { BASE_URL } from "./baseurl";

// 1) add tasks

export const addTasks = async (reqBody) => {
    return await commonAPI("post", `${BASE_URL}/addtasks`,reqBody, "")
}

// get all tasks
export const allTaskApi = async () => {
    return await commonAPI("GET", `${BASE_URL}/alltasks`, "","")
}

// 3) delete task item
export const deleteTaskApi = async(id)=>{
    return await commonAPI('DELETE',`${BASE_URL}/delete/${id}`,{},"")
}


// 4)get task item by id
export const getTaskDetailsById = async(id)=>{
    return await commonAPI('GET',`${BASE_URL}/gettask/${id}`,"","")
}


// update task
export const updateTaskById = async(id,reqBody)=>{
    return await commonAPI('PUT',`${BASE_URL}/updatetask/${id}`,reqBody,"")
}