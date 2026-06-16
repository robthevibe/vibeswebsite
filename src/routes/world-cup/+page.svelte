<script>
  export let data;

  const worldCup = data.worldCup ?? {};

  const peopleLeaderboard = worldCup.peopleLeaderboard ?? [];
  const teamLeaderboard = worldCup.teamLeaderboard ?? [];
  const mostGoals = worldCup.mostGoals ?? [];
  const recentResults = worldCup.recentResults ?? [];
  const upcomingMatches = worldCup.upcomingMatches ?? [];

  const picks = data.picks ?? [];
  const leader = peopleLeaderboard[0] ?? null;

  function formatDate(value) {
    return new Date(value).toLocaleString('en-NZ', {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  function formatScore(match) {
    const home = match.score?.fullTime?.home;
    const away = match.score?.fullTime?.away;

    if (home === null || home === undefined || away === null || away === undefined) {
      return '-';
    }

    return `${home} - ${away}`;
  }

  function formatGroup(value) {
    if (!value) return '-';

    return value.replace('GROUP_', 'Group ');
  }

  function goalDifference(value) {
    if (value > 0) return `+${value}`;
    return value;
  }

  function getPickedTeamCount() {
    return picks.reduce((total, person) => total + person.teams.length, 0);
  }
</script>

<svelte:head>
  <title>World Cup Sweepstake</title>
</svelte:head>

<main class="world-cup-page">
  <section class="hero">
    <div class="hero-main">
      <p class="eyebrow">World Cup 2026</p>
      <h1>Chums Sweepstake</h1>

      {#if data.results?.updatedAt}
        <p class="last-updated">
          Last checked: {new Date(data.results.updatedAt).toLocaleString('en-NZ')}
        </p>
      {/if}
    </div>

    {#if leader}
      <aside class="leader-card">
        <p class="card-label">Current leader</p>

        <div class="leader-row">
          <div class="leader-rank">1</div>

          <div>
            <p class="leader-name">{leader.name}</p>
            <p class="leader-meta">
              {leader.points} pts · GD {goalDifference(leader.goalDifference)} · {leader.goalsFor} goals
            </p>
          </div>
        </div>

        <div class="team-pills">
          {#each leader.teams as team}
            <span>
              {#if team.crest}
                <img src={team.crest} alt="" />
              {/if}

              {team.shortName ?? team.name}
            </span>
          {/each}
        </div>
      </aside>
    {/if}
  </section>

  {#if data.error}
    <section class="error-card">
      {data.error}
    </section>
  {:else}


   
    <section class="section">
      <div class="section-header">
        <div>
          <p class="eyebrow small">Leaderboard</p>
          <h2>People</h2>
        </div>
      </div>

      <div class="podium-grid">
        {#each peopleLeaderboard.slice(0, 3) as person, index}
          <article class:gold={index === 0} class:silver={index === 1} class:bronze={index === 2} class="podium-card">
            <div class="podium-top">
              <span class="rank-badge">#{index + 1}</span>
              <strong>{person.points}</strong>
            </div>

            <h3>{person.name}</h3>

            <p>
              GD {goalDifference(person.goalDifference)} · {person.goalsFor} goals
            </p>

            <div class="team-pills">
              {#each person.teams as team}
                <span>
                  {#if team.crest}
                    <img src={team.crest} alt="" />
                  {/if}

                  {team.shortName ?? team.name}
                </span>
              {/each}
            </div>
          </article>
        {/each}
      </div>

      <div class="table-card">
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Teams</th>
              <th class="num">P</th>
              <th class="num">W</th>
              <th class="num">D</th>
              <th class="num">L</th>
              <th class="num">GD</th>
              <th class="num">GF</th>
              <th class="num">Pts</th>
            </tr>
          </thead>

          <tbody>
            {#each peopleLeaderboard as person, index}
              <tr>
                <td>
                  <span class="table-rank">#{index + 1}</span>
                </td>

                <td>
                  <strong>{person.name}</strong>
                </td>

                <td>
                  <div class="team-pills table-pills">
                    {#each person.teams as team}
                      <span>
                        {#if team.crest}
                          <img src={team.crest} alt="" />
                        {/if}

                        {team.shortName ?? team.name}
                        <em>{team.points} pts</em>
                      </span>
                    {/each}
                  </div>
                </td>

                <td class="num">{person.played}</td>
                <td class="num">{person.won}</td>
                <td class="num">{person.drawn}</td>
                <td class="num">{person.lost}</td>
                <td class="num">{goalDifference(person.goalDifference)}</td>
                <td class="num">{person.goalsFor}</td>
                <td class="num points">{person.points}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </section>

    <section class="split-section">
      <div class="section">
        <div class="section-header">
          <div>
            <p class="eyebrow small">Teams</p>
            <h2>Team leaderboard</h2>
          </div>

          <p>
            Each team with the owner shown in brackets.
          </p>
        </div>

        <div class="table-card">
          <table>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Team</th>
                <th class="num">P</th>
                <th class="num">W</th>
                <th class="num">D</th>
                <th class="num">L</th>
                <th class="num">GD</th>
                <th class="num">GF</th>
                <th class="num">Pts</th>
              </tr>
            </thead>

            <tbody>
              {#each teamLeaderboard as team, index}
                <tr>
                  <td>
                    <span class="table-rank">#{index + 1}</span>
                  </td>

                  <td>
                    <div class="team-cell">
                      {#if team.crest}
                        <img src={team.crest} alt="" />
                      {/if}

                      <div>
                        <strong>
                          {team.name}
                          {#if team.ownerName}
                            <span>({team.ownerName})</span>
                          {/if}
                        </strong>

                        <small>{team.tla}</small>
                      </div>
                    </div>
                  </td>

                  <td class="num">{team.played}</td>
                  <td class="num">{team.won}</td>
                  <td class="num">{team.drawn}</td>
                  <td class="num">{team.lost}</td>
                  <td class="num">{goalDifference(team.goalDifference)}</td>
                  <td class="num">{team.goalsFor}</td>
                  <td class="num points">{team.points}</td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      </div>

      <div class="section">
        <div class="section-header">
          <div>
            <p class="eyebrow small">Goals</p>
            <h2>Most team goals</h2>
          </div>

          <p>
            Ranked by goals scored.
          </p>
        </div>

        <div class="goal-list">
          {#each mostGoals.slice(0, 10) as team, index}
            <article class="goal-card">
              <div class="goal-team">
                <span class="goal-rank">{index + 1}</span>

                {#if team.crest}
                  <img src={team.crest} alt="" />
                {/if}

                <div>
                  <strong>{team.name}</strong>
                  <small>{team.ownerName ?? 'Unassigned'}</small>
                </div>
              </div>

              <strong class="goal-total">{team.goalsFor}</strong>
            </article>
          {/each}
        </div>
      </div>
    </section>

    <section class="split-section">
      <div class="section">
        <div class="section-header">
          <div>
            <p class="eyebrow small">Results</p>
            <h2>Recent results</h2>
          </div>
        </div>

        <div class="match-list">
          {#each recentResults as match}
            <article class="match-card">
              <div>
                <p>{formatDate(match.utcDate)} · {formatGroup(match.group)}</p>

                <strong>
                  {match.homeTeam?.name} vs {match.awayTeam?.name}
                </strong>
              </div>

              <span>{formatScore(match)}</span>
            </article>
          {/each}
        </div>
      </div>

      <div class="section">
        <div class="section-header">
          <div>
            <p class="eyebrow small">Fixtures</p>
            <h2>Upcoming matches</h2>
          </div>
        </div>

        <div class="match-list">
          {#each upcomingMatches as match}
            <article class="match-card">
              <div>
                <p>{formatDate(match.utcDate)} · {formatGroup(match.group)}</p>

                <strong>
                  {match.homeTeam?.name} vs {match.awayTeam?.name}
                </strong>
              </div>

              <span>vs</span>
            </article>
          {/each}
        </div>
      </div>
    </section>
  {/if}
</main>

<style>
  :global(body) {
    background: #f8edcc;
  }

  .world-cup-page {
    --ink: #07343a;
    --muted: rgba(7, 52, 58, 0.62);
    --faint: rgba(7, 52, 58, 0.09);
    --card: rgba(255, 255, 255, 0.92);
    --cream: #fff7df;
    --green: #0f766e;
    --green-dark: #075c54;
    --gold: #f8d36b;
    --shadow: 0 18px 45px rgba(7, 52, 58, 0.08);

    width: min(1180px, calc(100% - 32px));
    margin: 0 auto;
    padding: 32px 0 64px;
    color: var(--ink);
  }

  .hero {
    display: flex;
    justify-content: space-between;
    gap: 24px;
    align-items: flex-end;
    padding: 34px;
    border: 1px solid var(--faint);
    border-radius: 30px;
    background:
      radial-gradient(circle at top right, rgba(15, 118, 110, 0.18), transparent 34%),
      linear-gradient(135deg, #ffffff, var(--cream));
    box-shadow: var(--shadow);
  }

  .eyebrow {
    margin: 0;
    color: var(--green);
    font-size: 0.8rem;
    font-weight: 900;
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }

  .eyebrow.small {
    font-size: 0.72rem;
  }

  h1,
  h2,
  h3,
  p {
    margin: 0;
  }

  h1 {
    margin-top: 8px;
    font-size: clamp(1rem, 7vw, 5.8rem);
    line-height: 0.92;
    letter-spacing: -0.07em;
  }

  h2 {
    margin-top: 3px;
    font-size: clamp(1.6rem, 3vw, 2.1rem);
    line-height: 1;
    letter-spacing: -0.05em;
  }

  h3 {
    font-size: 1.55rem;
    letter-spacing: -0.04em;
  }

  .last-updated {
    margin-top: 14px;
    color: var(--muted);
    font-size: 0.95rem;
  }

  .leader-card,
  .summary-card,
  .podium-card,
  .table-card,
  .goal-card,
  .match-card {
    border: 1px solid var(--faint);
    background: var(--card);
    box-shadow: var(--shadow);
  }

  .leader-card {
    width: min(360px, 100%);
    padding: 20px;
    border-radius: 24px;
    backdrop-filter: blur(10px);
  }

  .card-label {
    color: var(--muted);
    font-size: 0.74rem;
    font-weight: 900;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .leader-row {
    display: flex;
    gap: 14px;
    align-items: center;
    margin-top: 12px;
  }

  .leader-rank {
    display: grid;
    place-items: center;
    flex: 0 0 auto;
    width: 48px;
    height: 48px;
    border-radius: 16px;
    background: var(--green);
    color: white;
    font-size: 1.4rem;
    font-weight: 950;
  }

  .leader-name {
    font-size: 1.45rem;
    font-weight: 950;
    letter-spacing: -0.04em;
  }

  .leader-meta {
    margin-top: 2px;
    color: var(--muted);
    font-size: 0.92rem;
  }

  .summary-grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 16px;
    margin-top: 24px;
  }

  .summary-card {
    padding: 22px;
    border-radius: 24px;
  }

  .summary-card p {
    color: var(--muted);
    font-size: 0.9rem;
    font-weight: 700;
  }

  .summary-card strong {
    display: block;
    margin-top: 8px;
    font-size: 2.7rem;
    line-height: 1;
    letter-spacing: -0.05em;
  }

  .section {
    margin-top: 38px;
  }

  .section-header {
    display: flex;
    justify-content: space-between;
    gap: 24px;
    align-items: end;
    margin-bottom: 16px;
  }

  .section-header > p {
    max-width: 360px;
    color: var(--muted);
    font-size: 0.92rem;
    text-align: right;
  }

  .podium-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 16px;
    margin-bottom: 16px;
  }

  .podium-card {
    position: relative;
    overflow: hidden;
    padding: 22px;
    border-radius: 26px;
  }

  .podium-card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(15, 118, 110, 0.08), transparent);
    pointer-events: none;
  }

  .podium-card.gold::before {
    background: linear-gradient(135deg, rgba(248, 211, 107, 0.35), transparent);
  }

  .podium-card.silver::before {
    background: linear-gradient(135deg, rgba(148, 163, 184, 0.22), transparent);
  }

  .podium-card.bronze::before {
    background: linear-gradient(135deg, rgba(180, 83, 9, 0.17), transparent);
  }

  .podium-card > * {
    position: relative;
  }

  .podium-top {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    align-items: center;
  }

  .rank-badge,
  .table-rank {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 999px;
    background: #f4eedc;
    color: var(--green-dark);
    font-size: 0.8rem;
    font-weight: 950;
  }

  .rank-badge {
    padding: 7px 12px;
  }

  .table-rank {
    min-width: 48px;
    padding: 6px 10px;
  }

  .podium-top strong {
    color: var(--green);
    font-size: 2.6rem;
    line-height: 1;
    letter-spacing: -0.06em;
  }

  .podium-card h3 {
    margin-top: 18px;
  }

  .podium-card p {
    margin-top: 5px;
    color: var(--muted);
    font-size: 0.92rem;
  }

  .team-pills {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 16px;
  }

  .team-pills span {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 7px 11px;
    border-radius: 999px;
    background: #f4eedc;
    color: var(--ink);
    font-size: 0.78rem;
    font-weight: 850;
    white-space: nowrap;
  }

  .team-pills img {
    width: 18px;
    height: 18px;
    object-fit: contain;
    border-radius: 999px;
  }

  .team-pills em {
    color: var(--muted);
    font-style: normal;
    font-weight: 800;
  }

  .table-pills {
    margin-top: 0;
  }

  .table-card {
    overflow-x: auto;
    border-radius: 26px;
  }

  table {
    width: 100%;
    min-width: 820px;
    border-collapse: collapse;
    font-size: 0.9rem;
  }

  thead {
    background: #f4eedc;
  }

  th,
  td {
    padding: 15px 16px;
    vertical-align: middle;
  }

  th {
    color: var(--muted);
    font-size: 0.72rem;
    font-weight: 950;
    letter-spacing: 0.08em;
    text-align: left;
    text-transform: uppercase;
  }

  td {
    border-top: 1px solid var(--faint);
  }

  tbody tr {
    transition: background 120ms ease;
  }

  tbody tr:hover {
    background: rgba(244, 238, 220, 0.55);
  }

  .num {
    text-align: right;
  }

  .points {
    color: var(--green);
    font-size: 1.05rem;
    font-weight: 950;
  }

  .split-section {
    display: grid;
    grid-template-columns: minmax(0, 1.25fr) minmax(340px, 0.75fr);
    gap: 24px;
  }

  .team-cell,
  .goal-team {
    display: flex;
    align-items: center;
    gap: 11px;
  }

  .team-cell img,
  .goal-team img {
    width: 28px;
    height: 28px;
    object-fit: contain;
    border-radius: 999px;
  }

  .team-cell strong {
    display: block;
  }

  .team-cell strong span {
    margin-left: 5px;
    color: var(--muted);
    font-weight: 750;
  }

  .team-cell small,
  .goal-team small {
    display: block;
    margin-top: 2px;
    color: var(--muted);
    font-size: 0.76rem;
  }

  .goal-list,
  .match-list {
    display: grid;
    gap: 12px;
  }

  .goal-card,
  .match-card {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 18px;
    padding: 16px;
    border-radius: 22px;
  }

  .goal-rank {
    display: grid;
    place-items: center;
    flex: 0 0 auto;
    width: 38px;
    height: 38px;
    border-radius: 14px;
    background: #f4eedc;
    color: var(--green-dark);
    font-weight: 950;
  }

  .goal-total {
    color: var(--green);
    font-size: 2rem;
    line-height: 1;
    letter-spacing: -0.05em;
  }

  .match-card p {
    color: var(--muted);
    font-size: 0.72rem;
    font-weight: 900;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .match-card strong {
    display: block;
    margin-top: 6px;
    font-size: 0.98rem;
  }

  .match-card > span {
    flex: 0 0 auto;
    padding: 9px 14px;
    border-radius: 15px;
    background: #f4eedc;
    color: var(--green-dark);
    font-weight: 950;
  }

  .error-card {
    margin-top: 24px;
    padding: 18px;
    border: 1px solid rgba(153, 27, 27, 0.2);
    border-radius: 20px;
    background: #fee2e2;
    color: #991b1b;
    font-weight: 700;
  }

  @media (max-width: 980px) {
    .hero,
    .section-header {
      align-items: stretch;
      flex-direction: column;
    }

    .section-header > p {
      max-width: none;
      text-align: left;
    }

    .summary-grid,
    .podium-grid,
    .split-section {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 620px) {
    .world-cup-page {
      width: min(100% - 20px, 1180px);
      padding-top: 18px;
    }

    .hero {
      padding: 24px;
      border-radius: 24px;
    }

    .summary-card,
    .podium-card {
      padding: 18px;
    }

    .summary-card strong {
      font-size: 2.25rem;
    }

    .goal-card,
    .match-card {
      align-items: flex-start;
      flex-direction: column;
    }

    .match-card > span {
      align-self: flex-start;
    }
  }
</style>