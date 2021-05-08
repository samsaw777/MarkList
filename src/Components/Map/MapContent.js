import React,{useState,useEffect}  from 'react'
import { MapContainer, TileLayer, useMap} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import '../CSS/Input.css'  
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import Grid from '@material-ui/core/Grid'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider, KeyboardTimePicker} from '@material-ui/pickers'
import ShowInput from './Inputmap'
import {db} from '../../Firebase'

console.log(db)
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

function MapContent(props) {
    const coordinates = [
         props.coordinate.latitude, props.coordinate.longitude
    ]
    const loading = props.loading
    console.log(loading)
    const [show,setShow] = useState(false)
    const[lat,setLat] = useState('')
    const [long,setLong] = useState('')
    const [time,setTime] = useState(new Date())
    console.log(time)
    const [change, setChange] = useState(true)
    const [currentItem, setCurrentItem] = useState({
        text: '',
        key:''
    })
    console.log(currentItem)
    // const [getItems, setGetItems] = useState([])
    // console.log(getItems)
    // const [loading, setLoading] = useState(false)
    // console.log(loading)
    let map;



    //Show the map
    function Showmap({ coordinates }) {
        map = useMap();
        // map.on('load',()=>{
        //     setLoading(!loading)
        // })
        map.setView(coordinates, map.getZoom());

        map.on('click',(e)=>{
            const {lat, lng} = e.latlng
            setShow(true)
            setLong(lng)
            // setLoading(!loading)
            setLat(lat)
        })

        return null
      }

    //   const loadit = ()=>{
    //       setLoading(!loading)
    //   }
      //Showing the markers
    //   useEffect(()=>{
    //     loadit()
    //   },[])
    //   useEffect(() =>{
    //     let getItems  = []
    //     db.collection('marklist').get()
    //     .then(snapshot =>{
    //         snapshot.forEach(item =>{
    //             let itemID = item.id
    //             let itemobj = {...item.data(),['id']: itemID}
    //             getItems.push(itemobj)
    //         })
    //         setGetItems(getItems)
    //     })
    // },[])

    // useEffect(()=>{
    //     getItems.forEach(item =>{
    //         console.log(item.Latitude)
    //        const lat = item.Latitude
    //        const long = item.Longitude
    //         showmarker(lat,long)
    //     })
    // },[])

      const additems = e =>{
          e.preventDefault()
          var coordinates = {
              lat: '',
              long:''
          }
          const allcord = []
          if (currentItem.text !==''){
            db.collection("marklist").add({
                Task: currentItem.text,
                Key: currentItem.key,
                Time: time.toLocaleString(),
                Latitude: lat,
                Longitude: long
            })
            .then(()=>{
                console.log("Documents added sucessfully")
            })
            .catch((e)=>{
                console.error("Error while sending",e)
            })
            setCurrentItem({
                      text: '',
                      key:''
                  })
                  setChange(!change)
            showmarker(lat,long)
          }
      }

      //Handing the Input and the marker
      const showmarker = (lat,long)=>{
          L.marker([lat,long])
          .addTo(map)
          setShow(false)
      }


      //Handling the Time output
      const handleTime = e =>{
          console.log(e)
          setTime(e)
      }






      //Input Component
        const Inputform = ()=>{
            return(
                <div className="Inputtab">
                    <div>
                    <form onSubmit={additems}>
                        <Grid container className='grid'> 
                            <input 
                            className='todobox'
                            type='text'
                            placeholder='Enter your task you want do at selected place'
                            onChange={e => setCurrentItem({
                                text: e.target.value,
                                key: Date.now()
                            })}
                            value={currentItem.text}
                            />
                            <MuiPickersUtilsProvider utils={DateFnsUtils} className='timecontainer'>
                                <KeyboardTimePicker
                                    className='inputtime'
                                    margin='normal'
                                    id='timepicker'
                                    value={time}
                                    onChange={handleTime}
                                />
                            </MuiPickersUtilsProvider>
                            </Grid>
                            <input type="submit" value="Submit" className="submitbtn"/>
                    </form>
                    </div>
                </div>
            )
        }





    return (
        <div className='MainMapContainer'>
            <div className='Mapcontainer'>
                <MapContainer className="MapContainer" center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false} id="map">
                    
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    <Showmap coordinates={coordinates} />
                </MapContainer>
            </div>
            <div className='Inputcontainer'>
                <p className='Inputcontainerheading'>Click on the Map to add to do list.</p>
                {
                    show?<div className='Inputform'>{Inputform()}</div>:<div></div>
                }
                <ShowInput change={change} showmarker={showmarker} loading={loading}/>
            </div>

        </div>
    )
}

export default MapContent
