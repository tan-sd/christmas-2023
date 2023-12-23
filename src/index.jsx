import "./style.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";
import useAudio from "./useAudio";

function App() {
    const { startPlaying, pausePlaying, isPlaying } = useAudio();

    return (
        <React.StrictMode>
            <Canvas>
                <Experience />
            </Canvas>
            <div
                className="audio"
                onClick={() => {
                    if (isPlaying) {
                        pausePlaying();
                    } else {
                        startPlaying();
                    }
                }}
            >
                <img
                    src={
                        isPlaying === false
                            ? "./image/audioMute.png"
                            : "./image/audioPlaying.png"
                    }
                />
            </div>
        </React.StrictMode>
    );
}

const root = ReactDOM.createRoot(document.querySelector("#root"));

root.render(<App />);
