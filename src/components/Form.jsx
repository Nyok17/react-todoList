import React from 'react';

function Form({inputText, handleChange, handleTodos}) {
  return (
   <form onSubmit={handleTodos}>
        <div className='form'>
       <input type='text' value={inputText} onChange={handleChange} placeholder='enter task' />
       <button onClick={handleTodos}>+</button>
       </div>
       </form>
  )
}

export default Form