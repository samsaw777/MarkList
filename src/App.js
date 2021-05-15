import React, {useState, useEffect} from 'react'
import './App.css';
import {db} from './Firebase'
import Markme from './Components/Map/Markme'
function App() {
  const [getcord, setGetCord] = useState([])
  console.log(getcord)
  useEffect(()=>{
    const getItems = []
    db.collection('marklist').get()
    .then(snapshot =>{
      snapshot.forEach(item =>{
          let itemID = item.id
          let itemobj = {...item.data(),['id']: itemID}
          getItems.push(itemobj)
      })
      setGetCord(getItems)
  })
  },[])
  return (
    <div className="App">
      <Markme getcord={getcord}/>
    </div>
  );
}

export default App;
