import { createRoot } from "react-dom/client";
import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

const CONFIG = {
  rotation: {
    speed: 0.04,
  },
  numObjects: 16,
};

let rotations = [];
for (let i = 0; i < CONFIG.numObjects; i += 1) {
  rotations.push([
    Math.random() * CONFIG.rotation.speed,
    Math.random() * CONFIG.rotation.speed,
    Math.random() * CONFIG.rotation.speed,
  ]);
}

export function getRandomColor() {
  let colors = [
    "#ffadad",
    "#ffd6a5",
    "#fdffb6",
    "#caffbf",
    "#9bf6ff",
    "#a0c4ff",
    "#bdb2ff",
    "#ffc6ff",
    "#007BFF",
    "#FFAAEE",
    "#B7BB4E",
    "#FBBFAA",
    "#00D2E0",
    "#BBFFAA",
    "#FFAA44",
    "#55AA55",
    "#FF6437",
  ];
  let randomIndex = Math.round(Math.random() * colors.length);
  return colors[randomIndex];
}

function getRandomGeometry() {
  let geometries = [
    <boxGeometry />,
    <circleGeometry />,
    <coneGeometry />,
    <cylinderGeometry />,
    <dodecahedronGeometry />,
    <icosahedronGeometry />,
    <octahedronGeometry />,
    <sphereGeometry />,
    <tetrahedronGeometry />,
    <torusGeometry />,
    <torusKnotGeometry />,
  ];
  let chosenGeometryIndex = Math.floor(Math.random() * geometries.length);
  let chosenGeometry = geometries[chosenGeometryIndex];
  return chosenGeometry;
}

// SECTION 5: CREATE RANDOM OBJECTS
function RandomObject(props) {
  const ref = useRef();
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => {
    updateObjectRotation(ref);
  });

  const geometry = getRandomGeometry();

  const material = (
    <meshBasicMaterial color={getRandomColor()} wireframe={true} />
  );

  return (
    <mesh
      ref={ref}
      index={props.index}
      position={[props.position[0], props.position[1], props.position[2]]}
    >
      {geometry}
      {material}
    </mesh>
  );
}

function createManyRandomObjects() {
  // these numbers were found thru experimentation- not an exact science!
  let width = 2;
  let height = 5;
  let depth = 4.5;
  const positionVectors = [
    [-3, 1, -1],
    [-1, 1, -1],
    [1, 1, -1],
    [3, 1, -1],
    [-3, 1 / 3, -1],
    [-1, 1 / 3, -1],
    [1, 1 / 3, -1],
    [3, 1 / 3, -1],
    [-3, -1 / 3, -1],
    [-1, -1 / 3, -1],
    [1, -1 / 3, -1],
    [3, -1 / 3, -1],
    [-3, -1, -1],
    [-1, -1, -1],
    [1, -1, -1],
    [3, -1, -1],
  ];
  return positionVectors.map((vector, index) => (
    <RandomObject
      position={[width * vector[0], height * vector[1], depth * vector[2]]}
      index={index}
    />
  ));
}

function updateObjectRotation(ref) {
  ref.current.rotation.x += rotations[ref.current.index][0];
  ref.current.rotation.y += rotations[ref.current.index][1];
  ref.current.rotation.z += rotations[ref.current.index][2];
  ref.current.scale = window.innerHeight * 0.01;
}

export default function Visualizer() {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      {createManyRandomObjects()}
    </Canvas>
  );
}
