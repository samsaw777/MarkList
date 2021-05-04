import React,{useState,useEffect} from 'react'
 


function Inputmap() {
    var a = []
    a = JSON.parse(window.localStorage.getItem('Item'))
    return (
        <div>
            {
                a?a.map(item=>(
                    <div className="taskmaindiv" key={item.key}>
                    <p>{item.text}</p>
                    <p>{item.time}</p>
                    </div>
                    )):<div></div>
            }
        </div>
    )
}

export default Inputmap
