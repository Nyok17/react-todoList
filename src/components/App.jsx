import React, { useEffect, useState } from 'react'
import TodoItem from './TodoItem';
import Form from './Form';
import { db } from '../Firebase/firebase';
import { ref, set, push, onValue, remove } from 'firebase/database';
import Auth from '../Firebase/Auth';


function App() {
    const[inputText, setInputText]= useState("");
    const[items, setItems]= useState([]);


    useEffect(()=>{
      const todoRef= ref(db, 'items/');
      onValue(todoRef, (snapshot)=>{
        const data= snapshot.val();
        console.log('Fetched data', data);

        const todoList= data ? Object.keys(data).map(key=>({
          id: key,
          ...data[key]
        })) : []
        setItems(todoList)
      })
    },[])

   
    const handleChange=(e)=>{
        setInputText(e.target.value)
    }
    const handleTodos=(e)=>{
      e.preventDefault()
        if(inputText.trim()){
          const todoRef= ref(db, 'items/');
          const newTodoRef= push(todoRef)

          set(newTodoRef, {
            text: inputText,
            completed: false
          })

          setInputText('')
        }
    };

    const handleToggleCompleted=(todoId)=>{
      const todo= items.find(item=> item.id===todoId)
      if(todo){
        const todoRef= ref(db, `items/${todoId}`);
        set(todoRef, {
          ...todo,
          completed: !todo.completed
        })
      }
    }

    const deleteTodo=(id)=>{
      const todoRef= ref(db, `items/${id}`);
      remove(todoRef);
    }

  return (
    <div className='todo-app'>
       <Auth />
    <div className='container'>
        <div className='header'><h1>Todo List</h1></div>
        <Form 
          inputText={inputText}
          setInputText={setInputText}
          items={setItems}
          handleChange={handleChange}
          handleTodos={handleTodos}
        />
       <ul>
       {items.map((todoItem)=>(
       <TodoItem 
       text={todoItem.text}
        key={todoItem.id}
        id={todoItem.id}
        deleteTodo={deleteTodo}
        handleToggleCompleted={handleToggleCompleted}
        completed={todoItem.completed}
       />
       ))}
       </ul>
    </div>
    </div>
  )
}

export default App