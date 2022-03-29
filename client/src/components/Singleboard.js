import { useState, useEffect } from "react"
import SingleBlack from "./SingleBlack"
import SingleWhite from "./SingleWhite"
import axios from "axios"


const SingleBoard = () => {

    useEffect(() => {
        axios.get('http://127.0.0.1:5000')
            .then(res => console.log(res.data))
    }, [])

    const [color, setColor] = useState('')

    const ColorPicker = () => {
        if (color === '')
            return (
                <div className="row">
                    <div className="col-6">
                        <button className="btn btn-primary" onClick={() => setColor('White')} ><span style={{ textDecoration: "none", color: "white" }} >Play White</span></button>
                    </div>
                    <div className="col-6">
                        <button className="btn btn-primary" onClick={() => setColor('Black')}><span style={{ textDecoration: "none", color: "white" }} >Play Black</span></button>
                    </div>
                </div>
            )
        else return <div></div>
    }

    const Board = () => {
        if (color === 'White')
            return (
                <div className="row">
                    <h2> Play {color}</h2>
                    <SingleWhite />
                </div>
            )
        else if (color === 'Black')
            return (
                <div className="row">
                    <h2> Play {color}</h2>
                    <SingleBlack />
                </div>
            )
        else return <div></div>
    }


    return (
        <div>
            <h2>Single Player</h2>
            <ColorPicker />
            <Board />
        </div>
    )
}

export default SingleBoard