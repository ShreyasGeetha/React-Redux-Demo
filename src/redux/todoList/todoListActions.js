import {ADD_TODOLIST,EDIT_TODOLIST, DELETE_TODOLIST, COMPLETED_TODOLIST} from './todoListTypes'

export const editToDoList = () =>{
    return{
        type: EDIT_TODOLIST
    }
}

export const addToDoList = (todoListValue) =>{
    
    return{
        type: ADD_TODOLIST,
        payload:todoListValue
    }
}

export const deleteToDoList = (id) =>{
    return{
        type: DELETE_TODOLIST,
        payload:id
    }
}

export const completedList = (id) =>{
    return{
        type: COMPLETED_TODOLIST,
        payload:id
    }
}

