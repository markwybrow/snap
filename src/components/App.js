import CardTable from './CardTable';
import '../css/App.scss';

function App() {
  console.log('%c Version 0.1  ? ¯_(ツ)_/¯: ', 'color: orange');
  return (
    <div className="App">
      <header className="header" />
      <CardTable />
    </div>
  );
}

export default App;
