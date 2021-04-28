import styled from 'styled-components';
import Container from './Container';

const CardTable = () => (
  <Cardtable>
    <h1>Snap</h1>
    <Container />
  </Cardtable>
);

const Cardtable = styled.div.attrs({
  className: 'cardtable',
})`
  display: flex;
  flex-flow: column;
  height: 60vw;
  width: 100vw;

  justify-content: center;
  align-items: center;
`;
export default CardTable;
