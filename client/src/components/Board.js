import '../styles/Board.css'
import axios from 'axios'
import { useState } from 'react'
import Chess from 'chess.js'

const Board = () => {

    const [pieces, setPieces] = useState({ K: "", k: "", Q: "", q: "", R: "", r: "", B: "", b: "", N: "", n: "", P: "", p: "" })
    const [game, setGame] = useState(new Chess())


    axios.get('/pieces')
        .then(res => setPieces(res.data))
        .catch(res => console.log(res))
    console.log(pieces)
    return (
        <div className='container'>
            <div className="row">
                <div className="col-12">
                    <div className="board-row-0">
                        <div className="board-square">
                            1
                        </div>
                        <div className="board-square">
                            <img src={pieces.k} alt="" />
                        </div>
                        <div className="board-square">
                            1
                        </div>
                        <div className="board-square">
                            1
                        </div>
                        <div className="board-square">
                            1
                        </div>
                        <div className="board-square">
                            1
                        </div>
                        <div className="board-square">
                        <img src={pieces.Q} alt="" />
                        </div>
                        <div className="board-square">
                            1
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <div className="board-row-1">
                        <div className="board-square">
                            1
                        </div>
                        <div className="board-square">
                            1
                        </div>
                        <div className="board-square">
                            1
                        </div>
                        <div className="board-square">
                            1
                        </div>
                        <div className="board-square">
                            1
                        </div>
                        <div className="board-square">
                            1
                        </div>
                        <div className="board-square">
                            1
                        </div>
                        <div className="board-square">
                            1
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <div className="board-row-0">
                        <div className="board-square">
                            1
                        </div>
                        <div className="board-square">
                            1
                        </div>
                        <div className="board-square">
                        <img src={pieces.n} alt="" />
                        </div>
                        <div className="board-square">
                            1
                        </div>
                        <div className="board-square">
                            1
                        </div>
                        <div className="board-square">
                            1
                        </div>
                        <div className="board-square">
                            1
                        </div>
                        <div className="board-square">
                            1
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <div className="board-row-1">
                        <div className="board-square">
                            1
                        </div>
                        <div className="board-square">
                            1
                        </div>
                        <div className="board-square">
                            1
                        </div>
                        <div className="board-square">
                            1
                        </div>
                        <div className="board-square">
                            1
                        </div>
                        <div className="board-square">
                            1
                        </div>
                        <div className="board-square">
                            1
                        </div>
                        <div className="board-square">
                            1
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <div className="board-row-0">
                        <div className="board-square">
                            1
                        </div>
                        <div className="board-square">
                            1
                        </div>
                        <div className="board-square">
                            1
                        </div>
                        <div className="board-square">
                        <img src={pieces.p} alt="" />
                        </div>
                        <div className="board-square">
                            1
                        </div>
                        <div className="board-square">
                            1
                        </div>
                        <div className="board-square">
                            1
                        </div>
                        <div className="board-square">
                            1
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <div className="board-row-1">
                        <div className="board-square">
                            1
                        </div>
                        <div className="board-square">
                            1
                        </div>
                        <div className="board-square">
                        <img src={pieces.r} alt="" />
                        </div>
                        <div className="board-square">
                            1
                        </div>
                        <div className="board-square">
                            1
                        </div>
                        <div className="board-square">
                            1
                        </div>
                        <div className="board-square">
                            1
                        </div>
                        <div className="board-square">
                            1
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <div className="board-row-0">
                        <div className="board-square">
                            1
                        </div>
                        <div className="board-square">
                            1
                        </div>
                        <div className="board-square">
                            1
                        </div>
                        <div className="board-square">
                            1
                        </div>
                        <div className="board-square">
                            1
                        </div>
                        <div className="board-square">
                            1
                        </div>
                        <div className="board-square">
                            1
                        </div>
                        <div className="board-square">
                            1
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <div className="board-row-1">
                        <div className="board-square">
                            1
                        </div>
                        <div className="board-square">
                            1
                        </div>
                        <div className="board-square">
                            1
                        </div>
                        <div className="board-square">
                            1
                        </div>
                        <div className="board-square">
                            1
                        </div>
                        <div className="board-square">
                        <img src={pieces.K} alt="" />
                        </div>
                        <div className="board-square">
                            1
                        </div>
                        <div className="board-square">
                            1
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Board