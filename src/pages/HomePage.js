import "./HomePage.scss";
import { React } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetcherWithFetch } from "../lib/fetcher";
import { TeamTile } from "./TeamTile";

export const HomePage = () => {
  const {
    data,
    error,
    isPending: loading,
  } = useQuery({
    queryKey: ["teams"],
    queryFn: () => fetcherWithFetch(`http://localhost:8080/teams`),
  });

  return (
    <div>
      {loading && <div>Loading...</div>}
      {error && <div>Team not found.</div>}
      {data && (
        <div className="HomePage">
          <div className="header-section">
            <h1 className="app-name">IPL Dashboard</h1>
          </div>
          <div className="team-grid">
            {data.map((team) => (
              <TeamTile teamName={team.teamName} key={team.id}></TeamTile>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
