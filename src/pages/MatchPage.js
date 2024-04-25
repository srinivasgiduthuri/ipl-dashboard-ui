import "./MatchPage.scss";
import { React } from "react";
import { useParams } from "react-router-dom";
import { MatchDetailCard } from "../components/MatchDetailCard";
import { useQuery } from "@tanstack/react-query";
import { fetcherWithFetch } from "../lib/fetcher";
import { YearSelector } from "../components/YearSelector";

export const MatchPage = () => {
  const { teamName, year } = useParams();
  const {
    data,
    error,
    isPending: loading,
  } = useQuery({
    queryKey: ["matches", teamName, year],
    queryFn: () =>
      fetcherWithFetch(
        `http://localhost:8080/team/${teamName}/matches?year=${year}`
      ),
  });

  return (
    <div className="MatchPage">
      <div className="year-selector">
        <h3>Select year</h3>
        <YearSelector teamName={teamName} />
      </div>
      {data && (
        <div>
          <h1 className="page-heading">
            {teamName} matches in {year}
          </h1>
          {data.map((match) => (
            <MatchDetailCard teamName={teamName} match={match} key={match.id} />
          ))}
        </div>
      )}
    </div>
  );
};
