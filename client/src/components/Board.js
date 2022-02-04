import '../styles/Board.css'
import axios from 'axios'
import { useRef, useState } from 'react'
import Chess from 'chess.js'

const Board = () => {
    const pos = useRef()
    const [pieces, setPieces] = useState({ "K": "", "k": "", "Q": "", "q": "", "R": "", "r": "", "B": "", "b": "", "N": "", "n": "", "P": "", "p": "" })
    const [selpiece, setSelpiece] = useState()
    const [piecepos, setpiecepos] = useState({ K: "e1", Q: "d1", R1: "a1", R2: "h1", B1: "c1", B2: "f1", N1: "b1", N2: "g1", P1: "a2", P2: "b2", P3: "c2", P4: "d2", P5: "e2", P6: "f2", P7: "g2", P8: "h2", k: "e8", q: "d8", r1: "a8", r2: "h8", b1: "c8", b2: "f8", n1: "b8", n2: "g8", p1: "a7", p2: "b7", p3: "c7", p4: "d7", p5: "e7", p6: "f7", p7: "g7", p8: "h7" })
    var numarr = [8, 7, 6, 5, 4, 3, 2, 1]
    var alpharr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
    const [moves, setMoves] = useState([])

    const isWhite = p => {
        if (p == p.toUpperCase())
            return true
        else
            return false
    }
    const isBlack = p => {
        if (p == p.toLowerCase())
            return true
        else
            return false
    }

    const isFree = (id) => {
        if (Object.values(piecepos).includes(id))
            return false
        else
            return true
    }

    const wKing = () => {

    }
    const wQueen = () => {

    }
    const wRook = (id) => {
        setMoves([])
        var tm = []
        var yinit = parseInt(id[1])
        var alphpos
        alpharr.map((k, n) => {
            if (alpharr[n] === id[0])
                alphpos = n
        })
        if (Object.values(piecepos).includes(id)) {
            for (var i = alphpos + 1; i < alpharr.length; i++) {
                if (Object.values(piecepos).includes(alpharr[i] + yinit)) {
                    if (isBlack(Object.keys(piecepos).find(k => piecepos[k] === alpharr[i] + yinit)[0])) {
                        tm.push(alpharr[i] + yinit)
                        document.getElementById(alpharr[i] + yinit).className = "board-square cls-p"
                    }
                    break;
                } else {
                    if (alpharr[i] && yinit) {
                        tm.push(alpharr[i] + yinit)
                        document.getElementById(alpharr[i] + yinit).className = "board-square cls-p"
                    }
                }
            }
            for (var i = alphpos - 1; i >= 0; i--) {
                if (Object.values(piecepos).includes(alpharr[i] + yinit)) {
                    if (isBlack(Object.keys(piecepos).find(k => piecepos[k] === alpharr[i] + yinit)[0])) {
                        tm.push(alpharr[i] + yinit)
                        document.getElementById(alpharr[i] + yinit).className = "board-square cls-p"
                    }
                    break;
                } else {
                    if (alpharr[i] && yinit) {
                        tm.push(alpharr[i] + yinit)
                        document.getElementById(alpharr[i] + yinit).className = "board-square cls-p"
                    }
                }
            }
            for (var i = yinit + 1; i <= numarr.length; i++) {
                if (Object.values(piecepos).includes(alpharr[alphpos] + numarr[numarr.length - i])) {
                    if (isBlack(Object.keys(piecepos).find(k => piecepos[k] === alpharr[alphpos] + numarr[numarr.length - i])[0])) {
                        tm.push(alpharr[alphpos] + numarr[numarr.length - i])
                        document.getElementById(alpharr[alphpos] + numarr[numarr.length - i]).className = "board-square cls-p"
                    }
                    break;
                } else {
                    if (alpharr[alphpos] && numarr[numarr.length - i]) {
                        tm.push(alpharr[alphpos] + numarr[numarr.length - i])
                        document.getElementById(alpharr[alphpos] + numarr[numarr.length - i]).className = "board-square cls-p"
                    }
                }
            }
            for (var i = yinit - 1; i >= 0; i--) {
                if (Object.values(piecepos).includes(alpharr[alphpos] + numarr[numarr.length - i])) {
                    if (isBlack(Object.keys(piecepos).find(k => piecepos[k] === alpharr[alphpos] + numarr[numarr.length - i])[0])) {
                        tm.push(alpharr[alphpos] + numarr[numarr.length - i])
                        document.getElementById(alpharr[alphpos] + numarr[numarr.length - i]).className = "board-square cls-p"
                    }
                    break;
                } else {
                    if (alpharr[alphpos] && numarr[numarr.length - i]) {
                        tm.push(alpharr[alphpos] + numarr[numarr.length - i])
                        document.getElementById(alpharr[alphpos] + numarr[numarr.length - i]).className = "board-square cls-p"
                    }
                }
            }
            setMoves(tm)
        }
    }
    const wBishop = () => {

    }
    const wKnight = () => {

    }
    const wPawn = (id) => {
        var yinit = parseInt(id[1])
        var alphpos
        alpharr.map((k, n) => {
            if (alpharr[n] === id[0])
                alphpos = n
        })
        if (Object.values(piecepos).includes(id)) {
            if (yinit == 2) {
                if (isFree(id[0] + (yinit + 1))) {
                    document.getElementById(id[0] + (yinit + 1)).className = "board-square cls-p"
                    setMoves(() => [id[0] + (yinit + 1)])
                    if (isFree(id[0] + (yinit + 2))) {
                        document.getElementById(id[0] + (yinit + 2)).className = "board-square cls-p"
                        setMoves(() => [id[0] + (yinit + 1), id[0] + (yinit + 2)])
                    }
                }
            }
            else if (yinit > 2 && yinit < 8 && isFree(id[0] + (yinit + 1))) {
                document.getElementById(id[0] + (yinit + 1)).className = "board-square cls-p"
                setMoves(() => [id[0] + (yinit + 1)])
            }
            if (Object.values(piecepos).includes(alpharr[alphpos + 1] + String(parseInt(id[1]) + 1)) && !isWhite(Object.keys(piecepos).find(k => piecepos[k] === alpharr[alphpos + 1] + String(parseInt(id[1]) + 1))[0])) {
                document.getElementById(alpharr[alphpos + 1] + String(parseInt(id[1]) + 1)).className = "board-square cls-p"
                // console.log(alpharr[alphpos + 1] + String(parseInt(id[1]) + 1))
                setMoves(() => [alpharr[alphpos + 1] + String(parseInt(id[1]) + 1)])
            }
            if (Object.values(piecepos).includes(alpharr[alphpos - 1] + String(parseInt(id[1]) + 1)) && !isWhite(Object.keys(piecepos).find(k => piecepos[k] === alpharr[alphpos - 1] + String(parseInt(id[1]) + 1))[0])) {
                document.getElementById(alpharr[alphpos - 1] + String(parseInt(id[1]) + 1)).className = "board-square cls-p"
                //console.log(alpharr[alphpos - 1] + String(parseInt(id[1]) + 1))
                setMoves(() => [alpharr[alphpos + 1] + String(parseInt(id[1]) + 1), alpharr[alphpos - 1] + String(parseInt(id[1]) + 1)])
            }
        }
        document.getElementById(id).className = "board-square cls"
    }

    const bKing = (id) => {

    }

    const bQueen = (id) => {

    }
    const bRook = (id) => {
        setMoves([])
        var tm = []
        var yinit = parseInt(id[1])
        var alphpos
        alpharr.map((k, n) => {
            if (alpharr[n] === id[0])
                alphpos = n
        })
        if (Object.values(piecepos).includes(id)) {
            for (var i = alphpos + 1; i < alpharr.length; i++) {
                if (Object.values(piecepos).includes(alpharr[i] + yinit)) {
                    if (isWhite(Object.keys(piecepos).find(k => piecepos[k] === alpharr[i] + yinit)[0])) {
                        tm.push(alpharr[i] + yinit)
                        document.getElementById(alpharr[i] + yinit).className = "board-square cls-p"
                    }
                    break;
                } else {
                    if (alpharr[i] && yinit) {
                        tm.push(alpharr[i] + yinit)
                        document.getElementById(alpharr[i] + yinit).className = "board-square cls-p"
                    }
                }
            }
            for (var i = alphpos - 1; i >= 0; i--) {
                if (Object.values(piecepos).includes(alpharr[i] + yinit)) {
                    if (isWhite(Object.keys(piecepos).find(k => piecepos[k] === alpharr[i] + yinit)[0])) {
                        tm.push(alpharr[i] + yinit)
                        document.getElementById(alpharr[i] + yinit).className = "board-square cls-p"
                    }
                    break;
                } else {
                    if (alpharr[i] && yinit) {
                        tm.push(alpharr[i] + yinit)
                        document.getElementById(alpharr[i] + yinit).className = "board-square cls-p"
                    }
                }
            }
            for (var i = yinit + 1; i <= numarr.length; i++) {
                if (Object.values(piecepos).includes(alpharr[alphpos] + numarr[numarr.length - i])) {
                    if (isWhite(Object.keys(piecepos).find(k => piecepos[k] === alpharr[alphpos] + numarr[numarr.length - i])[0])) {
                        tm.push(alpharr[alphpos] + numarr[numarr.length - i])
                        document.getElementById(alpharr[alphpos] + numarr[numarr.length - i]).className = "board-square cls-p"
                    }
                    break;
                } else {
                    if (alpharr[alphpos] && numarr[numarr.length - i]) {
                        tm.push(alpharr[alphpos] + numarr[numarr.length - i])
                        document.getElementById(alpharr[alphpos] + numarr[numarr.length - i]).className = "board-square cls-p"
                    }
                }
            }
            for (var i = yinit - 1; i >= 0; i--) {
                if (Object.values(piecepos).includes(alpharr[alphpos] + numarr[numarr.length - i])) {
                    if (isWhite(Object.keys(piecepos).find(k => piecepos[k] === alpharr[alphpos] + numarr[numarr.length - i])[0])) {
                        tm.push(alpharr[alphpos] + numarr[numarr.length - i])
                        document.getElementById(alpharr[alphpos] + numarr[numarr.length - i]).className = "board-square cls-p"
                    }
                    break;
                } else {
                    if (alpharr[alphpos] && numarr[numarr.length - i]) {
                        tm.push(alpharr[alphpos] + numarr[numarr.length - i])
                        document.getElementById(alpharr[alphpos] + numarr[numarr.length - i]).className = "board-square cls-p"
                    }
                }
            }
            setMoves(tm)
        }
    }
    const bKnight = (id) => {

    }
    const bBishop = (id) => {

    }
    const bPawn = (id) => {
        var yinit = parseInt(id[1])
        var alphpos
        alpharr.map((k, n) => {
            if (alpharr[n] === id[0])
                alphpos = n
        })
        if (Object.values(piecepos).includes(id)) {
            if (yinit == 7) {
                if (isFree(id[0] + (yinit - 1))) {
                    document.getElementById(id[0] + (yinit - 1)).className = "board-square cls-p"
                    setMoves(() => [id[0] + (yinit - 1)])
                    if (isFree(id[0] + (yinit - 2))) {
                        document.getElementById(id[0] + (yinit - 2)).className = "board-square cls-p"
                        setMoves(() => [id[0] + (yinit - 1), id[0] + (yinit - 2)])
                    }
                }
            }
            else if (yinit < 7 && yinit > 0 && isFree(id[0] + (yinit - 1))) {
                document.getElementById(id[0] + (yinit - 1)).className = "board-square cls-p"
                setMoves(() => [id[0] + (yinit - 1)])
            }
            if (Object.values(piecepos).includes(alpharr[alphpos + 1] + String(parseInt(id[1]) - 1)) && !isBlack(Object.keys(piecepos).find(k => piecepos[k] === alpharr[alphpos + 1] + String(parseInt(id[1]) - 1))[0])) {
                document.getElementById(alpharr[alphpos + 1] + String(parseInt(id[1]) - 1)).className = "board-square cls-p"
                // console.log(alpharr[alphpos + 1] + String(parseInt(id[1]) + 1))
                setMoves(() => [alpharr[alphpos + 1] + String(parseInt(id[1]) - 1)])
            }
            if (Object.values(piecepos).includes(alpharr[alphpos - 1] + String(parseInt(id[1]) - 1)) && !isBlack(Object.keys(piecepos).find(k => piecepos[k] === alpharr[alphpos - 1] + String(parseInt(id[1]) - 1))[0])) {
                document.getElementById(alpharr[alphpos - 1] + String(parseInt(id[1]) - 1)).className = "board-square cls-p"
                //console.log(alpharr[alphpos - 1] + String(parseInt(id[1]) + 1))
                setMoves(() => [alpharr[alphpos + 1] + String(parseInt(id[1]) - 1), alpharr[alphpos - 1] + String(parseInt(id[1]) - 1)])
            }
        }
        document.getElementById(id).className = "board-square cls"
    }



    axios.get('/pieces')
        .then(res => setPieces(res.data))
        .catch(res => console.log(res))

    const showMoves = (id) => {
        var key = Object.keys(piecepos).find(k => piecepos[k] === id)
        switch (key[0]) {
            case 'K': wKing(id); break;
            case 'Q': wQueen(id); break;
            case 'R': wRook(id); break;
            case 'B': wBishop(id); break;
            case 'N': wKnight(id); break;
            case 'P': wPawn(id); break;
            case 'k': bKing(id); break;
            case 'q': bQueen(id); break;
            case 'r': bRook(id); break;
            case 'b': bBishop(id); break;
            case 'n': bKnight(id); break;
            case 'p': bPawn(id); break;
        }
    }

    const movePiece = (id) => {
        if (selpiece) {
            var key = Object.keys(piecepos).find(k => piecepos[k] === selpiece)
            if (!Object.values(piecepos).includes(id)) {
                if (moves.includes(id)) {
                    var temp = piecepos
                    temp[key] = id
                    setpiecepos(temp)
                    document.getElementById(selpiece).className = "board-square"
                    setSelpiece()
                }
                else {
                    document.getElementById(id).className = "board-square"
                    document.getElementById(selpiece).className = "board-square"
                    setSelpiece()
                }
            }
            else {
                var key1 = Object.keys(piecepos).find(k => piecepos[k] === id)
                if (!(key[0] == key[0].toUpperCase() && key1[0] == key1[0].toUpperCase()) && !(key[0] == key[0].toLowerCase() && key1[0] == key1[0].toLowerCase()) && moves.includes(id)) {
                    var temp = piecepos
                    temp[key1] = ""
                    temp[key] = id
                    setpiecepos(temp)
                    document.getElementById(id).className = "board-square"
                    document.getElementById(selpiece).className = "board-square"
                    setSelpiece()
                }
                else {
                    document.getElementById(id).className = "board-square"
                    document.getElementById(selpiece).className = "board-square"
                    setSelpiece()
                }
            }
            setOriginal()
        }
    }

    const setOriginal = () => {
        numarr.map((n) => {
            alpharr.map((a) => {
                document.getElementById(a + n).className = "board-square"
            })
        })
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
                            showMoves(e.target.id)
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
                <div className={n % 2 === 0 ? "board-row-0" : "board-row-1"}>
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