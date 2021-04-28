import styled from 'styled-components';

const CardSuite = ({ value }) => <CardSuiteDiv className={`${value}`} />;

const CardSuiteDiv = styled.div.attrs({
  className: 'card-suite',
})`
  text-align: center;
  margin-left: 1em;
`;

export default CardSuite;
