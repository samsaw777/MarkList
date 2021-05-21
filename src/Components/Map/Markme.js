import React, {useState, useEffect} from 'react'
import Mark from './MapContent'
import '../CSS/Markme.css' 
function Markme({getcord}) {
    const [coordinate,setCoordinate] = useState({longitude: "",latitude: ""})
    const [loading, setLoading] = useState(false)
    // const [getcord, setGetCord] = useState([])
    // console.log(getcord)
    useEffect(()=>{
        if("geolocation" in navigator){
            navigator.geolocation.getCurrentPosition(position =>{
                // console.log(position)
                setCoordinate({
                    longitude: position.coords.longitude,
                    latitude: position.coords.latitude
                })
                setLoading(true)
            })
        }else{
            console.log("false")
        }

    },[])
    console.log(coordinate)
    return (
        <div className="markmeouterdiv">
            {/* C */}
            <Mark coordinate={coordinate} loading={loading} getcord={getcord}/>
        </div>
    )
}

export default Markme
