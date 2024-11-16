import React, { useContext } from 'react'
import './PaintDisplay.css'
import { StoreContext } from '../../context/StoreContext'
import PaintItem from '../PaintItem/PaintItem'

const PaintDisplay = ({category}) => {

     const {paint_list} = useContext(StoreContext)

  return (
    <div className='paint-display' id='paint-display'>
        <h2>Top paintings for you</h2>
        <div className="paint-display-list">
            {paint_list.map((item,index)=>{
              if (category==="All" || category===item.category) {
                return <PaintItem key={index} id={item._id} name={item.name} description={item.description} artist={item.artist} price={item.price} image={item.image}/>
              }  
            })}
        </div>
      
    </div>
  )
}

export default PaintDisplay
