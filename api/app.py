from flask import Flask, request
from flask_cors import CORS
import chess
import chess.engine

engine = chess.engine.SimpleEngine.popen_uci(
    "./stockfish/stockfish_14.1_win_x64_avx2.exe")

app = Flask(__name__)
CORS(app)

board = chess.Board()


@app.route("/")
def hello_world():
    board = chess.Board()
    return "Hello"


@app.route("/white", methods=['POST'])
def white_move():
    pos = request.form.get('pos')
    move = chess.Move.from_uci(pos)
    board.push(move)
    res = engine.play(board, chess.engine.Limit(time=0.1))
    new_move = res.move
    board.push(new_move)
    return str(new_move)
