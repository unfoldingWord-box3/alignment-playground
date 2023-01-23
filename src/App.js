import logo from './logo.svg';
import './App.css';
import { DragDropContext } from 'react-dnd';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {/*<DragDropContext>*/}
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
        {/*</DragDropContext>*/}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
