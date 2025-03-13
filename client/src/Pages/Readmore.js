import React from 'react'
import { useEffect, useState } from "react";
import { useParams, useOutletContext } from "react-router-dom";

function Readmore() {
  const { id } = useParams();
  const [{ data: event, error, status }, setEvent] = useState({
    data: null,
    error: null,
    status: "pending",
  });
  useEffect(() => {
    getSafari()
  }, [id]);

 async function getSafari(){
  try{const response = await fetch(`http://localhost:1337/api/safari-destinations/${id}?populate=*`)
  const event = await response.json()

  if(response.ok){
    setEvent({ data: event.data, error: null, status: "resolved" })
  }}
 
  catch(err){  setEvent({ data: null, error: err.message, status: "rejected" });}


 }
 if (status === "pending") return <p className="loading">Loading event details...</p>;
 if (status === "rejected") return <p className="error">⚠️ Error: {error}</p>;

  return (
    <div style={{marginTop:"100px"}}>
      <h1>{event.name}</h1>
      <h2>{event.description}</h2>
      <img  style={{width:"500px"}}src={event.image.url}></img>
      
    </div>
  )
}

export default Readmore
