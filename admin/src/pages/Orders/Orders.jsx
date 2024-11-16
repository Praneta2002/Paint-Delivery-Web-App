// // export default Orders;
// import React, { useState, useEffect } from 'react';
// import './Orders.css';
// import { toast } from "react-toastify";
// import axios from "axios";
// import { assets } from "../../assets/assets";

// const Orders = () => {
//   const [orders, setOrders] = useState([]);
//   const [sortedOrders, setSortedOrders] = useState([]); // Separate state for sorted orders
//   const [sortOption, setSortOption] = useState('date'); // Default sort by date
//   const [sortOrder, setSortOrder] = useState('asc'); // Ascending or Descending
//   const url = "http://localhost:5000";

//   const fetchAllOrders = async () => {
//     try {
//       const response = await axios.get(`${url}/api/order/list`);
//       if (response.data && response.data.success) {
//         const fetchedOrders = response.data.data;
//         if (Array.isArray(fetchedOrders)) {
//           setOrders(fetchedOrders); // Set orders without triggering sorting
//         } else {
//           toast.error("Unexpected data structure from server.");
//         }
//       } else {
//         toast.error("Error: " + (response.data.message || "Failed to fetch orders"));
//       }
//     } catch (error) {
//       toast.error("Error: " + error.message);
//     }
//   };

//   const statusHandler = async (event, orderID) => {
//     try {
//       const newStatus = event.target.value;
//       const response = await axios.post(`${url}/api/order/status`, {
//         orderId: orderID,
//         status: newStatus,
//       });

//       if (response.data && response.data.success) {
//         setOrders((prevOrders) =>
//           prevOrders.map((order) =>
//             order._id === orderID ? { ...order, status: newStatus } : order
//           )
//         );
//         toast.success("Order status updated successfully.");
//       } else {
//         toast.error("Error updating status: " + (response.data.message || "Failed to update status"));
//       }
//     } catch (error) {
//       toast.error("Error: " + error.message);
//     }
//   };

//   // Effect to handle sorting when sortOption or sortOrder changes
//   useEffect(() => {
//     const sorted = [...orders].sort((a, b) => {
//       if (sortOption === 'amount') {
//         return sortOrder === 'asc' ? a.amount - b.amount : b.amount - a.amount;
//       } else if (sortOption === 'items') {
//         return sortOrder === 'asc' ? a.items.length - b.items.length : b.items.length - a.items.length;
//       } else if (sortOption === 'status') {
//         return sortOrder === 'asc' ? a.status.localeCompare(b.status) : b.status.localeCompare(a.status);
//       } else {
//         return sortOrder === 'asc'
//           ? new Date(a.date) - new Date(b.date)
//           : new Date(b.date) - new Date(a.date);
//       }
//     });
//     setSortedOrders(sorted); // Set the sorted orders
//   }, [orders, sortOption, sortOrder]); // Trigger sorting when orders, sortOption, or sortOrder change

//   useEffect(() => {
//     fetchAllOrders(); // Fetch orders on component mount
//   }, []);

//   return (
//     <div className='order add'>
//       <h3>Order Page</h3>
//       <br />

//       {/* Sorting options */}
//       <div className="sort-options">
//         <label htmlFor="sort-by">Sort By: </label>
//         <select id="sort-by" value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
//           <option value="date">Date</option>
//           <option value="amount">Amount</option>
//           <option value="items">Items Count</option>
//           <option value="status">Status</option>
//         </select>

//         <label htmlFor="sort-order">              Order: </label>
//         <select id="sort-order" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
//           <option value="asc">Ascending</option>
//           <option value="desc">Descending</option>
//         </select>
//       </div>

//       <div className="order-list">
//         {Array.isArray(sortedOrders) && sortedOrders.length > 0 ? (
//           sortedOrders.map((order, index) => {
//             const address = order.addr || {};
//             return (
//               <div key={index} className='order-item'>
//                 <img src={assets.parcel_icon} alt="Parcel Icon" />
//                 <div>
//                   <p className='order-item-paint'>
//                     {order.items.map((item, itemIndex) => (
//                       `${item.name} x ${item.quantity}${itemIndex < order.items.length - 1 ? ', ' : ''}`
//                     ))}
//                   </p>
//                   <p className="order-item-name">
//                     {address.firstName ? `${address.firstName} ${address.lastName}` : "Name not available"}
//                   </p>
//                   <div className="order-item-address">
//                     <p>{address.street || "Street Not Available"}</p>
//                     <p>{address.city && address.state && address.country && address.zipcode ? 
//                         `${address.city}, ${address.state}, ${address.country}, ${address.zipcode}` : 
//                         "Address details not available"}</p>
//                   </div>
//                   <p className='order-item-phone'>
//                     {address.phone || "Phone number not available"}
//                   </p>
//                 </div>
//                 <p>Items: {order.items.length}</p>
//                 <p>${order.amount}</p>
//                 {/* <p className="order-date">Order Date: {formatDate(order.date)}</p> */}
//                 <select onChange={(event) => statusHandler(event, order._id)} value={order.status || "Order Placed"}>
//                   <option value="Order Placed">Order Placed</option>
//                   <option value="Painting Processing">Painting Processing</option>
//                   <option value="Out for delivery">Out for delivery</option>
//                   <option value="Delivered">Delivered</option>
//                 </select>
//               </div>
//             );
//           })
//         ) : (
//           <p>No orders available</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Orders;



