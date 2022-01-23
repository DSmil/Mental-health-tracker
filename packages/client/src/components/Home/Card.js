import React,{useState} from 'react';
import './Card.css'


function Card(props) {




    return (
        <div className='Card'>
            <div className='upper-container'>
                <div className='image-container'>
                    <img src={props.img_link} alt='' height="100px" width="100px"/>
                </div>
            </div>
            <div className="lower-container">
                <h3> { props.title } </h3>
                <p> { props.about } </p>
                <button className="btn-card"onClick={()=> window.open(props.link)}>Read more</button>
            </div>
        </div>
    )
}

export default Card