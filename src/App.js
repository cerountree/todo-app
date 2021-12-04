import logo from './logo.svg';
import './App.css';
import { Fragment, useEffect, useState } from 'react';
import TodoItem from "./components/todoItem";

function App() {
  const [todoItems, setTodoItems] = useState(null);

  useEffect(() =>{
    // do something on load
    console.log("Hey, I've loaded up")

    if(!todoItems){
      console.log('fetching list of todoitems')
      fetch('http://localhost:8080/api/todoItems/')
      .then((response) => 
      response.json()
      ).then((data) => {
        console.log("Todo items list: ", data);
        setTodoItems(data);
      });
    }
    
  }, [todoItems]);

  //ternary operator
  //if (something)
  //  do item 1
  //else
  //  do item 2

  function addNewTodoItem () {
    fetch("http://localhost:8080/api/todoItems", {
      headers: {
        'content-type': 'aplication/json'
      },
      method: 'POST',
    }).then(response => response.json())
    .then(aTodoItem => {
      console.log(aTodoItem);

      setTodoItems([...todoItems, aTodoItem]);
    });
  }

  function handleDeleteTodoItem (item) {
    const updatedTodoItems = todoItems.filter((aTodoItem) => aTodoItem.id !== item.id);
    console.log("updated todo items", updatedTodoItems)
    setTodoItems([...updatedTodoItems]);
  }
  return (
    <>
    <div>
      <button onClick={addNewTodoItem}>Add New Item</button>
    </div>
    <div>
      {todoItems 
        ? todoItems.map((todoItem) => {
        return (
        <TodoItem key={todoItem.id} 
        data={todoItem} 
        emitDeleteTodoItem={handleDeleteTodoItem} />
      );
  })  
   : 'loading data...'}
    </div>
    </>
  );
}

export default App;
