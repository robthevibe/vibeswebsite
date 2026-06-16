function createEmptyStats() {
  return {
    played: 0,
    won: 0,
    drawn: 0,
    lost: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    goalDifference: 0,
    points: 0
  };
}

function getOwnerMap(picks) {
  const ownerMap = new Map();

  for (const person of picks) {
    for (const teamTla of person.teams) {
      ownerMap.set(teamTla, person.name);
    }
  }

  return ownerMap;
}

function getTeamDetails(team, ownerName = null) {
  return {
    id: team?.id ?? null,
    name: team?.name ?? null,
    shortName: team?.shortName ?? null,
    tla: team?.tla ?? null,
    crest: team?.crest ?? null,
    ownerName
  };
}

function addTeamIfMissing(teamMap, team, ownerMap) {
  if (!team?.tla) return;

  if (teamMap.has(team.tla)) return;

  teamMap.set(team.tla, {
    ...getTeamDetails(team, ownerMap.get(team.tla) ?? null),
    ...createEmptyStats()
  });
}

function addFinishedMatchStats(teamMap, match) {
  if (match.status !== 'FINISHED') return;

  const homeTla = match.homeTeam?.tla;
  const awayTla = match.awayTeam?.tla;

  if (!homeTla || !awayTla) return;

  const homeGoals = match.score?.fullTime?.home ?? 0;
  const awayGoals = match.score?.fullTime?.away ?? 0;
  const winner = match.score?.winner;

  const home = teamMap.get(homeTla);
  const away = teamMap.get(awayTla);

  if (!home || !away) return;

  home.played += 1;
  away.played += 1;

  home.goalsFor += homeGoals;
  home.goalsAgainst += awayGoals;
  home.goalDifference += homeGoals - awayGoals;

  away.goalsFor += awayGoals;
  away.goalsAgainst += homeGoals;
  away.goalDifference += awayGoals - homeGoals;

  if (winner === 'HOME_TEAM') {
    home.won += 1;
    home.points += 3;
    away.lost += 1;
  } else if (winner === 'AWAY_TEAM') {
    away.won += 1;
    away.points += 3;
    home.lost += 1;
  } else if (winner === 'DRAW') {
    home.drawn += 1;
    away.drawn += 1;
    home.points += 1;
    away.points += 1;
  }
}

function sortByFootballTable(a, b) {
  return (
    b.points - a.points ||
    b.goalDifference - a.goalDifference ||
    b.goalsFor - a.goalsFor ||
    a.name.localeCompare(b.name)
  );
}

export function calculateTeamLeaderboard(matches, picks) {
  const ownerMap = getOwnerMap(picks);
  const teamMap = new Map();

  for (const match of matches) {
    addTeamIfMissing(teamMap, match.homeTeam, ownerMap);
    addTeamIfMissing(teamMap, match.awayTeam, ownerMap);
  }

  for (const match of matches) {
    addFinishedMatchStats(teamMap, match);
  }

  return Array.from(teamMap.values()).sort(sortByFootballTable);
}

export function calculatePeopleLeaderboard(teamLeaderboard, picks) {
  return picks
    .map((person) => {
      const teams = person.teams.map((teamTla) => {
        const team = teamLeaderboard.find((team) => team.tla === teamTla);

        return (
          team ?? {
            tla: teamTla,
            name: teamTla,
            shortName: teamTla,
            crest: null,
            ownerName: person.name,
            ...createEmptyStats()
          }
        );
      });

      const totals = teams.reduce(
        (total, team) => ({
          played: total.played + team.played,
          won: total.won + team.won,
          drawn: total.drawn + team.drawn,
          lost: total.lost + team.lost,
          goalsFor: total.goalsFor + team.goalsFor,
          goalsAgainst: total.goalsAgainst + team.goalsAgainst,
          goalDifference: total.goalDifference + team.goalDifference,
          points: total.points + team.points
        }),
        createEmptyStats()
      );

      return {
        name: person.name,
        teams,
        ...totals
      };
    })
    .sort(sortByFootballTable);
}

export function calculateMostGoals(teamLeaderboard) {
  return [...teamLeaderboard].sort(
    (a, b) =>
      b.goalsFor - a.goalsFor ||
      b.goalDifference - a.goalDifference ||
      b.points - a.points ||
      a.name.localeCompare(b.name)
  );
}

export function getUpcomingMatches(matches, count = 8) {
  return matches
    .filter((match) => match.status !== 'FINISHED')
    .sort((a, b) => new Date(a.utcDate) - new Date(b.utcDate))
    .slice(0, count);
}

export function getRecentResults(matches, count = 8) {
  return matches
    .filter((match) => match.status === 'FINISHED')
    .sort((a, b) => new Date(b.utcDate) - new Date(a.utcDate))
    .slice(0, count);
}

export function calculateWorldCup(matches, picks) {
  const teamLeaderboard = calculateTeamLeaderboard(matches, picks);
  const peopleLeaderboard = calculatePeopleLeaderboard(teamLeaderboard, picks);
  const mostGoals = calculateMostGoals(teamLeaderboard);
  const upcomingMatches = getUpcomingMatches(matches);
  const recentResults = getRecentResults(matches);

  return {
    teamLeaderboard,
    peopleLeaderboard,
    mostGoals,
    upcomingMatches,
    recentResults
  };
}