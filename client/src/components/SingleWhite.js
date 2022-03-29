import '../styles/Board.css'
import axios from 'axios'
import { useRef, useState, useEffect, useCallback } from 'react'

const SingleWhite = () => {
    const pos = useRef()
    const [pieces, setPieces] = useState({ "K": "", "k": "", "Q": "", "q": "", "R": "", "r": "", "B": "", "b": "", "N": "", "n": "", "P": "", "p": "" })
    const [selpiece, setSelpiece] = useState()
    const [piecepos, setpiecepos] = useState({ K: "e1", Q: "d1", R1: "a1", R2: "h1", B1: "c1", B2: "f1", N1: "b1", N2: "g1", P1: "a2", P2: "b2", P3: "c2", P4: "d2", P5: "e2", P6: "f2", P7: "g2", P8: "h2", k: "e8", q: "d8", r1: "a8", r2: "h8", b1: "c8", b2: "f8", n1: "b8", n2: "g8", p1: "a7", p2: "b7", p3: "c7", p4: "d7", p5: "e7", p6: "f7", p7: "g7", p8: "h7" })
    var numarr = [8, 7, 6, 5, 4, 3, 2, 1]
    var alpharr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
    const board = alpharr.map((al) => numarr.map((n) => al + n)).flat()
    const [moves, setMoves] = useState([])
    const [check, setCheck] = useState("")

    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);

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

    const wKing = (id) => {
        setMoves([])
        var yinit = parseInt(id[1])
        var alphpos
        alpharr.map((k, n) => {
            if (alpharr[n] === id[0])
                alphpos = n
        })
        var tm = []
        for (var i = -1; i < 2; i++)
            for (var j = -1; j < 2; j++) {
                if (board.includes(alpharr[alphpos + i] + numarr[numarr.length - yinit - j])) {
                    if (!Object.values(piecepos).includes(alpharr[alphpos + i] + numarr[numarr.length - yinit - j]) || isBlack(Object.keys(piecepos).find(k => piecepos[k] === alpharr[alphpos + i] + numarr[numarr.length - yinit - j])[0])) {
                        document.getElementById(alpharr[alphpos + i] + numarr[numarr.length - yinit - j]).className = "board-square cls-p"
                        tm.push(alpharr[alphpos + i] + numarr[numarr.length - yinit - j])
                    }
                }
            }
        setMoves(tm)
    }
    const wQueen = (id) => {

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
            for (var i = yinit + 1, j = alphpos + 1; i <= numarr.length && j < alpharr.length; i++, j++) {
                if (board.includes(alpharr[j] + i)) {
                    if (Object.values(piecepos).includes(alpharr[j] + i)) {
                        if (isBlack(Object.keys(piecepos).find(k => piecepos[k] === alpharr[j] + i)[0])) {
                            tm.push(alpharr[j] + i)
                            document.getElementById(alpharr[j] + i).className = "board-square cls-p"
                        }
                        break
                    } else {
                        tm.push(alpharr[j] + i)
                        document.getElementById(alpharr[j] + i).className = "board-square cls-p"
                    }
                }
            }
            for (var i = yinit + 1, j = alphpos - 1; i <= numarr.length && j >= 0; i++, j--) {
                if (board.includes(alpharr[j] + i)) {
                    if (Object.values(piecepos).includes(alpharr[j] + i)) {
                        if (isBlack(Object.keys(piecepos).find(k => piecepos[k] === alpharr[j] + i)[0])) {
                            tm.push(alpharr[j] + i)
                            document.getElementById(alpharr[j] + i).className = "board-square cls-p"
                        }
                        break
                    } else {
                        tm.push(alpharr[j] + i)
                        document.getElementById(alpharr[j] + i).className = "board-square cls-p"
                    }
                }
            }
            for (var i = yinit - 1, j = alphpos + 1; i > 0 && j < alpharr.length; i--, j++) {
                if (board.includes(alpharr[j] + i)) {
                    if (Object.values(piecepos).includes(alpharr[j] + i)) {
                        if (isBlack(Object.keys(piecepos).find(k => piecepos[k] === alpharr[j] + i)[0])) {
                            tm.push(alpharr[j] + i)
                            document.getElementById(alpharr[j] + i).className = "board-square cls-p"
                        }
                        break
                    } else {
                        tm.push(alpharr[j] + i)
                        document.getElementById(alpharr[j] + i).className = "board-square cls-p"
                    }
                }
            }
            for (var i = yinit - 1, j = alphpos - 1; i > 0 && j >= 0; i--, j--) {
                if (board.includes(alpharr[j] + i)) {
                    if (Object.values(piecepos).includes(alpharr[j] + i)) {
                        if (isBlack(Object.keys(piecepos).find(k => piecepos[k] === alpharr[j] + i)[0])) {
                            tm.push(alpharr[j] + i)
                            document.getElementById(alpharr[j] + i).className = "board-square cls-p"
                        }
                        break
                    } else {
                        tm.push(alpharr[j] + i)
                        document.getElementById(alpharr[j] + i).className = "board-square cls-p"
                    }
                }
            }
            setMoves(tm)
        }
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
    const wBishop = (id) => {
        var yinit = parseInt(id[1])
        var alphpos
        alpharr.map((k, n) => {
            if (alpharr[n] === id[0])
                alphpos = n
        })
        var tm = []
        for (var i = yinit + 1, j = alphpos + 1; i <= numarr.length && j < alpharr.length; i++, j++) {
            if (board.includes(alpharr[j] + i)) {
                if (Object.values(piecepos).includes(alpharr[j] + i)) {
                    if (isBlack(Object.keys(piecepos).find(k => piecepos[k] === alpharr[j] + i)[0])) {
                        tm.push(alpharr[j] + i)
                        document.getElementById(alpharr[j] + i).className = "board-square cls-p"
                    }
                    break
                } else {
                    tm.push(alpharr[j] + i)
                    document.getElementById(alpharr[j] + i).className = "board-square cls-p"
                }
            }
        }
        for (var i = yinit + 1, j = alphpos - 1; i <= numarr.length && j >= 0; i++, j--) {
            if (board.includes(alpharr[j] + i)) {
                if (Object.values(piecepos).includes(alpharr[j] + i)) {
                    if (isBlack(Object.keys(piecepos).find(k => piecepos[k] === alpharr[j] + i)[0])) {
                        tm.push(alpharr[j] + i)
                        document.getElementById(alpharr[j] + i).className = "board-square cls-p"
                    }
                    break
                } else {
                    tm.push(alpharr[j] + i)
                    document.getElementById(alpharr[j] + i).className = "board-square cls-p"
                }
            }
        }
        for (var i = yinit - 1, j = alphpos + 1; i > 0 && j < alpharr.length; i--, j++) {
            if (board.includes(alpharr[j] + i)) {
                if (Object.values(piecepos).includes(alpharr[j] + i)) {
                    if (isBlack(Object.keys(piecepos).find(k => piecepos[k] === alpharr[j] + i)[0])) {
                        tm.push(alpharr[j] + i)
                        document.getElementById(alpharr[j] + i).className = "board-square cls-p"
                    }
                    break
                } else {
                    tm.push(alpharr[j] + i)
                    document.getElementById(alpharr[j] + i).className = "board-square cls-p"
                }
            }
        }
        for (var i = yinit - 1, j = alphpos - 1; i > 0 && j >= 0; i--, j--) {
            if (board.includes(alpharr[j] + i)) {
                if (Object.values(piecepos).includes(alpharr[j] + i)) {
                    if (isBlack(Object.keys(piecepos).find(k => piecepos[k] === alpharr[j] + i)[0])) {
                        tm.push(alpharr[j] + i)
                        document.getElementById(alpharr[j] + i).className = "board-square cls-p"
                    }
                    break
                } else {
                    tm.push(alpharr[j] + i)
                    document.getElementById(alpharr[j] + i).className = "board-square cls-p"
                }
            }
        }
        setMoves(tm)
    }
    const wKnight = (id) => {
        setMoves([])
        var tm = []
        var yinit = parseInt(id[1])
        var alphpos
        alpharr.map((k, n) => {
            if (alpharr[n] === id[0])
                alphpos = n
        })
        if (board.includes(alpharr[alphpos + 1] + (yinit + 2))) {
            if (!Object.values(piecepos).includes(alpharr[alphpos + 1] + (yinit + 2)) || isBlack(Object.keys(piecepos).find(k => piecepos[k] === alpharr[alphpos + 1] + (yinit + 2))[0])) {
                tm.push(alpharr[alphpos + 1] + (yinit + 2))
                document.getElementById(alpharr[alphpos + 1] + (yinit + 2)).className = "board-square cls-p"
            }
        }
        if (board.includes(alpharr[alphpos - 1] + (yinit + 2))) {
            if (!Object.values(piecepos).includes(alpharr[alphpos - 1] + (yinit + 2)) || isBlack(Object.keys(piecepos).find(k => piecepos[k] === alpharr[alphpos - 1] + (yinit + 2))[0])) {
                tm.push(alpharr[alphpos - 1] + (yinit + 2))
                document.getElementById(alpharr[alphpos - 1] + (yinit + 2)).className = "board-square cls-p"
            }
        }
        if (board.includes(alpharr[alphpos + 1] + (yinit - 2))) {
            if (!Object.values(piecepos).includes(alpharr[alphpos + 1] + (yinit - 2)) || isBlack(Object.keys(piecepos).find(k => piecepos[k] === alpharr[alphpos + 1] + (yinit - 2))[0])) {
                tm.push(alpharr[alphpos + 1] + (yinit - 2))
                document.getElementById(alpharr[alphpos + 1] + (yinit - 2)).className = "board-square cls-p"
            }
        }
        if (board.includes(alpharr[alphpos - 1] + (yinit - 2))) {
            if (!Object.values(piecepos).includes(alpharr[alphpos - 1] + (yinit - 2)) || isBlack(Object.keys(piecepos).find(k => piecepos[k] === alpharr[alphpos - 1] + (yinit - 2))[0])) {
                tm.push(alpharr[alphpos - 1] + (yinit - 2))
                document.getElementById(alpharr[alphpos - 1] + (yinit - 2)).className = "board-square cls-p"
            }
        }
        if (board.includes(alpharr[alphpos + 2] + (yinit + 1))) {
            if (!Object.values(piecepos).includes(alpharr[alphpos + 2] + (yinit + 1)) || isBlack(Object.keys(piecepos).find(k => piecepos[k] === alpharr[alphpos + 2] + (yinit + 1))[0])) {
                tm.push(alpharr[alphpos + 2] + (yinit + 1))
                document.getElementById(alpharr[alphpos + 2] + (yinit + 1)).className = "board-square cls-p"
            }
        }
        if (board.includes(alpharr[alphpos + 2] + (yinit - 1))) {
            if (!Object.values(piecepos).includes(alpharr[alphpos + 2] + (yinit - 1)) || isBlack(Object.keys(piecepos).find(k => piecepos[k] === alpharr[alphpos + 2] + (yinit - 1))[0])) {
                tm.push(alpharr[alphpos + 2] + (yinit - 1))
                document.getElementById(alpharr[alphpos + 2] + (yinit - 1)).className = "board-square cls-p"
            }
        }
        if (board.includes(alpharr[alphpos - 2] + (yinit + 1))) {
            if (!Object.values(piecepos).includes(alpharr[alphpos - 2] + (yinit + 1)) || isBlack(Object.keys(piecepos).find(k => piecepos[k] === alpharr[alphpos - 2] + (yinit + 1))[0])) {
                tm.push(alpharr[alphpos - 2] + (yinit + 1))
                document.getElementById(alpharr[alphpos - 2] + (yinit + 1)).className = "board-square cls-p"
            }
        }
        if (board.includes(alpharr[alphpos - 2] + (yinit - 1))) {
            if (!Object.values(piecepos).includes(alpharr[alphpos - 2] + (yinit - 1)) || isBlack(Object.keys(piecepos).find(k => piecepos[k] === alpharr[alphpos - 2] + (yinit - 1))[0])) {
                tm.push(alpharr[alphpos - 2] + (yinit - 1))
                document.getElementById(alpharr[alphpos - 2] + (yinit - 1)).className = "board-square cls-p"
            }
        }
        setMoves(tm)
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

    useEffect(() => {
        axios.get('/pieces')
            .then(res => setPieces(res.data))
            .catch(res => console.log(res))
    }, [])


    const showMoves = (id) => {
        var key = Object.keys(piecepos).find(k => piecepos[k] === id)
        switch (key[0]) {
            case 'K': wKing(id); break;
            case 'Q': wQueen(id); break;
            case 'R': wRook(id); break;
            case 'B': wBishop(id); break;
            case 'N': wKnight(id); break;
            case 'P': wPawn(id); break;
        }
    }

    const moveBlack = (piece, target) => {
        var key = Object.keys(piecepos).find(k => piecepos[k] === piece)
        console.log(key)
        if (!Object.values(piecepos).includes(target)) {
            var temp = piecepos
            temp[key] = target
            setpiecepos(temp)
        }
        else {
            var key1 = Object.keys(piecepos).find(k => piecepos[k] === target)
            var temp = piecepos
            temp[key1] = ""
            temp[key] = target
            setpiecepos(temp)
        }
    }

    const moveWhite = (id) => {
        if (selpiece) {
            var key = Object.keys(piecepos).find(k => piecepos[k] === selpiece)
            if (!Object.values(piecepos).includes(id)) {
                if (moves.includes(id)) {
                    var temp = piecepos
                    temp[key] = id
                    setpiecepos(temp)
                    document.getElementById(selpiece).className = "board-square"
                    const pos = new FormData
                    pos.append('pos', selpiece + id)
                    axios.post('http://127.0.0.1:5000/white', pos)
                        .then(res => {
                            moveBlack(res.data.slice(0, 2), res.data.slice(2, 4))
                            forceUpdate()
                        })
                        .catch(err => console.log(err))
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
                console.log(key1)
                if (!(key[0] == key[0].toUpperCase() && key1[0] == key1[0].toUpperCase()) && !(key[0] == key[0].toLowerCase() && key1[0] == key1[0].toLowerCase()) && moves.includes(id)) {
                    var temp = piecepos
                    temp[key1] = ""
                    temp[key] = id
                    setpiecepos(temp)
                    document.getElementById(id).className = "board-square"
                    document.getElementById(selpiece).className = "board-square"
                    const pos = new FormData
                    pos.append('pos', selpiece + id)
                    axios.post('http://127.0.0.1:5000/white', pos)
                        .then(res => {
                            moveBlack(res.data.slice(0, 2), res.data.slice(2, 4))
                            forceUpdate()
                        })
                        .catch(err => console.log(err))
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
                            if (isWhite(Object.keys(piecepos).find(k => piecepos[k] === e.target.id)[0])) {
                                if (selpiece)
                                    document.getElementById(selpiece).className = "board-square"
                                document.getElementById(e.target.id).className = "board-square cls";
                                showMoves(e.target.id)
                                if (!selpiece) {
                                    setSelpiece(a + n)
                                }
                                moveWhite(e.target.id)
                            }
                            else if (moves.includes(e.target.id)) {
                                moveWhite(e.target.id)
                            }
                        }} />
                    </div>
                )
            } else return (
                <div className="board-square" id={a + n} onClick={(e) => {
                    moveWhite(e.target.id)
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
            <h2>SingleWhite</h2>
            <div className="row">
                {positions}
            </div>
            <div>
                check:{check}
            </div>
        </div >
    )
}

export default SingleWhite