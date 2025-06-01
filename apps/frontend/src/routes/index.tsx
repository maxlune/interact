import { createFileRoute } from '@tanstack/react-router';
import '../App.css';
import reactLogo from '../assets/react.svg';
import { useCounterStore } from '../stores/counterStore.ts';

export const Route = createFileRoute('/')({
  component: Home,
});

function Home() {
  const { count, increment, decrement, reset } = useCounterStore();
  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1 className="text-red-500">Hello World</h1>
      <p style={{ color: 'var(--test-var-color)' }}>Hello</p>
      <div className="space-x-2 mb-4">
        <button onClick={increment}>+1</button>
        <button onClick={decrement}>-1</button>
        <button onClick={reset}>Reset</button>
      </div>
      <p>Count from Zustand: {count}</p>
    </>
  );
}
