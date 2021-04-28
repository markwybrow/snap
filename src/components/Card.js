import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import CardNumber from './CardNumber';
import CardSuite from './CardSuite';
import { SUITE } from '../utils/constants';

const Card = ({ ...props }) => {
  const { player, currentCard } = { ...props.data };
  const { handleClick, className } = props;

  const [suit, setSuit] = useState('');
  const [cardValue, setCardValue] = useState('');

  useEffect(() => {
    setSuit(SUITE[currentCard?.slice(0, 1)] || '');
    setCardValue(currentCard?.slice(1) || '');
  }, [currentCard]);

  return (
    <CardDiv
      className={`${player} ${className}`}
      value={cardValue}
      onClick={(e) => handleClick(e, currentCard)}
    >
      <div className={`row top suite ${player}`}>
        <CardNumber value={cardValue} />
        <CardSuite value={suit} />
      </div>
      <div className={`row middle suite ${player}`} />
      <div className={`row bottom suite ${player}`}>
        <CardNumber value={cardValue} />
        <CardSuite value={suit} />
      </div>
    </CardDiv>
  );
};

const CardDiv = styled.div.attrs({
  className: 'card',
})`
  background: #fff;  
  border-radius: 16px;
  border: 1px solid #282828;
  box-shadow: 0 1px 2px 0 rgb(60 64 67 / 30%), 0 2px 6px 2px rgb(60 64 67 / 15%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 320px;
  width: 200px;

  
  .row {
    width: 100%;
    
  }
  .suite {
    width: 100px;
    height: 100px;
    padding: 1em 1em;
  }
  &.back {
    background: #FF0000;
    transition: background-color 100ms linear;
    cursor: no-drop;
    .suite {
      display: none;
    }
  }
  &.front {
    background: #7EC69A;
    transition: background-color 100ms linear;
    .suite {
      display: none;
    }
  }
  .top {
    justify-content: flex-start;
    align-self: flex-start;
    align-items: center;
    height: 30%;
  }
  .middle,
  .bottom {
    justify-content: flex-end;
    align-self: flex-end;
    align-items: center;
    height: 30%;
    transform: rotate(180deg);
  }
}`;

export default Card;
