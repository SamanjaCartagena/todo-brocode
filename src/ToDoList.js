import React,{useState, useEffect} from 'react'
import { doc, getDoc, collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { db,auth  } from "./firebase";

function ToDoList() {
    const [tasks, setTasks] = useState([])
    const [newTask, setNewTask] = useState("")
    const [list, setList] = useState([])
    function handleInputChange(event){
        setNewTask(event.target.value)
    }
    function addTask(){
        if(newTask.trim()!==""){
          setTasks(t=>[...t, newTask]);
           
          setNewTask("");
        }
               


    }
    const submit =()=>{
         addDoc(collection(db, "todos"), {
                tasks:tasks
                 })
    }
    function deleteTask(index){
        const updatedTasks = tasks.filter((element, i)=>i !==index);
        setTasks(updatedTasks);


    }
    function moveTaskUp(index){
        if(index >0){
            const updatedTasks =[...tasks];
            [updatedTasks[index],updatedTasks[index-1]]=
            [updatedTasks[index-1],updatedTasks[index]];
            setTasks(updatedTasks);
        }

    }
    function moveTaskDown(index){
        if(index < tasks.length-1){
            const updatedTasks =[...tasks];
            [updatedTasks[index],updatedTasks[index+1]]=
            [updatedTasks[index+1],updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    useEffect(()=>{
                const loadData = async () => {
            const todos=[]
          const q =query(collection(db, "todos"));
           const querySnapshot = await getDocs(q);
               querySnapshot.forEach((doc) => {
                  todos.push({...doc.data().tasks});
                  setList(Object.entries(todos[0]))
               })
              console.log(list)
              console.log(todos[0])
            }
            loadData()
                    
              

    },[])
  return (
    <div className='to-do-list'>
        <h1>To-Do List</h1>
        <div>
        <input type="text"
        placeholder="Enter a task..."
        value={newTask}
        onChange={handleInputChange}
        />
        <button
        className='add-button'
        onClick={addTask}
        >
            Add
        </button>
        </div>
        <ol>
            {tasks.map((task, index)=>
              <li key={index}>
                <span className='text'>{task}</span>
                <button className='delete-button' onClick={()=>deleteTask(index)}>Delete</button>
                <button className='move-button' onClick={()=>moveTaskUp(index)}>Up</button>
                <button className='move-button' onClick={()=>moveTaskDown(index)}>Down</button>

              </li>

            )}
        </ol>
        <ol>
            {list.map((task, index)=>
              <li key={index}>
                <span className='text'>{task}</span>
                <button className='delete-button' onClick={()=>deleteTask(index)}>Delete</button>
                <button className='move-button' onClick={()=>moveTaskUp(index)}>Up</button>
                <button className='move-button' onClick={()=>moveTaskDown(index)}>Down</button>

              </li>

            )}
        </ol>
      
        <button onClick={submit}>Submit</button>
    </div>
  )
}

export default ToDoList