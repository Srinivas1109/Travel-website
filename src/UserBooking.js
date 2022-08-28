import { useState } from "react"
import React from 'react'
import { useHistory } from 'react-router';

function UserBooking(props) {
    let history = useHistory()
    const [name, setname] = useState('')
    const [email, setemail] = useState('')
    const [days, setdays] = useState('')
    const [from, setfrom] = useState('')
    const [to, setto] = useState('')
    const [date, setdate] = useState('')
    const [mobile, setmobile] = useState('')
    let places = ["TajMahal", "Italy", "Kerala", "Malaysia", "Maldives", "Munnar", "NewYork", "Srinagar", "Thailand", "UAE", "WestBengal"];
    let allPlaces = null

    let handleName = (e) => {
        setname(e.target.value)
    }
    let handleDays = (e) => {
        setdays(e.target.value)
    }
    let handleFrom = (e) => {
        setfrom(e.target.value)
    }
    let handleTo = (e) => {
        setto(e.target.value)
    }
    let handleEmail = (e) => {
        setemail(e.target.value)
    }
    let handleDate = (e) => {
        console.log(e.target.value)
        setdate(e.target.value)
    }
    let handleMobile = (e) => {
        setmobile(e.target.value)
    }

    document.title = props.title;
    let addDetails = async () => {
        console.log('In add details...')
        const response = await fetch("http://localhost:5000/api/details/uploaddetails",
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('authToken')
                },
                body: JSON.stringify({
                    "name": name,
                    "from": from,
                    "toplace": to,
                    "email": email,
                    "mobile": mobile,
                    "days": days,
                    "traveldate": date
                })
            }
        )
        const json = await response.json()
        localStorage.setItem("Id", json.savedBooking._id)

    }

    let handleSubmit = (e) => {
        e.preventDefault()
        addDetails()
        history.push('/userprofile')
    }

    let travelPlaces = ()=>{
        allPlaces = places.map((place) => {
            return (
                <option value={place}>{place}</option>
            )
        })
    }
    travelPlaces()
    return (
        <div id="bookingPage">
            <form onSubmit={handleSubmit}>
                <div id = "bookingPageDetails">
                    Please Fill the Below Details
                </div>
                <div className="bookingsItems">
                    <input type="text" placeholder="Name" value={name} onChange={handleName} /><br />
                </div>
                <div className="bookingsItems">
                    <input type="text" placeholder="Email" value={email} onChange={handleEmail} /><br />
                </div>
                <div className="bookingsItems">
                    <input type="text" placeholder="Mobile No." value={mobile} onChange={handleMobile} /><br />
                </div>
                <div className="bookingsItems">
                    <input type="text" placeholder="From" value={from} onChange={handleFrom} /><br />
                </div>
                <div className="bookingsItems" onChange={handleTo}>
                    <select>
                        <option>To Where</option>
                        {allPlaces}
                    </select>
                </div>
                <div className="bookingsItems">
                    <input type="text" placeholder="Number of Days" value={days} onChange={handleDays} /><br />
                </div>
                <div className="bookingsItems">
                    <input type="date" placeholder="Date" value={date} onChange={handleDate} /><br />
                </div>
                <div>
                    <button className="links" id="Travelsubmit">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default UserBooking
