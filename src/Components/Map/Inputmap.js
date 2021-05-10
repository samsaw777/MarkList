import React,{useState,useEffect} from 'react'
 import {db} from '../../Firebase'
import '../CSS/output.css'

function Inputmap({change,showmarker,loading,getcord}) {
    const [getItems, setGetItems] = useState([])
    console.log(getItems)
    const [inarray,setInarray] = useState(true)
    const [deletei,setDelete] = useState(false)
    const [fetch, setFetch] = useState(true)
    const [selectedItem,setSelectedItem] = useState()
    console.log(selectedItem)
    const date = new Date()
    console.log(date.toLocaleTimeString('it-IT'))
    // useEffect(()=>{
    //     displaycor()
    // },[loading,deletei])
    // useEffect(()=>{
    //     getcord.forEach(item =>{
    //         showmarker(item.Latitude,item.Longitude)
    //     })
    // },[])


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
        setInarray(!inarray)
        // getcord.forEach(item =>{
        //     showmarker(item.Latitude,item.Longitude)
        // })

    },[change,fetch])
   
    const displaycor = ()=>{
        getItems.forEach(item =>{
            console.log(item.Latitude)
           const lat = item.Latitude
           const long = item.Longitude
            showmarker(lat,long)
        })
    }
    const deleteitems = id =>{
        setFetch(!fetch)
        const userID = id
        db.collection('marklist').doc(`${userID}`).delete()
        .then(() =>{
            console.log('Item deleted successfully!')
        })
        .catch(error =>{
            console.log(error)
        })
        setDelete(!deletei)
    }

    const completeTask = id =>{
        const userID = id
        db.collection('marklist').doc(`${userID}`).get()
        .then(snapshot =>{
            // setSelectedItem(snapshot.data())
            const {Time} = snapshot.data()
            console.log(Time)
            if (Time > date.toLocaleTimeString()){
                setSelectedItem(true)
            }
            else{
                setSelectedItem(false)
            }
        })
    }


    return (
        <div className="inputmain">
           {
               getItems.length > 0?
               getItems.map(item =>(
                   <div key={item.id} className='itemoutput'>
                       <p>{item.Time}</p>
                       <div className='taskdiv'>
                            <p className='itemtask'>{item.Task}</p>
                            <p className='itemaction'>
                                <a className='completed' onClick={e => completeTask(item.id)}>
                                    <i class="fa fa-check" aria-hidden="true"></i>
                                </a>
                                <a className="text-danger" onClick={e => {deleteitems(item.id)}}>
                                    <i className="far fa-trash-alt"></i>
                                </a>
                            </p>
                        </div>
                   </div>
               )):
               <div></div>
           }
        </div>
    )
}

export default Inputmap
