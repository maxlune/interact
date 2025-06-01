import { createFileRoute } from '@tanstack/react-router';
import { useCounterStore } from '../stores/counterStore.ts';

export const Route = createFileRoute('/about')({
  component: About,
});

function About() {
  const { count, increment } = useCounterStore();

  return (
    <>
      <h1>About</h1>
      <div>
        <h3>Test Zustand Store</h3>
        <p>
          Counter partagé: <span className="font-bold">{count}</span>
        </p>
        <button onClick={increment}>+1 depuis About</button>
      </div>
    </>
  );
}
