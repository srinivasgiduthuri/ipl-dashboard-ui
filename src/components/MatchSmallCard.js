import "./MatchSmallCard.scss";
import { React } from "react";
import { Link } from "react-router-dom";

export const MatchSmallCard = ({ teamName, match }) => {
  const otherTeam = match.team1 === teamName ? match.team2 : match.team1;
  const otherTeamLinkUrl = `/teams/${otherTeam}`;
  const isMatchWon = teamName == match.winner;

  return (
    <div
      className={
        isMatchWon ? "MatchSmallCard won-card" : "MatchSmallCard lost-card"
      }
    >
      <span className="vs">vs</span>
      <h1>
        <Link to={otherTeamLinkUrl}>{otherTeam}</Link>
      </h1>
      <p className="match-result">
        {match.matchWinner} won by {match.resultMargin} {match.result}{" "}
      </p>
    </div>
  );
};
