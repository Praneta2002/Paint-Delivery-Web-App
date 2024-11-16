// import React, { useContext, useState, useRef, useEffect } from 'react';
// import './PaintItem.css';
// import { assets } from '../../assets/frontend_assets/assets';
// import { StoreContext } from '../../context/StoreContext';

// const PaintItem = ({ id, name, price, description, image, artist }) => {
//   const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);
//   const [isPopupOpen, setIsPopupOpen] = useState(false);
//   const [showAddToCartMsg, setShowAddToCartMsg] = useState(false);
//   const popupRef = useRef(null);

//   const handlePopupOpen = () => {
//     setIsPopupOpen(true);
//   };

//   const handlePopupClose = () => {
//     setIsPopupOpen(false);
//   };

//   const handleAddToCart = (e) => {
//     e.stopPropagation();
//     addToCart(id);
//     setShowAddToCartMsg(true);
//     setTimeout(() => {
//       setShowAddToCartMsg(false);
//     }, 2000); // Show the message for 2 seconds
//   };

//   const handleClickOutside = (event) => {
//     if (popupRef.current && !popupRef.current.contains(event.target)) {
//       handlePopupClose();
//     }
//   };

//   useEffect(() => {
//     if (isPopupOpen) {
//       document.addEventListener('mousedown', handleClickOutside);
//     } else {
//       document.removeEventListener('mousedown', handleClickOutside);
//     }
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [isPopupOpen]);

//   return (
//     <div>
//       <div className='paint-item' onClick={handlePopupOpen}>
//         <div className="paint-item-img-container">
//           <img className='paint-item-image' src={url + "/images/" + image} alt={name} />
//           {!cartItems[id]
//             ? <img className='add' onClick={handleAddToCart} src={assets.add_icon_white} alt="Add to Cart" />
//             : <div className='paint-item-counter'>
//               <img onClick={(e) => { e.stopPropagation(); removeFromCart(id); }} src={assets.remove_icon_red} alt="Remove from Cart" />
//               <p>{cartItems[id] || 0}</p>
//               <img onClick={(e) => { e.stopPropagation(); addToCart(id); }} src={assets.add_icon_green} alt="Add to Cart" />
//             </div>
//           }
//         </div>
//         <div className="paint-item-info">
//           <div className="paint-item-name-rating">
//             <p>{name}</p>
//             <img src={assets.rating_starts} alt="Rating" />
//           </div>
//           <p className="paint-item-desc">{description}</p> <br />
//           <p className="paint-item-artist">Artist: {artist}</p>
//           <p className="paint-item-price">${price}</p>
//         </div>
//       </div>

//       {isPopupOpen && (
//         <div className='paint-item-popup'>
//           <div className='popup-content' ref={popupRef}>
//             <img src={url + "/images/" + image} alt={name} className="popup-image" />
//             <div className='popup-content-right'>
//               <h3>{name}</h3>
//               <p>{description}</p> <br />
//               <p className="popup-artist">Artist: {artist}</p>
//               <div className="popup-price">${price}</div>
//               <div className="buttons">
//                 <button
//                   className="add-to-cart"
//                   onClick={handleAddToCart}
//                 >
//                   Add to Cart
//                 </button>
//               </div>
//             </div>
//             <span className='close-icon' onClick={handlePopupClose}>&times;</span>
//           </div>
//         </div>
//       )}

//       {showAddToCartMsg && (
//         <div className='add-to-cart-msg'>
//           <p>Item added to cart!</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PaintItem;
import React, { useContext, useState, useRef, useEffect } from 'react';
import './PaintItem.css';
import { assets } from '../../assets/frontend_assets/assets';
import { StoreContext } from '../../context/StoreContext';

const PaintItem = ({ id, name, price, description, image, artist }) => {
  const { cartItems, addToCart, removeFromCart, url, updateRating } = useContext(StoreContext);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [showAddToCartMsg, setShowAddToCartMsg] = useState(false);
  const [rating, setRating] = useState(0); // State for the user's rating
  const [hoverRating, setHoverRating] = useState(null); // State for hover effect on rating stars
  const popupRef = useRef(null);

  const handlePopupOpen = () => {
    setIsPopupOpen(true);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(id);
    setShowAddToCartMsg(true);
    setTimeout(() => {
      setShowAddToCartMsg(false);
    }, 2000); // Show the message for 2 seconds
  };

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      handlePopupClose();
    }
  };

  const handleRatingClick = (rate) => {
    setRating(rate);
    updateRating(id, rate); // Function to update rating in the context or backend
  };

  const handleMouseEnter = (rate) => {
    setHoverRating(rate);
  };

  const handleMouseLeave = () => {
    setHoverRating(null);
  };

  useEffect(() => {
    if (isPopupOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isPopupOpen]);

  // Render rating stars
  const renderStars = (currentRating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`star ${i <= (hoverRating || currentRating) ? 'filled' : ''}`}
          onClick={() => handleRatingClick(i)}
          onMouseEnter={() => handleMouseEnter(i)}
          onMouseLeave={handleMouseLeave}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div>
      <div className='paint-item' onClick={handlePopupOpen}>
        <div className="paint-item-img-container">
          <img className='paint-item-image' src={url + "/images/" + image} alt={name} />
          {!cartItems[id]
            ? <img className='add' onClick={handleAddToCart} src={assets.add_icon_white} alt="Add to Cart" />
            : <div className='paint-item-counter'>
              <img onClick={(e) => { e.stopPropagation(); removeFromCart(id); }} src={assets.remove_icon_red} alt="Remove from Cart" />
              <p>{cartItems[id] || 0}</p>
              <img onClick={(e) => { e.stopPropagation(); addToCart(id); }} src={assets.add_icon_green} alt="Add to Cart" />
            </div>
          }
        </div>
        <div className="paint-item-info">
          <div className="paint-item-name-rating">
            <p>{name}</p>
            <div className="rating-stars">
              {renderStars(rating)}
            </div>
          </div>
          <p className="paint-item-desc">{description}</p> <br />
          <p className="paint-item-artist">Artist: {artist}</p>
          <p className="paint-item-price">${price}</p>
        </div>
      </div>

      {isPopupOpen && (
        <div className='paint-item-popup'>
          <div className='popup-content' ref={popupRef}>
            <img src={url + "/images/" + image} alt={name} className="popup-image" />
            <div className='popup-content-right'>
              <h3>{name}</h3>
              <p>{description}</p> <br />
              <p className="popup-artist">Artist: {artist}</p>
              <div className="popup-price">${price}</div>
              <div className="paint-item-name-rating">
            <p>{name}</p>
            <div className="rating-stars">
              {renderStars(rating)}
            </div>
          </div>
              <div className="buttons">
                <button
                  className="add-to-cart"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </button>
              </div>
            </div>
            <span className='close-icon' onClick={handlePopupClose}>&times;</span>
          </div>
        </div>
      )}

      {showAddToCartMsg && (
        <div className='add-to-cart-msg'>
          <p>Item added to cart!</p>
        </div>
      )}
    </div>
  );
};

export default PaintItem;
