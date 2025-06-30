import { Vote } from '../organisms/Vote';

export const HomePage = () => {
  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-4">Bienvenue sur InterAct</h1>
      <Vote showId="af168a42-ef71-449a-9ae0-75f46184aa9f" />
    </div>
  );
};
