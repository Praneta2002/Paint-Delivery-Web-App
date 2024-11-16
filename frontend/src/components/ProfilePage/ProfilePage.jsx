// // perfectly working except for rendering in navbar and feedback popup, so DO NOT DELETE
// import React, { useState, useEffect } from 'react';
// import './ProfilePage.css';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const ProfilePage = () => {
//     const [user, setUser] = useState({ name: '', email: '', profilePhoto: '' });
//     const [profilePhoto, setProfilePhoto] = useState(null);
//     const [editing, setEditing] = useState(false);
//     const [feedbacks, setFeedbacks] = useState({});
//     const [orderHistory, setOrderHistory] = useState([]);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const token = localStorage.getItem("token");
//                 if (!token) {
//                     console.error("No authentication token found.");
//                     navigate('/login');
//                     return;
//                 }

//                 // Fetch user profile
//                 const userResponse = await axios.get('http://localhost:5000/api/user/profile', {
//                     headers: { token }
//                 });
//                 setUser(userResponse.data);
//                 setProfilePhoto(userResponse.data.profilePhoto || '');

//                 // Fetch order history
//                 const orderResponse = await axios.post('http://localhost:5000/api/order/userorder', 
//                     { userId: userResponse.data._id }, 
//                     { headers: { token } }
//                 );
//                 setOrderHistory(orderResponse.data.data || []);
//                 setFeedbacks(
//                     orderResponse.data.data.reduce((acc, order) => {
//                         if (order.status === 'Delivered') acc[order._id] = ''; 
//                         return acc;
//                     }, {})
//                 );
                
//             } catch (error) {
//                 console.error("Error fetching profile or order history:", error);
//             }
//         };

//         fetchData();
//     }, [navigate]);

//     const handleEdit = () => {
//         setEditing(true);
//     };

//     const handleSave = async () => {
//         try {
//             const formData = new FormData();
//             formData.append('name', user.name);
//             formData.append('email', user.email);
//             formData.append('userId', user._id);
//             if (profilePhoto) {
//                 formData.append('profilePhoto', profilePhoto);
//             }

//             const token = localStorage.getItem("token");
//             const response = await axios.post('http://localhost:5000/api/user/updateProfile', formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                     token
//                 }
//             });

//             if (response.data.message === "Profile photo updated successfully") {
//                 setUser(response.data.user);
//                 setProfilePhoto(response.data.user.profilePhoto || '');
//                 setEditing(false);
//             } else {
//                 console.error("Update failed:", response.data.message);
//             }
//         } catch (error) {
//             console.error("Error updating profile:", error);
//         }
//     };

//     const handleFeedbackChange = (orderId, event) => {
//         setFeedbacks({
//             ...feedbacks,
//             [orderId]: event.target.value
//         });
//     };

//     const handleSubmitFeedback = async (orderId) => {
//         try {
//             const token = localStorage.getItem("token");
//             const response = await axios.post('http://localhost:5000/api/order/feedback', {
//                 userId: user._id,
//                 orderId,
//                 feedback: feedbacks[orderId]
//             }, { headers: { token } });

//             if (response.data.message === "Feedback submitted successfully") {
//                 setFeedbacks({
//                     ...feedbacks,
//                     [orderId]: '' // Clear feedback input after successful submission
//                 });
//             }
//         } catch (error) {
//             console.error("Error submitting feedback:", error);
//         }
//     };

//     return (
//         <div className="profile-page">
//             <h1>Profile Page</h1>
//             <img 
//                 src={user.profilePhoto ? `http://localhost:5000${user.profilePhoto}` : '/src/assets/frontend_assets/profile_icon.png'} 
//                 alt="Profile" 
//                 className="profile-image"
//             />
//             <div className="profile-info">
//                 <label htmlFor="name">Name</label>
//                 {editing ? (
//                     <input 
//                         type="text" 
//                         id="name"
//                         value={user.name} 
//                         onChange={(e) => setUser({ ...user, name: e.target.value })} 
//                         placeholder="Name" 
//                     />
//                 ) : (
//                     <p>{user.name}</p>
//                 )}

//                 <label htmlFor="email">Email</label>
//                 {editing ? (
//                     <input 
//                         type="email" 
//                         id="email"
//                         value={user.email} 
//                         onChange={(e) => setUser({ ...user, email: e.target.value })} 
//                         placeholder="Email" 
//                     />
//                 ) : (
//                     <p>{user.email}</p>
//                 )}
                
