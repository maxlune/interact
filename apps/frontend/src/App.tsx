import './App.css';
import reactLogo from './assets/react.svg';

function App() {
  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1 className="text-red-500">Hello World</h1>
      <p style={{ color: 'var(--test-var-color)' }}>Hello</p>
    </>
  );
}

export default App;
