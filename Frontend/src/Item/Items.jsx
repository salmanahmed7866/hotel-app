import { Link } from 'react-router-dom';
import "./Items.css"


export default function Items(props) {
    return (
        <>
            <div className="items"
            ><Link to={`/product/${props.id}`}>
                    <img src={props.image}></img>
                    <p>{props.name}</p></Link>
                    
            </div>


        </>
    )

}