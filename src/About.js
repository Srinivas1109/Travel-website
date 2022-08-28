import UserImage from './Images/UserImage/UserImage.png';

let devs = (name, mobno, email) => {
    return (
        <>
            <div id="cards">
                <div className="devlopers">
                    <div>
                        <img src={UserImage} alt="" width="140px" />
                        <div className="devInfo">
                            {name}<br />
                            {mobno}<br />
                            {email}<br />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default function About(props) {
    document.title = props.title;
    return (
        <>
            <div id="About">
                <div id="aboutHeading">
                    About Us
                </div>
                <div id="WhatWedo">
                    “Travel is the main thing you purchase that makes you more extravagant”. We, at ‘Organization Name’, swear by this and put stock in satisfying travel dreams that make you perpetually rich constantly.We have been moving excellent encounters for a considerable length of time through our cutting-edge planned occasion bundles and other fundamental travel administrations. We rouse our clients to carry on with a rich life, brimming with extraordinary travel encounters.
                    We’re a worker-claimed travel organization secured by our qualities, trustworthiness, and commitment to client benefit.

                    Our honor-winning organization reliably positions as a standout amongst other offices in the nation (Travel Weekly, Business Travel Weekly), and is the best individual from the renowned Signature Travel Network, an overall association enabling us to give our clients unmatched advantages.
                </div>
                <div id="cards">

                    {devs("Y Srinivas", "9876546778", "srinivas@gmail.com")}
                    {devs("Vismaya.R", "9978664578", "vismaya@gmail.com")}
                    {devs("Vishal.M", "7789563452", "vishal@gmail.com")}
                    {devs("Veena Garag", "7789067563", "veena@gmail.com")}

                </div>
            </div>

        </>
    )
}