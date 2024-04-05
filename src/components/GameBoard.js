import React, {useEffect, useState} from 'react';
import GameCircle from './GameCircle';
import '../App.css';
import TopBox from './TopBox';
import FooterBox from './FooterBox';
import ToGetWinner, { isDraw } from './ToGetWinner';
import { GAME_DRAW, GAME_INPLAY, GAME_WON, NO_OF_CIRCLES, NO_PLAYER, PLAYER1, PLAYER2 } from '../GameStateConst';
import suggestComputerMove from '../SuggestMove';

const GameBoard = () => {
    // Here, I used React hooks...
    const [gameBoardInit, setGameBoardItems] = useState(Array(16).fill(NO_PLAYER));
    const [currentPlayer, setCurrentPlayer] = useState(PLAYER1);
    const [gameState, setGameState] = useState(GAME_INPLAY);
    const [winner, setWinner] = useState(NO_PLAYER);

    useEffect(() => {
        initTheGame();
    }, [])

    const initTheGame = () => {
        setGameBoardItems(Array(16).fill(NO_PLAYER));
        setGameState(GAME_INPLAY);
        setCurrentPlayer(PLAYER1);
    }

    const suggestMove = () => {
        circleClicked(suggestComputerMove(gameBoardInit));
    }

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
        if (ToGetWinner(gameBoardInit, id, currentPlayer)) {
            setGameState(GAME_WON);
            setWinner(currentPlayer);
        }
        if (isDraw(gameBoardInit, id, currentPlayer)) {
            setGameState(GAME_DRAW);
            setWinner(NO_PLAYER);
        }
        
        // a recommended way I used to update your state in React, instead of updating a re-initialised version of it...
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
        <FooterBox onClickNewGame={initTheGame} onClickSuggest={suggestMove} gameState={gameState} />
    </div>
  )
}

export default GameBoard