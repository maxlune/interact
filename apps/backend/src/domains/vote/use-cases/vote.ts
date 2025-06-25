export class VoteUseCases {
  async getActiveVotesByShow(showId: string) {
    // TODO: Récupérer les votes actifs depuis la DB
    console.log(`Getting active votes for show ${showId}`);
    return [];
  }

  async participateInVote(data: {
    voteId: string;
    answerId: string;
    userId: string;
  }) {
    // TODO: Enregistrer le vote en DB
    console.log(
      `User ${data.userId} voted for answer ${data.answerId} in vote ${data.voteId}`,
    );
    return { success: true };
  }
}
