import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTrash, faCheck} from '@fortawesome/free-solid-svg-icons';

function TodoItem(props) {
  const[isDone, setIsDone]= useState(props.completed);

  const handleDelete=()=>{
    props.deleteTodo(props.id);
  }

  const handleCompletedTasks=()=>{
   props.handleToggleCompleted(props.id);
   setIsDone(prevIsDone=>!prevIsDone)
  }
  
  return (
    <div className='list'>
     <span>{isDone ? <FontAwesomeIcon icon={faCheck} className='check'/> : null}</span>
         <li onClick={handleCompletedTasks}  style={{textDecoration: isDone ? 'line-through' : null }}>{props.text} </li>
         <button className='delete-btn' onClick={handleDelete}><FontAwesomeIcon icon={faTrash} /></button>
    </div>
  )
}

export default TodoItem

