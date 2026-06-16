import picks from '$lib/data/worldCupPicks.json';
import { calculateWorldCup } from '$lib/world-cup/calculateWorldCup.js';

export async function load({ fetch }) {
  const response = await fetch('/api/world-cup/results');

  if (!response.ok) {
    return {
      error: 'Could not load World Cup results',
      results: null,
      picks,
      worldCup: {
        teamLeaderboard: [],
        peopleLeaderboard: [],
        mostGoals: [],
        upcomingMatches: [],
        recentResults: []
      }
    };
  }

  const results = await response.json();

  return {
    error: null,
    results,
    picks,
    worldCup: calculateWorldCup(results.matches, picks)
  };
}