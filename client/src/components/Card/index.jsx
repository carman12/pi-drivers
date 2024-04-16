import React from "react";
import { Link } from "react-router-dom";
import '../Card/card.css'


 const Card = (props) => { 
  return (
    
      <div className='container-card'>
        <h2>
          <div className="first-name">{props.forename}</div>
          <div className="last-name">{props.surname}</div>
        </h2>
        <Link to={`/details/${props.id}`}>          
        <img
          className='img'
          //src ={isNaN(props.id) ? props.image : props.image?.url}
          src ={props?.image}
          alt={props.forename}
        />
        </Link>
        <h4>Teams:</h4>
        <h4>{props.teams}</h4>
        <img src="" alt="" />
      </div>
    
  );
};

export default Card;