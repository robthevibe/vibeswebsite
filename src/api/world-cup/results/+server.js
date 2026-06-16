import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

export const prerender = false;

const ONE_HOUR = 60 * 60;

function simplifyMatch(match) {
  return {
    id: match.id,
    utcDate: match.utcDate,
    status: match.status,
    stage: match.stage,
    group: match.group,
    matchday: match.matchday,
    lastUpdated: match.lastUpdated,

    homeTeam: {
      id: match.homeTeam?.id,
      name: match.homeTeam?.name,
      shortName: match.homeTeam?.shortName,
      tla: match.homeTeam?.tla,
      crest: match.homeTeam?.crest
    },

    awayTeam: {
      id: match.awayTeam?.id,
      name: match.awayTeam?.name,
      shortName: match.awayTeam?.shortName,
      tla: match.awayTeam?.tla,
      crest: match.awayTeam?.crest
    },

    score: {
      winner: match.score?.winner,
      duration: match.score?.duration,
      fullTime: match.score?.fullTime
    }
  };
}

export async function GET() {
  const token = env.FOOTBALL_DATA_API_TOKEN;

  if (!token) {
    return json(
      { error: 'Missing FOOTBALL_DATA_API_TOKEN' },
      { status: 500 }
    );
  }

  const response = await fetch(
    'https://api.football-data.org/v4/competitions/WC/matches?season=2026',
    {
      headers: {
        'X-Auth-Token': token
      }
    }
  );

  if (!response.ok) {
    const details = await response.text();

    return json(
      {
        error: 'Failed to fetch World Cup results',
        status: response.status,
        details
      },
      { status: response.status }
    );
  }

  const data = await response.json();

  return json(
    {
      updatedAt: new Date().toISOString(),
      resultSet: data.resultSet,
      competition: data.competition,
      matches: data.matches.map(simplifyMatch)
    },
    {
      headers: {
        'Cache-Control': `public, s-maxage=${ONE_HOUR}, stale-while-revalidate=${ONE_HOUR}`
      }
    }
  );
}