//                 {editing && (
//                     <>
//                         <label htmlFor="profilePhoto">Profile Photo</label>
//                         <input 
//                             type="file" 
//                             id="profilePhoto"
//                             onChange={(e) => setProfilePhoto(e.target.files[0])} 
//                         />
//                         <button onClick={handleSave}>Save</button>
//                         <button onClick={() => setEditing(false)}>Cancel</button>
//                     </>
//                 )}
//             </div>
//             {!editing && (
//                 <button onClick={handleEdit}>Edit Profile</button>
//             )}
//             <div className="order-history">
//                 <h2>Order History</h2>
//                 <table>
//                     <thead>
//                         <tr>
//                             <th>Order ID</th>
//                             <th>Status</th>
//                             <th>Feedback</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {orderHistory.map(order => (
//                             <tr key={order._id}>
//                                 <td>{order._id}</td>
//                                 <td>{order.status}</td>
//                                 <td>
//                                     {order.status === 'Delivered' ? (
//                                         <>
//                                             <textarea 
//                                                 value={feedbacks[order._id] || ''} 
//                                                 onChange={(e) => handleFeedbackChange(order._id, e)} 
//                                                 placeholder="Leave feedback"
//                                             />
//                                             <button onClick={() => handleSubmitFeedback(order._id)}>Submit Feedback</button>
//                                         </>
//                                     ) : (
//                                         '—' // Placeholder for non-delivered orders
//                                     )}
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default ProfilePage;












// FOR FEEDBACK POPUP MATCHING WITH OTHER PAGES
import React, { useState, useEffect } from 'react';
import './ProfilePage.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProfilePage = () => {
    const [user, setUser] = useState({ name: '', email: '', profilePhoto: '' });
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [editing, setEditing] = useState(false);
    const [feedback, setFeedback] = useState("");
    const [rating, setRating] = useState(0);
    const [orderHistory, setOrderHistory] = useState([]);
    const [feedbackMessage, setFeedbackMessage] = useState("");
    const [popupVisible, setPopupVisible] = useState(false);  // For showing the popup
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    console.error("No authentication token found.");
                    navigate('/login');
                    return;
                }

                const userResponse = await axios.get('http://localhost:5000/api/user/profile', {
                    headers: { token }
                });
                setUser(userResponse.data);
                setProfilePhoto(userResponse.data.profilePhoto || '');

                const orderResponse = await axios.post('http://localhost:5000/api/order/userorder', 
                    { userId: userResponse.data._id }, 
                    { headers: { token } }
                );
                setOrderHistory(orderResponse.data.data || []); 

            } catch (error) {
                console.error("Error fetching profile or order history:", error);
            }
        };

        fetchData();
    }, [navigate]);

        const handleSave = async () => {
        try {
            const formData = new FormData();
            formData.append('name', user.name);
            formData.append('email', user.email);
            formData.append('userId', user._id);
            if (profilePhoto) {
                formData.append('profilePhoto', profilePhoto);
            }

            const token = localStorage.getItem("token");
            const response = await axios.post('http://localhost:5000/api/user/updateProfile', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    token
                }
            });

            if (response.data.message === "Profile photo updated successfully") {
                setUser(response.data.user);
                setProfilePhoto(response.data.user.profilePhoto || '');
                setEditing(false);
            } else {
                console.error("Update failed:", response.data.message);
            }
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    const handleSubmitFeedback = async (event) => {
        event.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const response = await axios.post('http://localhost:5000/api/order/feedback', {
                userId: user._id,
                feedback,
                rating
            }, { headers: { token } });

            if (response.data.message === "Feedback submitted successfully") {
                setFeedbackMessage("Feedback submitted successfully!");
                setPopupVisible(true);  // Show popup when feedback is submitted successfully
                setFeedback("");
                setRating(0);
            } else {
                setFeedbackMessage("Failed to submit feedback. Please try again.");
                setPopupVisible(true);  // Show popup for failure
            }
        } catch (error) {
            setFeedbackMessage("Error submitting feedback. Please try again.");
            setPopupVisible(true);  // Show popup for error
        }

        // Hide the popup message after 3 seconds
        setTimeout(() => {
            setPopupVisible(false);
        }, 3000);
    };

    return (
        <div className="profile-page">
            <h1>Profile Page</h1>
            <img 
                src={user.profilePhoto ? `http://localhost:5000${user.profilePhoto}` : '/src/assets/frontend_assets/profile_icon.png'} 
                alt="Profile" 
                className="profile-image"
            />
            <div className="profile-info">
                <label htmlFor="name">Name</label>
                {editing ? (
                    <input 
                        type="text" 
                        id="name"
                        value={user.name} 
                        onChange={(e) => setUser({ ...user, name: e.target.value })} 
                        placeholder="Name" 
                    />
                ) : (
                    <p>{user.name}</p>
                )}

                <label htmlFor="email">Email</label>
                {editing ? (
                    <input 
                        type="email" 
                        id="email"
                        value={user.email} 
                        onChange={(e) => setUser({ ...user, email: e.target.value })} 
                        placeholder="Email" 
                    />
                ) : (
                    <p>{user.email}</p>
                )}
                
                {editing && (
                    <>
                        <label htmlFor="profilePhoto">Profile Photo</label>
                        <input 
                            type="file" 
                            id="profilePhoto"
                            onChange={(e) => setProfilePhoto(e.target.files[0])} 
                        />
                        <button onClick={handleSave}>Save</button>
                        <button onClick={() => setEditing(false)}>Cancel</button>
                    </>
                )}
            </div>
            {!editing && (
                <button onClick={() => setEditing(true)}>Edit Profile</button>
            )}

            <div className="order-history">
                <h2>Order History</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Status</th>
                            <th>Feedback</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderHistory.map(order => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.status}</td>
                                <td>
                                    {order.status === 'Delivered' ? (
                                        <form onSubmit={handleSubmitFeedback}>
                                            <textarea 
                                                value={feedback} 
                                                onChange={(e) => setFeedback(e.target.value)} 
                                                placeholder="Your feedback"
                                            />
                                            <input 
                                                type="number" 
                                                min="1" 
                                                max="5" 
                                                value={rating} 
                                                onChange={(e) => setRating(Number(e.target.value))} 
                                                placeholder="Rating (1-5)" 
                                            />
                                            <button type="submit">Submit Feedback</button>
                                        </form>
                                    ) : (
                                        'No feedback available'
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Popup Message */}
            {popupVisible && (
                <div className="popup-message">
                    <p>{feedbackMessage}</p>
                </div>
            )}
        </div>
    );
};

