import { useCounterStore } from '../../stores/counterStore.ts';

export const HomePage = () => {
  const { count, increment, decrement, reset } = useCounterStore();
  return (
    <>
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
};
