// import React, { useEffect, useState } from 'react'
// import './List.css'
// import axios from "axios"
// import {toast} from "react-toastify"

// const List = ({url}) => {
    
//     const [list,setList] = useState([]);

//     const fetchList = async () => {
//         const response = await axios.get(`${url}/api/paint/list`);
//         if (response.data.success) {
//             setList(response.data.data)
//         }
//         else
//         {
//             toast.error("Error")
//         }
//     }

//     const removePaint = async(paintId) => {
//        const response = await axios.post(`${url}/api/paint/remove`,{id:paintId});
//        await fetchList();
//        if (response.data.success) {
//         toast.success(response.data.message)
//        }
//        else{
//         toast.error("Error");
//        }
//      }

//     useEffect(()=>{
//         fetchList();
//     },[])
//   return (
//     <div className='list add flex-col'>
//       <p>All Painting List</p>
//       <div className="list-table">
//         <div className="list-table-format title">
//             <b>Image</b>
//             <b>Name</b>
//             <b>Category</b>
//             <b>Price</b>
//             <b>Artist</b>
//             <b>Action</b>
//         </div>
//         {list.map((item,index)=>{
//             return (
//                 <div key={index} className='list-table-format'>
//                     <img src={`${url}/images/${item.image}`} alt="item.name" />
//                     <p>{item.name}</p>
//                     <p>{item.category}</p>
//                     <p>${item.price}</p>
//                     <p>{item.artist}</p>
//                     <p onClick={()=>removePaint(item._id)} className='cursor'>X</p>
//                 </div>
//             )
//         })}
//       </div>
//     </div>
//   )
// }

// export default List
import React, { useEffect, useState } from 'react';
import './List.css';
import axios from "axios";
import { toast } from "react-toastify";

const List = ({ url }) => {
  const [list, setList] = useState([]);
  const [sortOption, setSortOption] = useState('name'); // Default sort by name
  const [sortOrder, setSortOrder] = useState('asc'); // Ascending by default

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/paint/list`);
    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error("Error");
    }
  };

  const removePaint = async (paintId) => {
    const response = await axios.post(`${url}/api/paint/remove`, { id: paintId });
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error("Error");
    }
  };

  const handleSort = () => {
    const sorted = [...list].sort((a, b) => {
      if (sortOption === 'price') {
        return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
      } else if (sortOption === 'name') {
        return sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      } else if (sortOption === 'category') {
        return sortOrder === 'asc' ? a.category.localeCompare(b.category) : b.category.localeCompare(a.category);
      } else if (sortOption === 'artist') {
        return sortOrder === 'asc' ? a.artist.localeCompare(b.artist) : b.artist.localeCompare(a.artist);
      }
      return 0;
    });
    setList(sorted);
  };

  useEffect(() => {
    fetchList();
  }, []);

  useEffect(() => {
    handleSort(); // Sort whenever sortOption or sortOrder changes
  }, [sortOption, sortOrder]);

  return (
    <div className='list add flex-col'>
      <p>All Painting List</p>

      {/* Sorting options */}
      <div className="sort-options">
        <label htmlFor="sort-by">Sort By: </label>
        <select id="sort-by" value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
          <option value="name">Name</option>
          <option value="price">Price</option>
          <option value="category">Category</option>
          <option value="artist">Artist</option>
        </select>

        <label htmlFor="sort-order">              Order: </label>
        <select id="sort-order" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Artist</b>
          <b>Action</b>
        </div>

        {list.map((item, index) => {
          return (
            <div key={index} className='list-table-format'>
              <img src={`${url}/images/${item.image}`} alt={item.name} />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p>{item.artist}</p>
              <p onClick={() => removePaint(item._id)} className='cursor'>X</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;
