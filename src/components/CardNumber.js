import styled from 'styled-components';

const CardNumber = ({ value }) => <CardValue>{value}</CardValue>;

const CardValue = styled.div.attrs({
  className: 'card-value',
})`
  text-align: left;
  font-size: 2.4em;
`;

export default CardNumber;