export default ProfilePage;

















//2ND TRY
 // // rendering profile photo
// // import React, { useState, useEffect } from 'react';
// // import './ProfilePage.css';
// // import { useNavigate } from 'react-router-dom';
// // import axios from 'axios';

// // const ProfilePage = () => {
// //     const [user, setUser] = useState({ name: '', email: '', profilePhoto: '' });
// //     const [profilePhoto, setProfilePhoto] = useState(null);
// //     const [editing, setEditing] = useState(false);
// //     const [feedbacks, setFeedbacks] = useState({});
// //     const [orderHistory, setOrderHistory] = useState([]);
// //     const navigate = useNavigate();

// //     useEffect(() => {
// //         const fetchData = async () => {
// //             try {
// //                 const token = localStorage.getItem("token");
// //                 if (!token) {
// //                     console.error("No authentication token found.");
// //                     navigate('/login');
// //                     return;
// //                 }

// //                 const userId = user && user._id;

// //                 // Fetch user profile
// //                 const userResponse = await axios.post('http://localhost:5000/api/user/profile',{userId}, {
// //                     headers: { token }
// //                 });
// //                 setUser(userResponse.data);
// //                 setProfilePhoto(userResponse.data.profilePhoto || '');

// //                 // Fetch order history
// //                 const orderResponse = await axios.post('http://localhost:5000/api/order/userorder', 
// //                     { userId: userResponse.data._id }, 
// //                     { headers: { token } }
// //                 );
// //                 console.log('Order History', orderResponse.data.data);
// //                 setOrderHistory(orderResponse.data.data || []);
// //                 const feedbackInit= orderResponse.data.data.reduce((acc, order) => {
// //                         if (order.status === 'Delivered') acc[order._id] = ''; 
// //                         return acc;
// //                     }, {});

// //                 console.log('Initialized feedback',feedbackInit);
// //                 setFeedbacks(feedbackInit);

