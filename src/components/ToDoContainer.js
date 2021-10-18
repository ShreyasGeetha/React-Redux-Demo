import React,{useState,useEffect} from 'react'
import {addToDoList, editToDoList, deleteToDoList, completedList} from '../redux'
import {useSelector, useDispatch} from 'react-redux'
import {connect} from 'react-redux'
import addNotification from 'react-push-notification';


function ToDoContainer(props) {
    

    const todoList = useSelector(state => state.todoList)
    const completedToDoList = useSelector(state => state.completedToDoList)
    const dispatch = useDispatch()

    const [todoText, setTodoText] = useState('')
    const [todoDate, setTodoDate] = useState('')
    const [todoPriority, setTodoPriority] = useState('')
    const [count, setCount] = useState(0)

    useEffect(() => {
        setTodoPriority('1')                     
    }, [])

    var todo = {}

    const getToDoText = (e) =>{        
        setTodoText(e.target.value)    
    }

    const getDate = (e) =>{
        setTodoDate(e.target.value)
    }

    const getPriority= (e) => {
        setTodoPriority(e.target.value)
    }


    const addToList = () =>{             
        todo = {
            listName: todoText,
            date : todoDate,
            priority : todoPriority
        }
        setCount(count+1)
         dispatch(addToDoList(todo))  
    }

    const deleteItemInList = (id) =>{        
        dispatch(deleteToDoList(id))
    }

    const editItemInList = (id) =>{
        document.getElementById(id).contentEditable = true;
    }

    const completedItemInList = (id) =>{
        dispatch(completedList(id))
    }

    return (
        <div >
            {/* <h1>Om Gurave Namah</h1> */}
            Task <input type="text" onChange={getToDoText}/>
            Date: <input id="date" type="date" onChange={getDate}/>
            Priority: <select name="priority" id="priority" onChange={getPriority}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
            </select>
            <button onClick={addToList}>AddList</button>
        <table>
            <tbody  style={{align: "centre"}}> 
                
                <tr>
                    <th>Task</th>
                    <th>Completion Date</th>
                    <th>Priority</th>
                </tr>       
                    {
                        todoList.map(value => (     
                            
                            <tr  style={{align: "centre"}} key={value.id}>
                                <td><span id={value.id}>{value.listName}</span></td>
                                <td>{value.date}</td>
                                <td>{value.priority}</td>
                                {/* <td><button id="btnEdit" key={value.id} onClick={() => editItemInList(value.id)}>EDIT</button></td> */}
                                <td><button id="btnDelete" onClick={() => deleteItemInList(value.id)}>Delete</button></td>
                                <td><button id="btnComplete"  onClick={() => completedItemInList(value.id)}>Completed</button></td>
                            </tr>                       
                            
                        ))
                    }
            </tbody>
        </table>
        <br/>
        <h1>Completed List</h1>
        <table>
            <tbody style={{ color:'green'}}>    
                <tr>
                    <th>Task</th>
                    <th>Completion Date</th>
                    <th>Priority</th>
                </tr>
                    {
                        completedToDoList.map(value => ( 
                               
                            <tr key={value.id}>
                                <td><span id={value.id}>{value.listName}</span></td>
                                <td>{value.date}</td>
                                <td>{value.priority}</td>
                            </tr>                       
                            
                        ))
                    }
            </tbody>
        </table>
            
       
        </div>
    )
}

export default ToDoContainer;
// const mapStateToProps = state =>{
//     return{
//         todoList: state.todoList
//     }
// }

// const mapDispatchToProps = dispatch =>{
//     return{        
//         addToDoList: (todoListValue)=>dispatch(addToDoList(todoListValue))
//     }
// }

// export default connect(
//                 mapStateToProps,
//                 mapDispatchToProps
//             )(ToDoContainer)
