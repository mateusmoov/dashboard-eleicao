import { useEffect, useState } from "react";
import axios from "axios";
import sanitizeHtml from "sanitize-html";
import SoundUrna from "./urna.mp3";
import "./App.css";

function App() {
  const [votes, setVotes] = useState({});
  const [old, setOld] = useState(0);
  const fetchVotes = async () => {
    const response = await axios.get(
      "https://resultados.tse.jus.br/oficial/ele2022/544/dados-simplificados/br/br-c0001-e000544-r.json"
    );

    setOld(response.data.psi);
    setVotes(response.data);
  };

  useEffect(() => {
    const audio = new Audio(SoundUrna);
    audio.play();
  }, [old]);

  useEffect(() => {
    let interval = setInterval(() => {
      fetchVotes();
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          marginBottom: "40px",
          fontFamily: "Poppins",
        }}
      >
        <p
          style={{
            marginBottom: "20px",
            fontSize: "30px",
          }}
        >
          Votos apurados
        </p>
        <h1>{votes.psi}</h1>
      </div>
      <div
        style={{
          display: "flex",
          width: "100vw",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        {votes?.cand?.map((vote) => (
          <div
            style={{
              borderRadius: "15px",
              display: "flex",
              width: "279px",
              height: "263px",
              backgroundColor: "white",
              color: "black",
              justifyContent: "center",
              textAlign: "center",
              flexDirection: "column",
              fontFamily: "Poppins",
            }}
          >
            <p
              style={{
                fontSize: "26px",
              }}
            >
              {vote.nm}
            </p>
            <div>
              <h1>{vote.pvap}</h1>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
