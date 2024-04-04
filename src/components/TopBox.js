import React from 'react';
import { GAME_WON, GAME_INPLAY } from '../GameStateConst';

const TopBox = ({currentPlayer, winner, gameState}) => {
    const renderHeading = () => {
        switch (gameState) {
            case GAME_INPLAY:
                return <div>PLAYER {currentPlayer} TURN</div>
            case GAME_WON:
                return <div>PLAYER {winner} WINS!</div>
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