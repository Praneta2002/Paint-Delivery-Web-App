// import React, { useState } from 'react';
// import './ArtMasterpieceHunt.css';

// const SpinWheel = () => {
//   const [angle, setAngle] = useState(0);
//   const [isSpinning, setIsSpinning] = useState(false);
//   const options = ['Free Shipping', '10% Discount', '20% Discount', '15% Discount', 'No Luck', 'Buy One Get One'];
//   const colors = ['#ff6666', '#66b3ff', '#99ff99', '#ffcc66', '#d9d9d9', '#ff99cc'];

//   const spin = () => {
//     if (!isSpinning) {
//       setIsSpinning(true);
//       const randomAngle = Math.floor(5000 + Math.random() * 5000); // Generate random spin
//       setAngle(randomAngle);
//       setTimeout(() => {
//         const prizeIndex = getPrize(randomAngle % 360);
//         alert(You won: ${options[prizeIndex]});
//         setIsSpinning(false);
//       }, 5000); // Match timing to CSS animation duration
//     }
//   };

//   const getPrize = (currentAngle) => {
//     const sectionAngle = 360 / options.length;
//     let index = Math.floor(currentAngle / sectionAngle);
//     return options.length - 1 - index;
//   };

//   return (
//     <div className="spin-wheel-container">
//       <div className="wheel-container">
//         <div className="wheel" style={{ transform: rotate(${angle}deg) }}>
//           {options.map((option, index) => (
//             <div
//               key={index}
//               className="segment"
//               style={{
//                 transform: rotate(${index * (360 / options.length)}deg),
//                 backgroundColor: colors[index], // Assign a color to each segment
//               }}
//             >
//               <div className="label-container">
//                 <span className="label">{option}</span>
//               </div>
//             </div>
//           ))}
//         </div>
//         {/* <div className="center-pointer"></div> */}
//          {/* Center pointer */}
//         <br />
//         <br />
//         <button className="spin-button" onClick={spin} disabled={isSpinning}>
//           {isSpinning ? 'Spinning...' : 'Spin the Wheel'}
//         </button>
//       </div>

//       {/* Color legend */}
//       {/* <div className="offer-info">
//         <h3>Offer Legend</h3>
//         <ul>
//           <li><span className="color-box" style={{ backgroundColor: '#ff6666' }}></span> Free Shipping</li>
//           <li><span className="color-box" style={{ backgroundColor: '#66b3ff' }}></span> 10% Discount</li>
//           <li><span className="color-box" style={{ backgroundColor: '#99ff99' }}></span> 20% Discount</li>
//           <li><span className="color-box" style={{ backgroundColor: '#ffcc66' }}></span> 15% Discount</li>
//           <li><span className="color-box" style={{ backgroundColor: '#d9d9d9' }}></span> No Luck</li>
//           <li><span className="color-box" style={{ backgroundColor: '#ff99cc' }}></span> Buy One Get One</li>
//         </ul>
//       </div> */}
//     </div>
//   );
// };

// export default SpinWheel;


import React, { useState } from 'react';
import './ArtMasterpieceHunt.css';

const SpinWheel = () => {
  const [angle, setAngle] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [popupMessage, setPopupMessage] = useState(null);
  const [promoCode, setPromoCode] = useState('');
  const options = ['Free Shipping', '10% Discount', '20% Discount', '15% Discount', 'No Luck', 'Buy One Get One'];
  const colors = ['#ff6666', '#66b3ff', '#99ff99', '#ffcc66', '#d9d9d9', '#ff99cc'];

  const spin = () => {
    if (!isSpinning) {
      setIsSpinning(true);
      const randomAngle = Math.floor(5000 + Math.random() * 5000); // Generate random spin
      setAngle(randomAngle);
      setTimeout(() => {
        const prizeIndex = getPrize(randomAngle % 360);
        const prize = options[prizeIndex];
        showPopup(prize);
        setIsSpinning(false);
      }, 5000); // Match timing to CSS animation duration
    }
  };

  const getPrize = (currentAngle) => {
    const sectionAngle = 360 / options.length;
    let index = Math.floor(currentAngle / sectionAngle);
    return options.length - 1 - index;
  };

  const showPopup = (prize) => {
    let message = `You won: ${prize}`;
    let promoCode = '';

    // Add a promo code for certain prizes
    if (prize.includes('Discount')) {
      promoCode = `PROMO${Math.floor(Math.random() * 10000)}`; // Generate a random promo code
      message += `! Use Promo Code: ${promoCode}`;
    }

    setPromoCode(promoCode);
    setPopupMessage(message);
    
    setTimeout(() => {
      setPopupMessage(null); // Hide the popup after 5 seconds
    }, 60000);
  };

  const copyPromoCode = () => {
    if (promoCode) {
      navigator.clipboard.writeText(promoCode);
      alert('Promo code copied to clipboard!');
    }
  };

  return (
    <div className="spin-wheel-container">
      <div className="wheel-container">
        <div className="wheel" style={{ transform:`rotate(${angle}deg)` }}>
          {options.map((option, index) => (
            <div
              key={index}
              className="segment"
              style={{
                transform: `rotate(${index * (360 / options.length)}deg)`,
                backgroundColor: colors[index], // Assign a color to each segment
              }}
            >
              <div className="label-container">
                <span className="label">{option}</span>
              </div>
            </div>
          ))}
        </div>
        <br />
        <br />
        <button className="spin-button" onClick={spin} disabled={isSpinning}>
          {isSpinning ? 'Spinning...' : 'Spin the Wheel'}
        </button>
      </div>

      {/* Popup Message */}
      {popupMessage && (
        <div className="popup-message">
          <p>{popupMessage}</p>
          {promoCode && (
            <button className="copy-button" onClick={copyPromoCode}>
              Copy Promo Code
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default SpinWheel;