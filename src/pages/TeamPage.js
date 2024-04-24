import "./TeamPage.scss";
import { React } from "react";
import { useParams } from "react-router-dom";
import { MatchDetailCard } from "../components/MatchDetailCard";
import { MatchSmallCard } from "../components/MatchSmallCard";
import { useQuery } from "@tanstack/react-query";
import { fetcherWithFetch } from "../lib/fetcher";
import { PieChart } from "react-minimal-pie-chart";

export const TeamPage = () => {
  const { teamName } = useParams();
  const {
    data,
    error,
    isPending: loading,
  } = useQuery({
    queryKey: ["matches", teamName],
    queryFn: () => fetcherWithFetch(`http://localhost:8080/team/${teamName}`),
  });

  return (
    <div>
      {loading && <div>Loading...</div>}
      {error && <div>Team not found.</div>}

      {data && data.matches && (
        <div className="TeamPage">
          <div className="team-name-section">
            <h1 className="team-name">{data.teamName}</h1>
          </div>
          <div className="win-loss-section">
            Wins / Losses
            <PieChart
              data={[
                {
                  title: "Losses",
                  value: data.totalMatches - data.totalWins,
                  color: "#a34d5d",
                },
                { title: "Wins", value: data.totalWins, color: "#4da375" },
              ]}
            />
          </div>
          <div className="match-detail-section">
            <h3>Latest Matches</h3>
            <MatchDetailCard teamName={data.teamName} match={data.matches[0]} />
          </div>

          {data.matches.slice(1).map((match) => (
            <MatchSmallCard
              teamName={data.teamName}
              match={match}
              key={match.id}
            />
          ))}
          <div className="more-link">
            <a href="#">More</a>
          </div>
        </div>
      )}
    </div>
  );
};
