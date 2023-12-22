import { OrbitControls, PresentationControls } from "@react-three/drei";
import { Christmas } from "./Christmas";
import { Perf } from "r3f-perf";
import Lights from "./Lights";

export default function Experience() {
    return (
        <>
            {/* <OrbitControls makeDefault /> */}

            <color args={["#88c4f1"]} attach="background" />

            {/* <Perf position="top-left" /> */}

            <PresentationControls>
                <Christmas />;
            </PresentationControls>

            <Lights />
        </>
    );
}