// createdAt-> date change for sorting by date

import React, { useState, useEffect } from 'react';
import './Orders.css';
import { toast } from "react-toastify";
import axios from "axios";
import { assets } from "../../assets/assets";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [sortedOrders, setSortedOrders] = useState([]); // Separate state for sorted orders
  const [sortOption, setSortOption] = useState('date'); // Default sort by date
  const [sortOrder, setSortOrder] = useState('asc'); // Ascending or Descending
  const url = "http://localhost:5000";

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/list`);
      if (response.data && response.data.success) {
        const fetchedOrders = response.data.data;
        if (Array.isArray(fetchedOrders)) {
          setOrders(fetchedOrders); // Set orders without triggering sorting
        } else {
          toast.error("Unexpected data structure from server.");
        }
      } else {
        toast.error("Error: " + (response.data.message || "Failed to fetch orders"));
      }
    } catch (error) {
      toast.error("Error: " + error.message);
    }
  };

  const statusHandler = async (event, orderID) => {
    try {
      const newStatus = event.target.value;
      const response = await axios.post(`${url}/api/order/status`, {
        orderId: orderID,
        status: newStatus,
      });

      if (response.data && response.data.success) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderID ? { ...order, status: newStatus } : order
          )
        );
        toast.success("Order status updated successfully.");
      } else {
        toast.error("Error updating status: " + (response.data.message || "Failed to update status"));
      }
    } catch (error) {
      toast.error("Error: " + error.message);
    }
  };

  // Effect to handle sorting when sortOption or sortOrder changes
  useEffect(() => {
    const sorted = [...orders].sort((a, b) => {
      if (sortOption === 'amount') {
        return sortOrder === 'asc' ? a.amount - b.amount : b.amount - a.amount;
      } else if (sortOption === 'items') {
        return sortOrder === 'asc' ? a.items.length - b.items.length : b.items.length - a.items.length;
      } else if (sortOption === 'status') {
        return sortOrder === 'asc' ? a.status.localeCompare(b.status) : b.status.localeCompare(a.status);
      } else {
        return sortOrder === 'asc'
          ? new Date(a.date) - new Date(b.date)
          : new Date(b.date) - new Date(a.date);
      }
    });
    setSortedOrders(sorted); // Set the sorted orders
  }, [orders, sortOption, sortOrder]); // Trigger sorting when orders, sortOption, or sortOrder change

  useEffect(() => {
    fetchAllOrders(); // Fetch orders on component mount
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "Date not available";
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return isNaN(date) ? "Invalid Date" : date.toLocaleDateString(undefined, options);
  };

  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <br />

      

      {/* Sorting options */}
      <div className="sort-options">
        <label htmlFor="sort-by">Sort By: </label>
        <select id="sort-by" value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
          <option value="date">Date</option>
          <option value="amount">Amount</option>
          <option value="items">Items Count</option>
          <option value="status">Status</option>
        </select>

        <label htmlFor="sort-order">              Order: </label>
        <select id="sort-order" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      <div className="order-list">
        {Array.isArray(sortedOrders) && sortedOrders.length > 0 ? (
          sortedOrders.map((order, index) => {
            const address = order.addr || {};
            return (
              <div key={index} className='order-item'>
                <img src={assets.parcel_icon} alt="Parcel Icon" />
                <div>
                  <p className='order-item-paint'>
                    {order.items.map((item, itemIndex) => (
                      `${item.name} x ${item.quantity}${itemIndex < order.items.length - 1 ? ', ' : ''}`
                    ))}
                  </p>
                  <p className="order-item-name">
                    {address.firstName ? `${address.firstName} ${address.lastName}` : "Name not available"}
                  </p>
                  <div className="order-item-address">
                    <p>{address.street || "Street Not Available"}</p>
                    <p>{address.city && address.state && address.country && address.zipcode ? 
                        `${address.city}, ${address.state}, ${address.country}, ${address.zipcode}` : 
                        "Address details not available"}</p>
                  </div>
                  <p className='order-item-phone'>
                    {address.phone || "Phone number not available"}
                  </p>
                </div>
                <p>Items: {order.items.length}</p>
                <p>${order.amount}</p>
                <p className="order-date">Order Date: {formatDate(order.date)}</p>
                <select onChange={(event) => statusHandler(event, order._id)} value={order.status || "Order Placed"}>
                  <option value="Order Placed">Order Placed</option>
                  <option value="Painting Processing">Painting Processing</option>
                  <option value="Out for delivery">Out for delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            );
          })
        ) : (
          <p>No orders available</p>
        )}
      </div>
    </div>
  );
};

export default Orders;