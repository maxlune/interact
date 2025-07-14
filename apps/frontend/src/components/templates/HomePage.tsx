import { Vote } from '../organisms/Vote';

export const HomePage = () => {
  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-4">Bienvenue sur InterAct</h1>
      {/*<Vote showId="1435c53c-0aa5-4a61-a5f2-5bd1058121c0" />*/}
      {/*<Vote showId="78934874-e915-41f3-815b-a3c8cf4a00be" />*/}
      <Vote showId="dfea4613-350d-4aa2-8de3-ec6c28a48bf9" />
    </div>
  );
};
