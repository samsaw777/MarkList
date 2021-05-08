import React, {useState, useEffect} from 'react'
import Mark from './MapContent'
function Markme() {
    const [coordinate,setCoordinate] = useState({longitude: "",latitude: ""})
    const [loading, setLoading] = useState(false)
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
        <div>
            {/* C */}
            <Mark coordinate={coordinate} loading={loading}/>
        </div>
    )
}

export default Markme
