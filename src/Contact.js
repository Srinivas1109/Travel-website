import Facebook from './Images/SocialMedia/Facebook.png';
import Twitter from './Images/SocialMedia/Twitter.png';
import Instagram from './Images/SocialMedia/Instagram.png';
import { useHistory } from 'react-router';
import { useState } from 'react';

export default function Contact(props) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [mobile, setMobile] = useState('')
    const [message, setMessage] = useState('')
    document.title = props.title;
    let history = useHistory()

    let handleName = (e) => {
        setName(e.target.value)
    }
    let handleEmail = (e) => {
        setEmail(e.target.value)
    }
    let handleMobile = (e) => {
        setMobile(e.target.value)
    }
    let handleMessage = (e) => {
        setMessage(e.target.value)
    }

    let handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch("http://localhost:5000/api/auth/feedback",
            {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    mobile: mobile,
                    message: message
                })
            }
        )
        history.push('/')
        const json = await response.json()
        console.log(json)
    }


    return (
        <>
            <form onSubmit={handleSubmit}>
                <div id="Contact">
                    <div id="contact-heading">
                        Contact Us
                    </div>
                    <div id="feedback">
                        <h3>Feel free to contact us through telephone or email we will be sure to get back to you as soon as possible </h3><br />
                        <h4 id="dropfeed">Drop in your feedback below</h4>
                        <div className="inputs">
                            <input type="text" name="name" id="" placeholder="Your Name" onChange={handleName} value={name} />
                        </div>
                        <div className="inputs">
                            <input type="text" name="mobile" id="" placeholder="Mobile Number" onChange={handleMobile} value={mobile} />
                        </div>
                        <div className="inputs">
                            <input type="text" name="email" id="" placeholder="E-mail" onChange={handleEmail} value={email} />
                        </div>
                        <div className="inputs">
                            <input type="text" name="message" id="" placeholder="Message" onChange={handleMessage} value={message} />
                        </div>
                        <div >
                            <button type="submit" id="submitfeedback">Submit</button>
                        </div>
                    </div>
                    <div id="contact-footer">
                        <div id="contact-address">
                            <h1 id="address">Our Address</h1><br />
                            100 Feet Ring Road, Banashankari Stage III, Dwaraka Nagar, Banashankari, Bengaluru, Karnataka 560085
                        </div>
                        <div id="contact-details">
                            <h1 id="contacts">Our Contacts</h1><br />
                            planyourescape@gmail.com<br /><br />
                            1234-5678-1000<br /><br />
                            8100 1456 7458
                        </div>
                        <div id="follow">
                            <h1 id="followUs">Follow Us</h1>
                            <div className="social">
                                <div><a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer"><img src={Facebook} alt="" width="30px" id="facebook" /></a></div>
                                <div><a href="https://www.instagram.com/?hl=en" target="_blank" rel="noopener noreferrer"><img src={Instagram} alt="" width="30px" id="facebook" /></a></div>
                                <div><a href="https://twitter.com/" target="_blank" rel="noopener noreferrer"><img src={Twitter} alt="" width="30px" id="facebook" /></a></div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}