import Sea from "./Bgvideo/sea.mp4";
import "./App.css";
import { Link } from 'react-router-dom';

export default function Home(props) {
    document.title = props.title;
    return (
        <>
            <div id = "HomePage">
                <video src={Sea} autoPlay loop muted></video>
                <div id="home">
                    <h1 id="main-heading">Hide Away From The World</h1>
                    <h4 id="caption" className="body-text">Pack your bags. We’re going on vacation!</h4><br></br>
                    <br></br>
                    <h1 id="caption"><br />A Journey of a thousand <br />miles begins with a<br />single step</h1>
                    <br></br>
                    <h5 id="introline">Take memories, leave footprints.</h5>

                    <h3 id="home-text" className="body-text"></h3>
                    <div>
                    </div>
                    <br />
                    <Link id="explore" to="/travel">Plan your Escape </Link>
                </div>
            </div>
        </>
    )
}