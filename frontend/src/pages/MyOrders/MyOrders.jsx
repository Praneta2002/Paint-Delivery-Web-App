// // export default MyOrders
// import React, { useContext, useEffect, useState } from 'react';
// import './MyOrders.css';
// import { StoreContext } from '../../context/StoreContext';
// import axios from 'axios';
// import { assets } from '../../../../admin/src/assets/assets';

// const MyOrders = () => {
//   const { url, token } = useContext(StoreContext);
//   const [data, setData] = useState([]);
//   const [sortedData, setSortedData] = useState([]);
//   const [sortOption, setSortOption] = useState('date'); // Default sort option
//   const [sortOrder, setSortOrder] = useState('asc'); // Ascending or descending

//   const fetchOrders = async () => {
//     const response = await axios.post(url + '/api/order/userorder', {}, { headers: { token } });
//     setData(response.data.data);
//   };

//   useEffect(() => {
//     if (token) {
//       fetchOrders();
//     }
//   }, [token]);

//   // Sorting function
//   useEffect(() => {
//     const sortOrders = () => {
//       let sortedArray = [...data];
//       if (sortOption === 'amount') {
//         sortedArray.sort((a, b) => sortOrder === 'asc' ? a.amount - b.amount : b.amount - a.amount);
//       } else if (sortOption === 'status') {
//         sortedArray.sort((a, b) => sortOrder === 'asc' ? a.status.localeCompare(b.status) : b.status.localeCompare(a.status));
//       } else {
//         sortedArray.sort((a, b) => sortOrder === 'asc' ? new Date(a.createdAt) - new Date(b.createdAt) : new Date(b.createdAt) - new Date(a.createdAt));
//       }
//       setSortedData(sortedArray);
//     };

//     sortOrders();
//   }, [sortOption, sortOrder, data]);

//   return (
//     <div className='my-orders'>
//       <h2>My Orders</h2>
//       <br />

//       {/* Sorting options */}
//       <div className="sort-options">
//         <label htmlFor="sort-by">Sort By: </label>
//         <select id="sort-by" value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
//           <option value="date">Date</option>
//           <option value="amount">Amount</option>
//           <option value="status">Status</option>
//         </select>
//         <label htmlFor="sort-order">              Order: </label>
//         <select id="sort-order" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
//           <option value="asc">Ascending</option>
//           <option value="desc">Descending</option>
//         </select>
//       </div>

//       <div className="container">
//         {sortedData.map((order, index) => (
//           <div key={index} className='my-orders-order'>
//             <img src={assets.parcel_icon} alt="Parcel Icon" />
//             <p className="order-items">
//               {order.items.map((item, idx) => (
//                 <span key={idx}>{item.name} x {item.quantity}{idx !== order.items.length - 1 ? ', ' : ''}</span>
//               ))}
//             </p>
//             <p className="order-amount">${order.amount}.00</p>
//             <p className="order-total-items">Items: {order.items.length}</p>
//             <p className="order-status">
//               <span>&#x25cf;</span> <b>{order.status}</b>
//             </p>
//             <button onClick={fetchOrders}>Track Order</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default MyOrders;


// createdAt-> date for date sorting
import React, { useContext, useEffect, useState } from 'react';
import './MyOrders.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { assets } from '../../../../admin/src/assets/assets';

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const [sortOption, setSortOption] = useState('date'); // Default sort option
  const [sortOrder, setSortOrder] = useState('asc'); // Ascending or descending

  const fetchOrders = async () => {
    const response = await axios.post(url + '/api/order/userorder', {}, { headers: { token } });
    setData(response.data.data);
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  // Function to format the date
  const formatDate = (dateString) => {
    if (!dateString) return "Date not available";
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return isNaN(date) ? "Invalid Date" : date.toLocaleDateString(undefined, options);
  };

  // Sorting function
  useEffect(() => {
    const sortOrders = () => {
      let sortedArray = [...data];
      if (sortOption === 'amount') {
        sortedArray.sort((a, b) => sortOrder === 'asc' ? a.amount - b.amount : b.amount - a.amount);
      } else if (sortOption === 'status') {
        sortedArray.sort((a, b) => sortOrder === 'asc' ? a.status.localeCompare(b.status) : b.status.localeCompare(a.status));
      } else {
        sortedArray.sort((a, b) => sortOrder === 'asc' ? new Date(a.date) - new Date(b.date) : new Date(b.date) - new Date(a.date));
      }
      setSortedData(sortedArray);
    };

    sortOrders();
  }, [sortOption, sortOrder, data]);

  return (
    <div className='my-orders'>
      <h2>My Orders</h2>
      <br />

      {/* Sorting options */}
      <div className="sort-options">
        <label htmlFor="sort-by">Sort By: </label>
        <select id="sort-by" value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
          <option value="date">Date</option>
          <option value="amount">Amount</option>
          <option value="status">Status</option>
        </select>
        <label htmlFor="sort-order">Order: </label>
        <select id="sort-order" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      <div className="container">
        {sortedData.map((order, index) => (
          <div key={index} className='my-orders-order'>
            <img src={assets.parcel_icon} alt="Parcel Icon" />
            <p className="order-items">
              {order.items.map((item, idx) => (
                <span key={idx}>{item.name} x {item.quantity}{idx !== order.items.length - 1 ? ', ' : ''}</span>
              ))}
            </p>
            <p className="order-amount">${order.amount}.00</p>
            <p className="order-date">Order Date: {formatDate(order.date)}</p>
            <p className="order-total-items">Items: {order.items.length}</p>
            <p className="order-status">
              <span>&#x25cf;</span> <b>{order.status}</b>
            </p>
            <button onClick={fetchOrders}>Track Order</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyOrders;