import React,{useState,useEffect} from 'react'
 import {db} from '../../Firebase'
import '../CSS/output.css'

function Inputmap({change,showmarker}) {
    const [getItems, setGetItems] = useState([])
    console.log(getItems)
    const [inarray,setInarray] = useState(true)
    const [deletei,setDelete] = useState(false)
    const [fetch, setFetch] = useState(true)

    // useEffect(()=>{
    //     displaycor()
    // },[])

    // useEffect(()=>{
    //     displaycor()
    // },[deletei])

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
                                <a className='completed'>
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