// //             } catch (error) {
// //                 if(error.response && error.response.data.message === "jwt expired"){
// //                     alert("Session expired. please login again");
// //                     localStorage.removeItem("token");
// //                     navigate('/login');
// //                 }else{
// //                     console.error("Error fetching details",error);
// //                 }
// //                 console.error("Error fetching profile or order history:", error);
// //             }
// //         };

// //         fetchData();
// //     }, [navigate]);

// //     const handleEdit = () => {
// //         setEditing(true);
// //     };

// //     const handleSave = async () => {
// //         try {
// //             const formData = new FormData();
// //             formData.append('name', user.name);
// //             formData.append('email', user.email);
// //             formData.append('userId', user._id);
// //             if (profilePhoto) {
// //                 formData.append('profilePhoto', profilePhoto);
// //             }

// //             const token = localStorage.getItem("token");
// //             const response = await axios.post('http://localhost:5000/api/user/updateProfile', formData, {
// //                 headers: {
// //                     'Content-Type': 'multipart/form-data',
// //                     token
// //                 }
// //             });

// //             if (response.data.message === "Profile photo updated successfully") {
// //                 setUser(response.data.user);
// //                 setProfilePhoto(null); // Clear the file input
// //                 setEditing(false);
// //                 alert("Profile photo updated successfully!"); // Show success message
// //             } else {
// //                 console.error("Update failed:", response.data.message);
// //                 alert("Failed to update profile photo."); // Show failure message
// //             }
// //         } catch (error) {
// //             console.error("Error updating profile:", error);
// //             alert("Error updating profile. Please try again."); // Show error message
// //         }
// //     };

// //     const handleFeedbackChange = (orderId, event) => {
// //         setFeedbacks({
// //             ...feedbacks,
// //             [orderId]: event.target.value
// //         });
// //     };

// //     const handleSubmitFeedback = async (orderId) => {
// //         try {
// //             const token = localStorage.getItem("token");
// //             const response = await axios.post('http://localhost:5000/api/order/feedback', {
// //                 userId: user._id,
// //                 orderId,
// //                 feedback: feedbacks[orderId]
// //             }, { headers: { token } });

// //             if (response.data.message === "Feedback submitted successfully") {
// //                 setFeedbacks({
// //                     ...feedbacks,
// //                     [orderId]: '' // Clear feedback input after successful submission
// //                 });
// //                 alert("Feedback submitted successfully!"); // Show success message
// //             } else {
// //                 alert("Failed to submit feedback."); // Show failure message
// //             }
// //         } catch (error) {
// //             console.error("Error submitting feedback:", error);
// //             alert("Error submitting feedback. Please try again."); // Show error message
// //         }
// //     };

// //     return (
// //         <div className="profile-page">
// //             <h1>Profile Page</h1>
// //             <img 
// //                 src={user.profilePhoto ? `http://localhost:5000${user.profilePhoto}` : '/src/assets/frontend_assets/profile_icon.png'} 
// //                 alt="Profile" 
// //                 className="profile-image"
// //             />
// //             <div className="profile-info">
// //                 <label htmlFor="name">Name</label>
// //                 {editing ? (
// //                     <input 
// //                         type="text" 
// //                         id="name"
// //                         value={user.name} 
// //                         onChange={(e) => setUser({ ...user, name: e.target.value })} 
// //                         placeholder="Name" 
// //                     />
// //                 ) : (
// //                     <p>{user.name}</p>
// //                 )}

// //                 <label htmlFor="email">Email</label>
// //                 {editing ? (
// //                     <input 
// //                         type="email" 
// //                         id="email"
// //                         value={user.email} 
// //                         onChange={(e) => setUser({ ...user, email: e.target.value })} 
// //                         placeholder="Email" 
// //                     />
// //                 ) : (
// //                     <p>{user.email}</p>
// //                 )}
                
