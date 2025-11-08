import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [session, setSession] = useState(null);

  const handleStartSession = async () => {
    const res = await axios.post("http://localhost:5000/api/session");
    setSession(res.data);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Start a Live Session</h1>
      <button onClick={handleStartSession}>START SESSION</button>

      {session && (
        <div style={{ marginTop: "20px" }}>
          <p>✅ Session Created!</p>
          <a href={session.userurl} target="_blank" rel="noreferrer">
            {session.userurl}
          </a>
          <br /><br />
          <video width="600" controls>
            <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
          </video>
        </div>
      )}
    </div>
  );
}
