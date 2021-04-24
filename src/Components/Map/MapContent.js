import React,{useEffect,useState}  from 'react'
import { MapContainer, TileLayer, useMap} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import '../CSS/Input.css'  
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import Grid from '@material-ui/core/Grid'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider, KeyboardTimePicker} from '@material-ui/pickers'
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

function MapContent(props) {
    // const currentDate = new Date();
    // const currentTime = currentDate.getHours() + ':' + currentDate.getMinutes();
    // console.log(currentTime)
    const coordinates = [
         props.coordinate.latitude, props.coordinate.longitude
    ]
    const [show,setShow] = useState(false)
    const[inputone, setInputOne] = useState('')
    const[inputtwo,setInputTwo] = useState('')
    const[lat,setLat] = useState('')
    const [long,setLong] = useState('')
    const [time,setTime] = useState(new Date())
    console.log(time)
    // console.log(click)
    let map;




    // Show the map
    function Showmap({ coordinates }) {
        map = useMap();
        map.setView(coordinates, map.getZoom());
        map.on('click',(e)=>{
            console.log(e)
            const {lat, lng} = e.latlng
            setShow(true)
            setLong(lng)
            setLat(lat)
        })

        return null
      }




      //Handing the Input and the marker
      const showmarker = (e)=>{
          e.preventDefault()
          L.marker([lat,long])
          .addTo(map)
          setShow(false)
      }




      //Handling the Time output
      const handleTime = e =>{
          setTime(e)
      }




      //Input Component
        const Inputform = ()=>{
            return(
                <div className="Inputtab">
                    <div>
                    <form onSubmit={showmarker}>
                        <Grid container className='grid'> 
                            <input 
                            className='todobox'
                            type='text'
                            placeholder='Enter your task you want do at selected place'
                            onChange={e => setInputOne(e.target.value)}
                            value={inputone}
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
                <MapContainer className="MapContainer" center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
                    
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
                    show?Inputform():<div></div>
                }
            </div>

        </div>
    )
}

export default MapContent