// //                 {editing && (
// //                     <>
// //                         <label htmlFor="profilePhoto">Profile Photo</label>
// //                         <input 
// //                             type="file" 
// //                             id="profilePhoto"
// //                             onChange={(e) => setProfilePhoto(e.target.files[0])} 
// //                         />
// //                         <button onClick={handleSave}>Save</button>
// //                         <button onClick={() => setEditing(false)}>Cancel</button>
// //                     </>
// //                 )}
// //             </div>
// //             {!editing && (
// //                 <button onClick={handleEdit}>Edit Profile</button>
// //             )}
// //             <div className="order-history">
// //                 <h2>Order History</h2>
// //                 <table>
// //                     <thead>
// //                         <tr>
// //                             <th>Order ID</th>
// //                             <th>Status</th>
// //                             <th>Feedback</th>
// //                         </tr>
// //                     </thead>
// //                     <tbody>
// //                         {orderHistory.map(order => (
// //                             <tr key={order._id}>
// //                                 <td>{order._id}</td>
// //                                 <td>{order.status}</td>
// //                                 <td>
// //                                     {order.status === 'Delivered' ? (
// //                                         <>
// //                                             <textarea 
// //                                                 value={feedbacks[order._id] || ''} 
// //                                                 onChange={(e) => handleFeedbackChange(order._id, e)} 
// //                                                 placeholder="Leave feedback"
// //                                             />
// //                                             <button onClick={() => handleSubmitFeedback(order._id)}>Submit Feedback</button>
// //                                         </>
// //                                     ) : (
// //                                         '—' // Placeholder for non-delivered orders
// //                                     )}
// //                                 </td>
// //                             </tr>
// //                         ))}
// //                     </tbody>
// //                 </table>
// //             </div>
// //         </div>
// //     );
// // };

// // export default ProfilePage;





// // // with popup of feedback
// // import React, { useState, useEffect } from 'react';
// // import './ProfilePage.css';
// // import { useNavigate } from 'react-router-dom';
// // import axios from 'axios';

// // const ProfilePage = () => {
// //     const [user, setUser] = useState({ name: '', email: '', profilePhoto: '' });
// //     const [profilePhoto, setProfilePhoto] = useState(null);
// //     const [editing, setEditing] = useState(false);
// //     const [feedback, setFeedback] = useState("");
// //     const [rating, setRating] = useState(0);
// //     const [orderHistory, setOrderHistory] = useState([]);
// //     const [feedbackMessage, setFeedbackMessage] = useState(""); // New state for feedback message
// //     const navigate = useNavigate();

// //     useEffect(() => {
// //         const fetchData = async () => {
// //             try {
// //                 const token = localStorage.getItem("token");
// //                 if (!token) {
// //                     console.error("No authentication token found.");
// //                     navigate('/login');
// //                     return;
// //                 }

// //                 // Fetch user profile
// //                 const userResponse = await axios.get('http://localhost:5000/api/user/profile', {
// //                     headers: { token }
// //                 });
// //                 setUser(userResponse.data);
// //                 setProfilePhoto(userResponse.data.profilePhoto || '');

// //                 // Fetch order history
// //                 const orderResponse = await axios.post('http://localhost:5000/api/order/userorder', 
// //                     { userId: userResponse.data._id }, 
// //                     { headers: { token } }
// //                 );
// //                 setOrderHistory(orderResponse.data.data || []); 

// //             } catch (error) {
// //                 console.error("Error fetching profile or order history:", error);
// //             }
// //         };

// //         fetchData();
// //     }, [navigate]);

// //     const handleEdit = () => {
// //         setEditing(true);
// //     };

// //     const handleSave = async () => {
// //         try {
// //             const formData = new FormData();
// //             formData.append('name', user.name);
// //             formData.append('email', user.email);
// //             formData.append('userId', user._id);
// //             if (profilePhoto) {
// //                 formData.append('profilePhoto', profilePhoto);
// //             }

// //             const token = localStorage.getItem("token");
// //             const response = await axios.post('http://localhost:5000/api/user/updateProfile', formData, {
// //                 headers: {
// //                     'Content-Type': 'multipart/form-data',
// //                     token
// //                 }
// //             });

// //             if (response.data.message === "Profile photo updated successfully") {
// //                 setUser(response.data.user);
// //                 setProfilePhoto(response.data.user.profilePhoto || '');
// //                 setEditing(false);
// //             } else {
// //                 console.error("Update failed:", response.data.message);
// //             }
// //         } catch (error) {
// //             console.error("Error updating profile:", error);
// //         }
// //     };

// //     const handleFeedbackChange = (event) => {
// //         setFeedback(event.target.value);
// //     };

// //     const handleRatingChange = (event) => {
// //         setRating(Number(event.target.value));
// //     };

