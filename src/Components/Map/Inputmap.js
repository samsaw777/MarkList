import React from 'react'
 


function Inputmap({show}) {
    console.log(show)
    return (
        <div className={show ? "show" : "hide"}>
            This is input form.
        </div>
    )
}

export default Inputmap
