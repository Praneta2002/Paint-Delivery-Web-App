import React, {  useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from "axios"
import { toast } from 'react-toastify'

const Add = ({url}) => {

    const [image,setImage] = useState(false);
    const [data,setData] = useState({
        name:"",
        description:"",
        price:"",
        category:"Acrylic",
        artist:""
    })

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data=>({...data,[name]:value}))
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("name",data.name);
        formData.append("description",data.description);
        formData.append("price",Number(data.price));
        formData.append("category",data.category);
        formData.append("artist",data.artist);
        formData.append("image",image);
        try{
            const response = await axios.post(`${url}/api/paint/add`,formData);
            if (response.data.success) {
                setData({
                    name:"",
                    description:"",
                    price:"",
                    category:"Acrylic"
                })
                setImage(false)
                toast.success(response.data.message)
            }
            else {
                toast.error(response.data.message)
            }
        }catch(error){
            toast.error("Something went wrong");
        }
       
    };

  return (
    <div className='add'>
      <form className='flex-col' onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
            <p>Upload Image</p>
            <label htmlFor="image">
                <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
            </label>
            <input onChange={(e)=>setImage(e.target.files[0])} type="file" id="image" hidden required />
        </div>
        <div className="add-product-name flex-col">
            <p>Product name</p>
            <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type here' />
        </div>
        <div className="add-product-description flex-col">
            <p>Product description</p>
            <textarea  onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder='Write content here' required></textarea>
        </div>
        <div className="add-category-price">
            <div className="add-category flex-col">
                <p>Product category</p>
                <select  onChange={onChangeHandler} name="category" >
                    <option value="Acrylic">Acrylic</option>
                    <option value="Contemporary">Contemporary</option>
                    <option value="Modern">Modern</option>
                    <option value="Paper">Paper</option>
                    <option value="Photography">Photography</option>
                    <option value="Pop">Pop</option>
                    <option value="Print">Print</option>
                    <option value="Sculpture">Sculpture</option>
                </select>
            </div>
            <div className="add-price flex-col">
                <p>Product price</p>
                <input  onChange={onChangeHandler} value={data.price} type="Number" name='price' placeholder='$20' />
            </div>
        </div>
        <div className='add-artist-name flex-col'>
            <p>Artist's Name</p>
            <input onChange={onChangeHandler} value={data.artist} type='text' name='artist' placeholder='Enter artist`s name' />
        </div>
        <button type='submit' className='add-btn'>ADD</button>
      </form>
    </div>
  )
}

export default Add
