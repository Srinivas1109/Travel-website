import React from 'react'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Userprofile(props) {
    document.title = props.title;
    let userDetails;
    const [details, setdetails] = useState(null)
    const [bookings, setBookings] = useState([])

    useEffect(() => {
        const getDetails = async () => {
            const response = await fetch("http://localhost:5000/api/auth/getdetails",
                {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': localStorage.getItem('authToken')
                    }
                }
            )
            const json = await response.json()
            setdetails(json)
        }

        getDetails()
        previousBookings()
        // eslint-disable-next-line
        loadDetails()
    }, [])

    const previousBookings = async () => {
        const response = await fetch("http://localhost:5000/api/details/fetchalldetails",
            {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('authToken')
                }
            }
        )
        const json = await response.json()
        setBookings(json)
    }

    let loadDetails = () => {
        userDetails = bookings.map((ele) => {
            return (
                <div>
                    <div id="TravelDetails" className="TravelBookingDetails">
                        <h3>Name: {ele.Name}</h3><br />
                        <h3>Mobile No.: {ele.MobileNo}</h3><br />
                        <h3>Email: {ele.Email}</h3><br />
                        <h3>Travel Date: {ele.Ondate}</h3><br />
                        <h3>From: {ele.From}</h3><br />
                        <h3>Booked To: {ele.Booked}</h3><br />
                        <h3>Booked On: {ele.date}</h3><br />
                        <h3>No. of Days: {ele.Days}</h3><br />
                        {/* <h3>userId: {ele._id}</h3><br/> */}
                    </div>
                </div>
            )
        })
    }
    
    // eslint-disable-next-line
    let editDetails = () => {
        console.log('In edit details...')
    }

    let deleteDetails = async () => {
        console.log(localStorage.getItem('Id'))
        const response = await fetch(`http://localhost:5000/api/details/deletedetails/${localStorage.getItem('Id')}`,
            {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('authToken')
                }
            }
        )
        const json = await response.json()
        console.log(json)
        previousBookings()
        loadDetails()
    }

    console.log("bookings")
    console.log(bookings)
    if (details) {
        let date = new Date(details.date)
        console.log(localStorage.getItem('authToken'))
        console.log(localStorage.getItem('Id'))
        return (
            <div>
                <div className="userprofile">
                    {loadDetails()}
                    <div className="primaryDetails">
                        <h1 className="TraveluserDetails">User Details</h1>
                        <div className="TraveluserDetails">Name: {details.Firstname + " " + details.Lastname}</div>
                        <div className="TraveluserDetails">Mobile No. : {details.MobileNo}</div>
                        <div className="TraveluserDetails">Email: {details.Email}</div>
                        <div className="TraveluserDetails">Account Created On: {date.getDate() + "/" + parseInt(date.getMonth()+1) + "/" + date.getUTCFullYear()}</div>
                    </div>
                    <div className="userTravelDetails">{userDetails}</div>
                <div id = "buttons">
                <Link to="/booking" className="" id="bookingLink">Book a Tour</Link><br />
                <button onClick={deleteDetails} className="" id="Travelcancel">Cancel Booking</button>
                </div>
                </div>
                
            </div>
        )
    }
    return (
        <div>

        </div>
    )
}

export default Userprofile
