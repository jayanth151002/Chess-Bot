import '../styles/Board.css'
import axios from 'axios'
import { useRef, useState } from 'react'
import Chess from 'chess.js'

const Board = () => {
    const pos = useRef()
    const [pieces, setPieces] = useState({ "K": "", "k": "", "Q": "", "q": "", "R": "", "r": "", "B": "", "b": "", "N": "", "n": "", "P": "", "p": "" })
    const [game, setGame] = useState(new Chess())
    const [fen, setFen] = useState(game.fen())
    const [selpiece, setSelpiece] = useState()
    const [piecepos, setpiecepos] = useState({ K: "e1", Q: "d1", R1: "a1", R2: "h1", B1: "c1", B2: "f1", N1: "b1", N2: "g1", P1: "a2", P2: "b2", P3: "c2", P4: "d2", P5: "e2", P6: "f2", P7: "g2", P8: "h2", k: "e8", q: "d8", r1: "a8", r2: "h8", b1: "c8", b2: "f8", n1: "b8", n2: "g8", p1: "a7", p2: "b7", p3: "c7", p4: "d7", p5: "e7", p6: "f7", p7: "g7", p8: "h7" })
    var numarr = [8, 7, 6, 5, 4, 3, 2, 1]
    var alpharr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

    axios.get('/pieces')
        .then(res => setPieces(res.data))
        .catch(res => console.log(res))

    const movePiece = (id) => {
        if (selpiece) {
            var key = Object.keys(piecepos).find(k => piecepos[k] === selpiece)
            if (!Object.values(piecepos).includes(id)) {
                var temp = piecepos
                temp[key] = id
                setpiecepos(temp)
                document.getElementById(selpiece).className = "board-square"
                setSelpiece()
            }
            else {
                var key1 = Object.keys(piecepos).find(k => piecepos[k] === id)
                var temp = piecepos
                temp[key1] = ""
                temp[key] = id
                setpiecepos(temp)
                document.getElementById(id).className = "board-square"
                document.getElementById(selpiece).className = "board-square"
                setSelpiece()
            }
        }
    }

    const positions = numarr.map((n) => {
        const rowpos = alpharr.map((a) => {
            if (Object.values(piecepos).includes(a + n)) {
                var key = Object.keys(piecepos).find(k => piecepos[k] === a + n)
                return (
                    <div className="board-square" id={a + n} ref={pos} >
                        <img src={pieces[key[0]]} alt="" width="100%" id={a + n} onClick={(e) => {
                            if (selpiece)
                                document.getElementById(selpiece).className = "board-square"
                            document.getElementById(e.target.id).className = "board-square cls";
                            if (!selpiece)
                                setSelpiece(a + n)
                            movePiece(e.target.id)
                        }} />
                    </div>
                )
            } else return (
                <div className="board-square" id={a + n} onClick={(e) => {
                    movePiece(e.target.id)
                }}>

                </div>
            )
        })
        return (
            <div className="col-12">
                <div className={n % 2 == 0 ? "board-row-0" : "board-row-1"}>
                    {rowpos}
                </div>
            </div>
        )
    })

    return (
        <div className='container' >

            <div className="row">
                {positions}
            </div>
        </div >
    )
}

export default Board