// //     const handleSubmitFeedback = async (event) => {
// //         event.preventDefault();
// //         try {
// //             const token = localStorage.getItem("token");
// //             const response = await axios.post('http://localhost:5000/api/order/feedback', {
// //                 userId: user._id,
// //                 feedback,
// //                 rating
// //             }, { headers: { token } });

// //             if (response.data.message === "Feedback submitted successfully") {
// //                 setFeedbackMessage("Feedback submitted successfully!");
// //                 setFeedback("");
// //                 setRating(0);
// //             } else {
// //                 setFeedbackMessage("Failed to submit feedback. Please try again.");
// //             }
// //         } catch (error) {
// //             setFeedbackMessage("Error submitting feedback. Please try again.");
// //             console.error("Error submitting feedback:", error);
// //         }

// //         // Hide the message after 3 seconds
// //         setTimeout(() => {
// //             setFeedbackMessage("");
// //         }, 3000);
// //     };

// //     return (
// //         <div className="profile-page">
// //             <h1>Profile Page</h1>
// //             <img 
// //                 src={user.profilePhoto ? `http://localhost:5000${user.profilePhoto}` : '/src/assets/frontend_assets/profile_icon.png'} 
// //                 alt="Profile" 
// //                 className="profile-image"
// //             />
// //             <div className="profile-info">
// //                 <label htmlFor="name">Name</label>
// //                 {editing ? (
// //                     <input 
// //                         type="text" 
// //                         id="name"
// //                         value={user.name} 
// //                         onChange={(e) => setUser({ ...user, name: e.target.value })} 
// //                         placeholder="Name" 
// //                     />
// //                 ) : (
// //                     <p>{user.name}</p>
// //                 )}

// //                 <label htmlFor="email">Email</label>
// //                 {editing ? (
// //                     <input 
// //                         type="email" 
// //                         id="email"
// //                         value={user.email} 
// //                         onChange={(e) => setUser({ ...user, email: e.target.value })} 
// //                         placeholder="Email" 
// //                     />
// //                 ) : (
// //                     <p>{user.email}</p>
// //                 )}
                
// //                 {editing && (
// //                     <>
// //                         <label htmlFor="profilePhoto">Profile Photo</label>
// //                         <input 
// //                             type="file" 
// //                             id="profilePhoto"
// //                             onChange={(e) => setProfilePhoto(e.target.files[0])} 
// //                         />
// //                         <button onClick={handleSave}>Save</button>
// //                         <button onClick={() => setEditing(false)}>Cancel</button>
// //                     </>
// //                 )}
// //             </div>
// //             {!editing && (
// //                 <button onClick={handleEdit}>Edit Profile</button>
// //             )}
// //             <div className="order-history">
// //                 <h2>Order History</h2>
// //                 <table>
// //                     <thead>
// //                         <tr>
// //                             <th>Order ID</th>
// //                             <th>Status</th>
// //                             <th>Feedback</th>
// //                         </tr>
// //                     </thead>
// //                     <tbody>
// //                         {orderHistory.map(order => (
// //                             <tr key={order._id}>
// //                                 <td>{order._id}</td>
// //                                 <td>{order.status}</td>
// //                                 <td>
// //                                     {order.status === 'Delivered' ? (
// //                                         <form onSubmit={(e) => handleSubmitFeedback(e, order._id)}>
// //                                             <textarea 
// //                                                 value={feedback} 
// //                                                 onChange={handleFeedbackChange} 
// //                                                 placeholder="Your feedback"
// //                                             />
// //                                             <input 
// //                                                 type="number" 
// //                                                 min="1" 
// //                                                 max="5" 
// //                                                 value={rating} 
// //                                                 onChange={handleRatingChange} 
// //                                                 placeholder="Rating (1-5)" 
// //                                             />
// //                                             <button type="submit">Submit Feedback</button>
// //                                         </form>
// //                                     ) : (
// //                                         'No feedback available'
// //                                     )}
// //                                 </td>
// //                             </tr>
// //                         ))}
// //                     </tbody>
// //                 </table>
// //             </div>
// //             <div className="feedback-form">
// //                 <h2>Feedback Message</h2>
// //                 {feedbackMessage && <div className="feedback-message">{feedbackMessage}</div>}
// //             </div>
// //         </div>
// //     );
// // };

// // export default ProfilePage;
