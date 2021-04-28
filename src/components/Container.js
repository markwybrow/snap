import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Card from './Card';

import { createDeck, shuffle, dealCards, starter } from '../utils';

const Container = () => {
  const [loaded, setLoaded] = useState(false);
  // const [middleStackData, setMiddleStackData] = useState({player: 2, currentCard: 'H1'})
  const [player1, setPlayer1Cards] = useState([]);
  const [player2, setPlayer2Cards] = useState([]);
  const [middleStack, setMiddleStack] = useState([]);
  const [playerTurn, setPlayerTurn] = useState(2);
  const [errorStatus, setError] = useState(1);
  const [snap, setSnap] = useState(false);
  const [range, setRange] = useState({ value: 3 });
  const [claimed, setClaimed] = useState(false);

  const computer = useRef();

  const placeInMiddleStack = (card) => {
    const added = [...middleStack, card];
    setMiddleStack(added);
  };

  const handleClick = (e, value) => {
    const leftPlayer = e.currentTarget.classList.contains(0);
    const rightPlayer = e.currentTarget.classList.contains(1);

    if (leftPlayer) {
      console.log('leftPlayer : ', playerTurn);
      if (!playerTurn) return showError();
      toggleTurn();
      const _newStack = [...player1];
      setPlayer1Cards(_newStack);
      placeInMiddleStack(_newStack.pop());
    }
    if (rightPlayer) {
      console.log('rightPlayer : ', playerTurn);
      if (playerTurn) return showError();
      toggleTurn();
      const _newStack = [...player2];
      setPlayer2Cards(_newStack);
      placeInMiddleStack(_newStack.pop());
    }
  };

  const tellComputerToMove = () => {
    console.log('computers turn clicked : ');
  };
  const handleSnap = (e, value) => {
    setClaimed(true);
    if (snap) {
      alert(`you have won the middle`);
    }
    setPlayer2Cards([...player2, ...middleStack]);
    setMiddleStack([]);
  };

  const toggleTurn = () => {
    const turn = playerTurn != 0 ? 0 : 1;
    setPlayerTurn(turn);
  };

  const showError = () => {
    setError(0);
    const t = setTimeout(() => setError(1), 3000);
  };

  const handleRangeChange = (e) => {
    setRange({ value: e.target.value });
  };

  const createNewGame = () => {
    const deck = createDeck();
    const shuffledCards = shuffle(deck);
    const [player1, player2] = dealCards(shuffledCards);
    setPlayer1Cards(player1);
    setPlayer2Cards(player2);
    setMiddleStack([]);
    setPlayerTurn(starter());

    if (() => !playerTurn) {
      console.log('load computer : ', playerTurn);
      tellComputerToMove();
    }
  };
  useEffect(() => {
    createNewGame();
    setLoaded(true);
  }, []);

  useEffect(() => {
    const isSnap = [...middleStack];
    const { length } = isSnap;
    const snap =
      length > 2 &&
      isSnap[length - 1]?.slice(1) === isSnap[length - 2]?.slice(1);
    console.log('SNAP 0', claimed);
    if (snap && !claimed) {
      console.log('SNAP 1');
      setTimeout(() => {
        console.log('SNAP 2');
        tellTheLoser();
        setPlayer1Cards([...player1, ...middleStack]);
        setMiddleStack([]);
      }, 2500);
      console.log('SNAP 3');
    }
    setClaimed(false);
  }, [middleStack, range, claimed]);

  const tellTheLoser = () => {
    setSnap(snap);
  };

  useEffect(() => {
    console.log('player1,  : ', player1);
    console.log(' player2, : ', player2);
    console.log(' middleStack : ', middleStack);
  }, [player1, player2, middleStack]);

  const cardStack1 = () => {
    const top = [...player1].length - 1;
    return top ? (
      <Card
        id="computer"
        ref={computer}
        data={{ player: '0', currentCard: player1[top] }}
        handleClick={handleClick}
        className={`player-01 ${!playerTurn ? 'back' : 'front'} `}
      >
        player 01
      </Card>
    ) : (
      <div> EMPTY </div>
    );
  };
  const cardStack2 = () => {
    const top = [...player2].length - 1;
    return top ? (
      <Card
        data={{ player: '1', currentCard: player2[top] }}
        handleClick={handleClick}
        className={`player-02 ${playerTurn ? 'back' : 'front'} `}
      >
        player 02
      </Card>
    ) : (
      <div> EMPTY </div>
    );
  };

  const middleCardStack = () => {
    const top = [...middleStack].length - 1;
    return (
      top >= 0 && (
        <Card
          data={{ player: '2', currentCard: middleStack[top] }}
          handleClick={handleSnap}
          className="middle-stack"
        >
          middle
        </Card>
      )
    );
  };

  return (
    loaded && (
      <>
        {snap && <WinnerPanel>SNAP!</WinnerPanel>}
        {!errorStatus && (
          <ErrorPanel className="error">
            Sorry! not your turn - wait for it!
          </ErrorPanel>
        )}
        <TableSetting className="table places">
          {cardStack1()}

          {middleCardStack()}

          {cardStack2()}
        </TableSetting>
        <ResetContainer>
          <label>
            Reaction Time:
            <br />
            <input
              id="delay"
              type="range"
              min="0"
              max="5"
              value={range.value}
              onChange={handleRangeChange}
              step="1"
            />
            <br />
            {range.value}sec
          </label>
          <button onClick={() => createNewGame()}>RESTART GAME</button>
        </ResetContainer>
      </>
    )
  );
};

const TableSetting = styled.div.attrs({
  className: 'table-setting',
})`
  width: 80vw;
  max-width: 900px;
  height: 40vw;
  border: 1px solid #3b3b3b;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  &.table {
    background: silver;
  }
`;
const ResetContainer = styled.div.attrs({
  className: 'resetting-container',
})`
  width: 80vw;
  max-width: 900px;
  height: 120px;
  border: 1px solid #3b3b3b;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;

  button {
    border: 2px solid green;
    border-radius: 8px;
    padding: 1em;
  }
`;
const ErrorPanel = styled.div.attrs({
  className: 'error',
})`
  display: block;
  background: #f4c93c;
  margin: 1em 2em;
  border: 2px dashed #f3b837;
  border-radius: 6px;
  padding: 1em 2em;
`;
const WinnerPanel = styled.div.attrs({
  className: 'success',
})`
  display: block;
  background: #5bb283;
  margin: 1em 2em;
  border: 2px dashed #f3b837;
  border-radius: 6px;
  padding: 1em 2em;
`;
export default Container;
