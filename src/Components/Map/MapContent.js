import React,{useEffect,useState}  from 'react'
import { MapContainer, TileLayer, useMap} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import '../CSS/Input.css'  
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;


const features = "hello"
console.log(features);
function MapContent(props) {
    const coordinates = [
         props.coordinate.latitude, props.coordinate.longitude
    ]
    const [show,setShow] = useState(false)
    const[inputone, setInputOne] = useState('')
    const[inputtwo,setInputTwo] = useState('')
    const[lat,setLat] = useState('')
    const [long,setLong] = useState('')
    // console.log(click)
    let map;




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




      //Handing the Input and the marker
      const showmarker = (e)=>{
          e.preventDefault()
          L.marker([lat,long])
          .addTo(map)
          setShow(false)
      }





      //Input Component
        const Inputform = ()=>{
            return(
                <div className="Inputtab">
                    <form onSubmit={showmarker}>
                        <input 
                        type='text'
                        onChange={e => setInputOne(e.target.value)}
                        value={inputone}
                        />
                        <input
                        type='text'
                        onChange={e => setInputTwo(e.target.value)}
                        value={inputtwo}
                        />
                        <input type="submit" value="Submit"/>
                    </form>
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
