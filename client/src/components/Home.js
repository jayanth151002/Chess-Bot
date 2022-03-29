import { Link } from "react-router-dom"

const Home = () => {
    return (
        <div>
            <h2>Home</h2>
            <div className="row">
                <div className="col-6">
                    <button className="btn btn-primary" ><Link to='/singleplayer' style={{ textDecoration: "none", color: "white" }} >Singleplayer</Link></button>
                </div>
                <div className="col-6">
                    <button className="btn btn-primary" ><Link to='/multiplayer' style={{ textDecoration: "none", color: "white" }} >Multiplayer</Link></button>
                </div>
            </div>
        </div>
    )
}

export default Home