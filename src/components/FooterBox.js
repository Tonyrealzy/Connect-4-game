import React from 'react';
import { GAME_INPLAY } from '../GameStateConst';

const FooterBox = ({onClickNewGame, onClickSuggest, gameState}) => {
  return (
    <div className='footBox'>
      {
        gameState !== GAME_INPLAY ? <button class="newGame" onClick={onClickNewGame}>{'NEW GAME'}</button> : <button class="newGame" onClick={onClickSuggest}>SUGGEST</button>
      }
    </div>
  )
}

export default FooterBox