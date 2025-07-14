// TEST END TO END

import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ParticipateVote } from './participate-vote';

describe('ParticipateVote', () => {
  let participateVote: ParticipateVote;
  let mockVoteRepository: any;
  let mockResultRepository: any;

  const voteParams = {
    voteId: 'vote-123',
    answerId: 'answer-1',
    userId: 'user-123',
  };

  beforeEach(() => {
    mockVoteRepository = { getVoteById: vi.fn() };
    mockResultRepository = { createResult: vi.fn() };

    participateVote = new ParticipateVote();
    (participateVote as any).voteRepository = mockVoteRepository;
    (participateVote as any).resultRepository = mockResultRepository;
  });

  describe('Nominal cases', () => {
    it(' successfully save a vote', async () => {
      const mockVote = {
        id: 'vote-123',
        status: 'active',
        question: {
          answers: [{ id: 'answer-1' }, { id: 'answer-2' }],
        },
      };
      const mockResult = { id: 'result-123', voteId: 'vote-123' };

      mockVoteRepository.getVoteById.mockResolvedValue(mockVote);
      mockResultRepository.createResult.mockResolvedValue(mockResult);

      const result = await participateVote.execute(voteParams);

      expect(result).toEqual({
        success: true,
        result: mockResult,
        message: 'Vote enregistré avec succès',
      });
    });
  });

  describe('Edge cases', () => {
    it('throws an error if the vote does not exist', async () => {
      mockVoteRepository.getVoteById.mockResolvedValue(null);

      await expect(participateVote.execute(voteParams)).rejects.toThrow(
        'Vote introuvable',
      );
    });

    it('throws an error if the vote is not active', async () => {
      mockVoteRepository.getVoteById.mockResolvedValue({ status: 'pending' });

      await expect(participateVote.execute(voteParams)).rejects.toThrow(
        "Ce vote n'est pas actif",
      );
    });

    it('throws an error if the vote is closed', async () => {
      mockVoteRepository.getVoteById.mockResolvedValue({ status: 'closed' });

      await expect(participateVote.execute(voteParams)).rejects.toThrow(
        "Ce vote n'est pas actif",
      );
    });

    it('throws an error if the user has already voted', async () => {
      const mockVote = {
        status: 'active',
        question: {
          answers: [{ id: 'answer-1' }],
        },
      };

      mockVoteRepository.getVoteById.mockResolvedValue(mockVote);
      mockResultRepository.createResult.mockRejectedValue(
        new Error('Vous avez déjà voté pour cette question'),
      );

      await expect(participateVote.execute(voteParams)).rejects.toThrow(
        'Vous avez déjà voté pour cette question',
      );
    });
  });
});
