import { useGLTF, Center } from "@react-three/drei";
import { useEffect, useState } from "react";
import * as THREE from "three";

export function Christmas() {
    const christmas = useGLTF("./model/christmas.glb");

    const [isOriginalColor, setIsOriginalColor] = useState(true);

    useEffect(() => {
        const originalColor = 0xffffff;
        const redColor = 0xff1000;
        const yellowColor = 0xf8ff55;
        const blueColor = 0x0100e7;

        christmas.scene.traverse((child) => {
            if (child.isMesh && child.name.startsWith("redBulb")) {
                const colorToUse = isOriginalColor ? originalColor : redColor;
                child.material = new THREE.MeshBasicMaterial({
                    color: colorToUse,
                });
            }

            if (child.isMesh && child.name.startsWith("yellowBulb")) {
                const colorToUse = isOriginalColor
                    ? originalColor
                    : yellowColor;
                child.material = new THREE.MeshBasicMaterial({
                    color: colorToUse,
                });
            }

            if (child.isMesh && child.name.startsWith("blueBulb")) {
                const colorToUse = isOriginalColor ? originalColor : blueColor;
                child.material = new THREE.MeshBasicMaterial({
                    color: colorToUse,
                });
            }
        });

        const intervalId = setInterval(() => {
            setIsOriginalColor((prev) => !prev);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [christmas, isOriginalColor]);

    return (
        <primitive
            object={christmas.scene}
            scale={0.3}
            position={[0, -1.2, 0]}
        />
    );
}
