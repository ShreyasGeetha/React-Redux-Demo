import {ADD_TODOLIST,SORT_TODOLIST,EDIT_TODOLIST,DELETE_TODOLIST,COMPLETED_TODOLIST} from './todoListTypes'
import addNotification from 'react-push-notification';

const initialState = {
    todoList: [
        
        
    ],
    completedToDoList: [

    ]
}

const sendNotification = (list,msg) =>{
    var message = list.listName
    console.log(list)
    var title = msg+':\nPriority'+list.priority+' task for '+list.date
    addNotification({
        title: title,
        subtitle: 'To be completed on',
        message: message,
        theme: 'green',
        native: true // when using native, your OS will handle theming.
    });  
}

const sortByTask = (a, b) =>{
    if(a.listName > b.listName){
        return 1;
    } else if(b.listName > a.listName){
        return -1;
    }else {
        return 0;
    }
}

const todoListReducer = (state = initialState, action) =>{
    switch(action.type){
          
        case ADD_TODOLIST: 
            action.payload["id"] = state.todoList.length+1
            var obj = {
                ...state,
                todoList: [...state.todoList,action.payload]
            }
            sendNotification(action.payload,'TASK ADDED')
            return obj            

        case EDIT_TODOLIST:  
            return{
                ...state,
                todoList: state.todoList
            }

        case DELETE_TODOLIST:
        
        var tobeDeleted =  state.todoList.filter(arr => arr.id===action.payload) 
        var obj = {
            ...state,
            todoList: state.todoList.filter(arr => arr.id!==action.payload)
            }
            sendNotification(tobeDeleted[0],'TASK DELETED')    
            return obj

        case COMPLETED_TODOLIST:  
            var filteredCompletedList = state.todoList.filter(arr => arr.id===action.payload)
            var obj = {
                ...state,   
                completedToDoList: [...state.completedToDoList, filteredCompletedList[0]],
                todoList:state.todoList.filter(arr => arr.id!==action.payload)
            }
            sendNotification(filteredCompletedList[0],'TASK COMPLETED!') 
            return obj

        case SORT_TODOLIST:  
            var obj ={}
            if(action.payload==='task'){
                var temp = state.todoList.sort(sortByTask)
                
                obj = {
                    ...state,
                    todoList:[temp]
                }
            }
            else if(action.payload==='date'){

            }
            else if(action.payload==='priority'){

            }      
            return obj
        default: return state
    }
}

export default todoListReducer;
