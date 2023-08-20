
import { useState, useEffect } from "react";
import { TfiClose,TfiPlus,TfiPencil ,TfiCheck} from "react-icons/tfi";
import toast, { Toaster } from 'react-hot-toast';
import DarkModeComponent from "./components/DarkMode";
const App = () => {



  //For Storing all todos
  const [todos, setTodos] = useState(() => {
    //To retrieve data from local storage
    const savedTodo = localStorage.getItem("todos");
    if (savedTodo) {
      return JSON.parse(savedTodo);
    } else {
      return [];
    }
  });
  //For taking input
  const [todo, setTodo] = useState("");





  //********************************Edit Todo************************************************
  //for editing todos
  // boolean state to know if we are editing (this will let us display
  // different inputs based on a condition (conditional rendering)
  const [isEditing, setIsEditing] = useState(false);
  // object state to set so we know which todo item we are editing
  const [curTodo, setCurTodo] = useState({});

  // function to get the value of the edit input and set the new state
  function handleEditInput(e) {
    // set the new state value to what's currently in the edit input box
    let val=e.target.value
    if(val==""){
      return toast.error("Enter some data",{duration:1000})
      
    }else{
      setCurTodo({ ...curTodo, text: e.target.value });

    }
    
    
  }
  function handleEditForm(e) {
    e.preventDefault();
    handleUpdateTodo(curTodo.id, curTodo);
  }
  function handleUpdateTodo(id, updateTodo) {
    // here we are mapping over the todos array - the idea is check if the todo.id matches the id we pass into the function
    // if the id's match, use the second parameter to pass in the updated todo object
    // otherwise just use old todo
    const updatedItem = todos.map((todo) => {
      return todo.id == id ? updateTodo : todo;
    });
    setIsEditing(false);
    setTodos(updatedItem);
    toast.success("Data updated Succesfully",{
      icon:"💥",
      duration:1000

     
    })
  }
  function handleEditClick(todo) {
    setIsEditing(true);
    setCurTodo({ ...todo });
  }

  //For storing in localstorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
    //stores data in storage when something changes in todos
  }, [todos]);

  //**************************************Creating Todo********************************************
  //Submit function
  function handleSub(e) {
    e.preventDefault();
    if (todo == "") return toast.error("Add Some Data!");
    let data = {
      id: todos.length + 1,
      text: todo,
    };
    setTodos([...todos, data]);
    toast.success("Data Added!",{
      icon:"😎",
      duration:1000

    })
    setTodo("");
  }

  //***********************************Deleting todo***********************************************
  function del(id) {
    const deleted = todos.filter((todo) => {
      return todo.id != id;
    });
    setTodos(deleted);
    toast.success("Deleted Succesfully",{
      duration:1000
    })
  }
  return (
    <>
   <DarkModeComponent/>
      {isEditing ? (
        <div className="container text-center mt-4 bg-primary-subtle rounded py-4 shadow-lg">
          Edit Todo
          <form onSubmit={handleEditForm} className="editform">
            <input
              type="text"
              placeholder="Edit Todo"
              value={curTodo.text}
              onChange={handleEditInput}
            />
            <button className="btn-primary button-29" type="submit">
              <TfiCheck/>
            </button>
            <button className="btn-primary button-29" onClick={() => setIsEditing(false)}>
              <TfiClose/>
            </button>
          </form>
        </div>
      ) : (
        <div className="container text-center mt-4 bg-primary-subtle rounded py-4 shadow-lg ">
          
          <h2>Todo App</h2>
          <p>{todo.id}</p>
          <form onSubmit={handleSub} className="todo">
            <input
              type="text"
              placeholder="ENTER TODO.."
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
            />
            <button className="btn-primary mx-2 outline-none button-29" type="submit">
              <TfiPlus/>
            </button>
          </form>
          <ol>
            {todos.map((todo) => {
              let { id, text } = todo;
              return (
                <>
                  <li key={id}>
                    {text}{" "}
                    <div>
                      <button className="button-29 del" onClick={() => del(id)}><TfiClose/></button>{" "}
                      <button className="button-29" onClick={() => handleEditClick(todo)}>
                        <TfiPencil/>
                      </button>
                    </div>
                  </li>
                </>
              );
            })}
          </ol>
        </div>
      )}
      <Toaster/>
    </>
  );
};

export default App;
