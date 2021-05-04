import React,{useState,useEffect} from 'react'
 import {db} from '../../Firebase'


function Inputmap({change}) {
    const [getItems, setGetItems] = useState([])

    useEffect(() =>{
        let getItems  = []
        db.collection('marklist').get()
        .then(snapshot =>{
            snapshot.forEach(item =>{
                let itemID = item.id
                let itemobj = {...item.data(),['id']: itemID}
                getItems.push(itemobj)
            })
            setGetItems(getItems)
        })
    },[change])


    return (
        <div>
           {
               getItems.length > 0?
               getItems.map(item =>(
                   <div key={item.id}>
                       <p>{item.Task}</p>
                       <p>{item.Time}</p>
                   </div>
               )):
               <div></div>
           }
        </div>
    )
}

export default Inputmap
