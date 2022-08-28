import WestBengal from './Images/Travel/TravelImages/WestBengal.jpg';
import Italy from './Images/Travel/TravelImages/Italy.jpg';
import Kerala from './Images/Travel/TravelImages/Kerala.jpg';
import Malaysia from './Images/Travel/TravelImages/Malaysia.jpg';
import Maldives from './Images/Travel/TravelImages/Maldives.jpg';
import Munnar from './Images/Travel/TravelImages/Munnar.jpg';
import NewYork from './Images/Travel/TravelImages/NewYork.jpg';
import Srinagar from './Images/Travel/TravelImages/Srinagar.jpg';
import TajMahal from './Images/Travel/TravelImages/TajMahal.jpg';
import Thailand from './Images/Travel/TravelImages/Thailand.jpg';
import UnitedArabEmirates from './Images/Travel/TravelImages/UnitedArabEmirates.jpg';
import Info from './Info';

export function Travel(props){
    document.title = props.title;

    let images = [TajMahal, Italy, Kerala, Malaysia, Maldives, Munnar, NewYork, Srinagar, Thailand, UnitedArabEmirates, WestBengal];
    let places = ["TajMahal", "Italy", "Kerala", "Malaysia", "Maldives", "Munnar", "NewYork", "Srinagar", "Thailand", "UAE", "WestBengal"];


        let Places = images.map((img) => {
            return (
                <div id = "tourImages">
                    <img src={img} alt="" height = "300px" width = "500px"/>
                    <div className = "Imgtext"><div id = "textplace">{places[images.indexOf(img)]}</div></div>
                    <div id = "textInfo">{Info[images.indexOf(img)]}</div>
                </div>
            )
        })

    return(
 
            <div id = "Travel">
                <h1 style = {{'paddingLeft': "80px"}}>Trending Destinations</h1>
                {Places}
            </div>
            
    )
}
