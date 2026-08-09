import React, { useEffect } from 'react'
import { useState } from 'react'
import "./Product.css"
import hero from "../../assets/hero.png"
import { MdDeleteOutline } from "react-icons/md";

const Product = () => {
    useEffect(() => {
        getProductList();

    }, [])
    const [price, setPrice] = useState("");
    const [name, setName] = useState("");
    const [status, setStatus] = useState("");
    const [image, setImage] = useState("");
    const [preview_image, setPreviewImage] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [productList, setProductList] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const onChange = (e) => {

        const file = e.target.files[0];

        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImage(file);
            setPreviewImage(imageUrl);
        }
        //multiple files
        // const files = Array.from(e.target.files);
        // if (files) {
        //     const imgurl = files.map((file) => ({ file, preview: URL.createObjectURL(file) }))
        //     setImage(prev => [...prev, ...imgurl]);
        //     console.log(imgurl)
        // }

    }

    const removeItem = (indexToRemove) => {
        setImage(prev => prev.filter((_, index) => index !== indexToRemove));

    }
    const saveImages = async () => {
        setIsLoading(true)
        const formData = new FormData();
        formData.append("file", image)
        formData.append("name", name)
        formData.append("status", status)
        formData.append("new_price", price)
        formData.append("old_price", 100)
        const dataObj = { name, price, status, image }
        console.log(dataObj)
        const url = "http://localhost:3000/image/uploads"
        try {
            const response = await fetch(url, {
                method: "POST", body: formData,

            }
            )
            const data = await response.json();
            console.log(data);
            setShowModal(false)
            setIsLoading(false)
            getProductList()
        }
        catch (e) {
            setIsLoading(false)
            console.log(e)
        }

    }

    const getProductList = async () => {
        try {
            console.log("its working")
            const url = "http://localhost:3000/image/getProduct"
            const response = await fetch(url, { method: "GET" })
            const data = await response.json()
            console.log("Result", data)
            setProductList(data.response)
            if (!response.ok) {
                throw new Error(response.error)
            }

        }
        catch (e) {
            throw new Error(e)
        }

    }
    const removeProduct = async (id) => {
        try {
            const url = `http://localhost:3000/image/removeProduct/${id}`
            console.log(id)
            const response = await fetch(url, { method: "POST",})
            if (response.ok) {
                console.log("Successfully deleted")
                getProductList()
            }
        }
        catch (e) {
            throw new Error(e)
        }

    }
    return (
        <>
            <div className='add-product'>
                <div className='product-item-heading'>Product items</div>
                <button className='add-item-button' onClick={() => setShowModal(true)}> +Add</button>
            </div>
            <div className='product-table-items'>
                <table>
                    <thead>
                        <tr>
                            <th>Images</th>
                            <th>Item Name</th>
                            <th>New Price</th>
                            <th>Old Price</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productList.map((items, index) => (
                            <tr key={index}>
                                <td >{(<img src={items.image} alt='not preview' />)}</td>
                                <td >{items.name}</td>
                                <td >{items.new_price}</td>
                                <td >{items.old_price}</td>
                                <td >{items._id}</td>
                                <td><button className='delete-icon' onClick={() => { removeProduct(items._id) }}><MdDeleteOutline /></button> </td>

                            </tr>

                        ))}

                    </tbody>
                </table>
            </div>


            {showModal && (

                <div className="modal-overlay">
                    <div className="modal-box">

                        <h2>Add Product</h2>
                        <div className='input-row'>
                            <input type="text" name='product-name' value={name} onChange={(e) => { setName(e.target.value) }} placeholder="Product Name" />
                            <input type="number" name="price" onChange={(e) => { setPrice(e.target.value) }} placeholder="Price" />
                        </div>

                        <input className='check-status' name='status' onChange={(e) => { setStatus(e.target.value) }} type="text" placeholder="status" />

                        {!preview_image ? <div className='img-upload-container'>
                            <label htmlFor="img-upload" className='custome-file-upload'> file Upload</label>
                            <input id="img-upload" type="file" accept='image/*' onChange={onChange} />
                        </div> :

                            <div className='preview-img'>
                                <img src={preview_image} alt="Not Avalable" />
                            </div>}

                        <div className="modal-buttons">
                            <button onClick={() => setShowModal(false)}>
                                Cancel
                            </button>

                            <button onClick={() => { saveImages(); getProductList(); }}>
                                Save
                            </button>
                        </div>

                    </div>
                </div>
            )

            }
            {isLoading && (<div className='circular-progress'>
            </div>)}
        </>
    )
}

export default Product