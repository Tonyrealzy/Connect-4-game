import React, {useState} from 'react';
import GameCircle from './GameCircle';
import '../App.css';
import TopBox from './TopBox';
import FooterBox from './FooterBox';
import ToGetWinner from './ToGetWinner';
import { GAME_DRAW, GAME_IDLE, GAME_INPLAY, GAME_WON, NO_OF_CIRCLES, NO_PLAYER, PLAYER1, PLAYER2 } from '../GameStateConst';

const GameBoard = () => {
    // Here, you have to use React hooks...
    const [gameBoardInit, setGameBoardItems] = useState(Array(16).fill(NO_PLAYER));
    const [currentPlayer, setCurrentPlayer] = useState(PLAYER1);
    const [gameState, setGameState] = useState(GAME_INPLAY);
    const [winner, setWinner] = useState(NO_PLAYER);

    const initialisedBoard = () => {
        const circles = [];
        for (let i = 0; i < NO_OF_CIRCLES; i++) {
            circles.push(renderCircle(i));
        }
        return circles;
    }

    const circleClicked = (id) => {
        if (gameBoardInit[id] !== NO_PLAYER) {
            return;
        }
        if (gameState !== GAME_INPLAY) {
            return;
        }
        // a recommended way to update your state in React, instead of updating a re-initialised version of it...
        if (ToGetWinner(gameBoardInit, id, currentPlayer)) {
            setGameState(GAME_WON);
            setWinner(currentPlayer);
        }

        setGameBoardItems(prev => {
            return prev.map((circle, pos) => {
                if (pos === id) {
                    return currentPlayer;
                }
                return circle;
            })
        })
        setCurrentPlayer(currentPlayer === PLAYER1 ? PLAYER2 : PLAYER1);
    }

    // To declutter the HTML script for rendering the circle
    const renderCircle = (id) => {
        return <GameCircle key={id} id={id} className={`player_${gameBoardInit[id]}`} onCircleClicked={circleClicked}/>
    }

  return (
    <div>
        <TopBox currentPlayer={currentPlayer} winner={winner} gameState={gameState}/>
        <div className='gameBoard'>
            {initialisedBoard()}
        </div>
        <FooterBox/>
    </div>
  )
}

export default GameBoard