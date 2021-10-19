import React,{useState,useEffect} from 'react'
import {addToDoList, editToDoList, deleteToDoList, completedList, sortOnClick} from '../redux'
import {useSelector, useDispatch} from 'react-redux'
import {connect} from 'react-redux'
import './todoContainer.css'
import addNotification from 'react-push-notification';
import Header from './Header'


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
        var textValidation = true;
        var dateValidation = true;
        todo = {
            listName: todoText,
            date : todoDate,
            priority : todoPriority
        }
        if(todo.listName===''){
            document.getElementById('textBoxSpanError').style.visibility = 'visible';
            textValidation = false;
        }else{
            document.getElementById('textBoxSpanError').style.visibility = 'hidden';
            textValidation = true;
        }
        if(todo.date===''){
            document.getElementById('dateSpanError').style.visibility = 'visible';
            dateValidation = false;
        }else{
            document.getElementById('dateSpanError').style.visibility = 'hidden';
            dateValidation = true;
        }
        if(textValidation && dateValidation){
            setCount(count+1)
         dispatch(addToDoList(todo))  
        }
        
    }

    const deleteItemInList = (id) =>{        
        dispatch(deleteToDoList(id))
        console.log("After delete",todoList)
    }

    const editItemInList = (id) =>{
        document.getElementById(id).contentEditable = true;
    }

    const completedItemInList = (id) =>{
        dispatch(completedList(id))
    }

    const sortData = (arg) =>{
        dispatch(sortOnClick(arg))
        console.log("After Sorting the data",todoList)
    }

    return (
        <div className="todoList" >
        <Header arr={todoList}></Header>
            <div className="inputData">
                <div className="inputItems"><span style={{color: 'red'}}>*</span><span id="text">Task</span></div>
                <div className="inputItems"><input type="text" onChange={getToDoText} placeholder=""/>
                <span id="textBoxSpanError" style={{visibility: 'hidden'}}>Kindly enter task name</span></div>
                
                <div className="inputItems"><span style={{color: 'red'}}>*</span><span id="tedatext">Date:</span></div>
                <div className="inputItemsDate"><input  type="date" onChange={getDate}/>
                <span  id="dateSpanError" style={{visibility: 'hidden'}}>please select a date</span></div>
                
                <div className="inputItems"><span id="text">Priority:</span></div>
                <div className="inputItems">
                    <select name="priority" id="priority" onChange={getPriority}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select></div>
                <button className="btnList" onClick={addToList}>Add Task</button>
            </div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Task</th>
                            <th>Completion Date</th>
                            <th>Priority</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>                                                
                        {
                            todoList.map(value => (     
                                
                                <tr  style={{align: "centre"}} key={value.id}>
                                    <td><span id={value.id}>{value.listName}</span></td>
                                    <td>{value.date}</td>
                                    <td>{value.priority}</td>
                                    {/* <td><button id="btnEdit" key={value.id} onClick={() => editItemInList(value.id)}>EDIT</button></td> */}
                                    <td><button className="btnList" id="btnDelete" onClick={() => deleteItemInList(value.id)}>Delete</button></td>
                                    <td><button className="btnList" id="btnComplete"  onClick={() => completedItemInList(value.id)}>Completed</button></td>
                                </tr>                       
                                
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <br/>
            <div className="completed"> 
                <div >
                    <header>
                        <h4>Completed Count:{completedToDoList.length}</h4>
                        <h1 >Completed LIST</h1>
                    </header>
                </div>            
                <table>
                    <thead>
                        <tr>
                            <th>Task</th>
                            <th>Completion Date</th>
                            <th>Priority</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>    
                        
                        {
                            completedToDoList.map(value => ( 
                                
                                <tr key={value.id}>
                                    <td><span id={value.id}>{value.listName}</span></td>
                                    <td>{value.date}</td>
                                    <td>{value.priority}</td>
                                    <td></td>
                                    <td></td>
                                </tr>                       
                                
                            ))
                        }
                    </tbody>
                </table>
                    
            </div>
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
