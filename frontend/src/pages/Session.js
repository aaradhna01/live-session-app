import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import VideoPlayer from "../components/VideoPlayer.js";

export default function Session() {
  const { id } = useParams();
  const [session, setSession] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/session/${id}`)
      .then(res => setSession(res.data))
      .catch(() => alert("Session not found"));
  }, [id]);

  return (
    <div style={{ textAlign: "center", marginTop: "60px" }}>
      {session ? (
        <>
          <h2>Welcome to Live Session</h2>
          <p>Session ID: {session.unique_id}</p>
          <VideoPlayer />
        </>
      ) : (
        <p>Loading session...</p>
      )}
    </div>
  );
}
