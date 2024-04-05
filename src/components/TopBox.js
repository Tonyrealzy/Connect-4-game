import React from 'react';
import { GAME_WON, GAME_INPLAY, GAME_DRAW } from '../GameStateConst';
import "../App.css";

const TopBox = ({currentPlayer, winner, gameState}) => {
    const renderHeading = () => {
        switch (gameState) {
            case GAME_INPLAY:
                return <div>
                    <p className="lineHeight">PLAYER {currentPlayer} TURN</p>
                </div>
            case GAME_WON:
                return <div>
                    <p className="lineHeight">PLAYER {winner} WON!</p>
                </div>
            case GAME_DRAW:
                return <div>
                    <p className="lineHeight">DRAW!</p>
                </div>
            default: return
        }
    }
  return (
    <div className='topBox'>
        <h3>{renderHeading()}</h3>
    </div>
  )
}

export default TopBox