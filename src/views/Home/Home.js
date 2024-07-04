import "./Home.css"
import AddIcon from "./plus.png"
import ToDoCard from "./../../components/ToDoCard/ToDoCard"
import { useEffect, useState } from "react"
import toast, { Toaster} from "react-hot-toast";

function Home(){

  const [todoList, setTodoList] = useState([])
  const [newTask, setNewTask] = useState("")
  const [category, setCategory] = useState("")


useEffect(()=>{
  const savedTodoList = localStorage.getItem("todoList")

  if(savedTodoList){
    setTodoList(JSON.parse(savedTodoList))
  }

}, [])

  useEffect(()=> {
    if(todoList.length === 0) return
    localStorage.setItem("todoList", JSON.stringify (todoList))
  }, [todoList])


function deleteItem(index){
    const newTodoList = todoList.filter((item, i)=>{
    if (i == index){
     return false
    }
    else{
     return true
    }
     }) 

  setTodoList(newTodoList)
  }



    return(
        <div>
            <h1 className="app-title">ToDo App 📑</h1>

            <div className="todo-list-container">
                {todoList.map((todoItem,i)=>{

               const {task, category} = todoItem

                return  <ToDoCard key={i} index={i} task={task} category={category} 
                deleteItem={deleteItem}/>
                  })}  
               
               {
                todoList.length === 0 ? 
                 <p style={{textAlign:"center"}}>
                List is empty, Please add a new task
              </p> : null
               }
                
            </div>
               

            <div className="add-todo-item-container">
                <input
                 type="text"
                  className="add-input" 
                  placeholder="Add task"
                  value={newTask}
                  onChange={(e)=>setNewTask(e.target.value)}
                  />     

                   <select 
                   className="category-select" 
                   value={category}
                   onChange={(e)=>setCategory(e.target.value)}
                    >
                    <option value="">Empty</option>
                    <option value="learning">Learning</option>
                    <option value="work">Work</option>
                    <option value="personal">Personal</option>
                    <option value="shopping">Shopping</option>
                    <option value="health">Health</option>
                    <option value="others">Others</option>
                   </select>

                <img
                 src={AddIcon}
                 alt="Add" 
                 className="add-icon" 
                 onClick={()=>{
                 if(newTask === ""){
                  toast.error('Task cannot be empty!')
                  return
                 }

                 if(category === ""){
                  toast.error('Please select a category')
                  return
                 }

                   setTodoList([...todoList,{task: newTask, category: category}])
                   setNewTask("")
                   setCategory("")
                   toast.success('Task added successfully')
                 }} 
                 />      
            </div>
            <Toaster position="top-left" />


        </div>)
}


export default Home
