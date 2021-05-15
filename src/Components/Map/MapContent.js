import React,{useState}  from 'react'
import {  MapContainer, TileLayer, useMap, Circle} from 'react-leaflet'
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

    // const {Latitude,Longitude} = props.getcord
    const cor = props.getcord
    console.log(cor)
    const [show,setShow] = useState(false)
    const[lat,setLat] = useState('')
    const [long,setLong] = useState('')

    const [change, setChange] = useState(true)
    const [currentItem, setCurrentItem] = useState({
        text: '',
        key:''
    })
    console.log(currentItem)
    // const [getItems, setGetItems] = useState([...props.getcord])
    // console.log(getItems)
    const [loading, setLoading] = useState(false)
    console.log(loading)
    // const [getcord,setGetCord] = useState([])
    // console.log(getcord)
    let map;

    //Show the map
    function Showmap({ coordinates }) {
        map = useMap();

        map.setView(coordinates, map.getZoom());
        map.on('load',()=>{
        //  cor.forEach(cors=>(
        //      L.marker.setLatLng([cors.Latitude,cors.Longitude])
        //  ))
        })
        map.on('click',(e)=>{
            const {lat, lng} = e.latlng
        cor.forEach(cors=>{
             showmarker(cors.Latitude,cors.Longitude)
            })
            setShow(true)
            setLong(lng)
            setLoading(!loading)
            setLat(lat)
            setTime(new Date())
        })


        return null
      }


      
      const [time,setTime] = useState()
      console.log(time)

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
    //   useEffect(()=>{
    //     L.geoJSON(cor).addTo(map)
    //   },[])

      const additems = e =>{
          e.preventDefault()
        //   var coordinates = {
        //       lat: '',
        //       long:''
        //   }
        //   const allcord = []
          if (currentItem.text !==''){
            db.collection("marklist").add({
                Task: currentItem.text,
                Key: currentItem.key,
                Time: time.toLocaleTimeString('it-IT'),
                TimeCompare: time.getTime(),
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


    // const Showmarkerfun = ()=>{
    //     cor.map(cor=>(
    //         <Marker center={[cor.Latitude,cor.Longitude]}>
                
    //         </Marker>
    //     ))
    // }
    //   const Showcircle = ()=>{
    //       cor.forEach(cors=>(
    //           <Circle center={[cors.Latitude,cors.Longitude]} radius={200} />
    //           ))
    //   }


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
                            autoFocus={true}
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
                    {/* <Showmarkerfun /> */}
                    
                    {/* {Showcircle()} */}
                    <Showmap coordinates={coordinates} />
                    {/* {showmarkerfun()} */}
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
