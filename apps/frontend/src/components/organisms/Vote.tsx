import { useVote } from '../../hooks/useVote.ts';

export const Vote = ({
  showId = 'af168a42-ef71-449a-9ae0-75f46184aa9f',
}: {
  showId: string;
}) => {
  const { activeVotes, results, hasVoted, vote, isConnected } = useVote(showId);

  if (!isConnected) {
    return <div className="p-4 text-center">Connectez-vous pour voter</div>;
  }

  if (isConnected && activeVotes.length === 0) {
    return <div className="p-4 text-center">Aucun vote actif</div>;
  }

  return (
    <div className="p-4 max-w-lg mx-auto">
      {activeVotes.map((voteData) => (
        <div key={voteData.id} className="mb-6 p-4 border rounded">
          <h3 className="font-bold mb-4">{voteData.question.content}</h3>

          <div className="mb-2 text-green-600 text-sm">
            {hasVoted(voteData.id) ? 'A voté' : ''}
          </div>

          {voteData.question.answers.map((answer) => {
            const voteResults = results[voteData.id];
            let result = null;

            if (Array.isArray(voteResults)) {
              result = voteResults.find((r) => r.answerId === answer.id);
            }

            const percentage = result?.percentage || 0;
            const voteCount = result?.voteCount || 0;

            return (
              <div key={answer.id} className="mb-2">
                <button
                  onClick={() => {
                    const success = vote(voteData.id, answer.id);
                    console.log(success);
                  }}
                  disabled={hasVoted(voteData.id)}
                  className="w-full p-3 text-left border rounded relative overflow-hidden hover:border-blue-400 hover:border-2 hover:cursor-pointer disabled:opacity-50"
                >
                  <div
                    className="absolute top-0 left-0 h-full bg-blue-400 transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  />

                  <div className="relative flex justify-between">
                    <span>{answer.content}</span>
                    <span className="font-bold">
                      {Math.round(percentage)}% ({voteCount})
                    </span>
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};
