import React, { useRef, useState } from "react";
import { extend, useFrame } from "@react-three/fiber";
import { Points, BufferGeometry, BufferAttribute, ShaderMaterial } from "three";

extend({ Points });

export const Snow = () => {
    const particlesRef = useRef();
    const [particlesCount] = useState(500);

    const positions = new Float32Array(particlesCount * 3);
    const velocities = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 50;
        positions[i * 3 + 1] = Math.random() * 50;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 50;

        velocities[i * 3] = 0;
        velocities[i * 3 + 1] = -0.1;
        velocities[i * 3 + 2] = 0;
    }

    const geometry = new BufferGeometry();
    geometry.setAttribute("position", new BufferAttribute(positions, 3));
    geometry.setAttribute("velocity", new BufferAttribute(velocities, 3));

    const material = new ShaderMaterial({
        uniforms: {},
        vertexShader: `
      attribute vec3 velocity;

      void main() {
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = 4.0;
        gl_Position = projectionMatrix * mvPosition;

        vec3 newPosition = position + velocity;
        if (newPosition.y < -25.0) {
          newPosition.y = 25.0;
        }
        gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
      }
    `,
        fragmentShader: `
      void main() {
        gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
      }
    `,
    });

    useFrame(() => {
        const positions =
            particlesRef.current.geometry.attributes.position.array;
        for (let i = 0; i < particlesCount; i++) {
            positions[i * 3] += velocities[i * 3];
            positions[i * 3 + 1] += velocities[i * 3 + 1];
            positions[i * 3 + 2] += velocities[i * 3 + 2];

            if (positions[i * 3 + 1] < -25.0) {
                positions[i * 3 + 1] = 25.0;
            }
        }

        particlesRef.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <points ref={particlesRef} geometry={geometry} material={material} />
    );
};
