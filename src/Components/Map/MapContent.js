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
import ShowInput from './Inputmap'
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
    const[lat,setLat] = useState('')
    const [long,setLong] = useState('')
    const [time,setTime] = useState(new Date())
    console.log(time)
    const [totalitems, setTotalItems] = useState([])
    console.log(totalitems)
    // const[getitems, setGetItems] = useState([])
    // console.log(getitems)
    const [currentItem, setCurrentItem] = useState({
        text: '',
        key:''
    })
    console.log(currentItem)
    // console.log(click)
    let map;
    // var localstorage = window.localStorage
    // var i  = window.localStorage.getItem('Item')
    // console.log(i)
    // useEffect(() =>{
    //     allstorage()
    // },[])


    // const allstorage = ()=>{
    //     var values =[]
    //     var key = Object.keys(localstorage)
    //     var i = key.length
    //      while(i--){
    //          values.push(localstorage.getItem(key[i]))
    //      }
    //      setGetItems({...values})
    // }
    // Show the map
    function Showmap({ coordinates }) {
        map = useMap();
        map.setView(coordinates, map.getZoom());
        map.on('click',(e)=>{
            const {lat, lng} = e.latlng
            setShow(true)
            setLong(lng)
            setLat(lat)
        })

        return null
      }


      //Add items
      const additems = e =>{
          e.preventDefault()
          const newItem = {...currentItem,time:time.getTime(),coordinates:[lat,long]}
          if (newItem.text !==''){
              const items = [...totalitems,newItem]
              window.localStorage.setItem('Item',JSON.stringify(items))
              setTotalItems(items)
              setCurrentItem({
                  text: '',
                  key:''
              })
              showmarker()
          }
        //   storelocalstorage()
      }

      //Handing the Input and the marker
      const showmarker = ()=>{
          L.marker([lat,long])
          .addTo(map)
          setShow(false)
      }

      //Storing into local storage
    //   const storelocalstorage = ()=>{
          
    //   }


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
                <ShowInput />
            </div>

        </div>
    )
}

export default MapContent
