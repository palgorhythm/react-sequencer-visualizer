import React, { useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Sequencer } from "../components/sequencer";

const CONFIG = {
  rotation: {
    speed: 0.04,
  },
  numObjects: 16,
};

let rotations = [];
let randomColors = [];
let randomGeometries = [];
for (let i = 0; i < CONFIG.numObjects; i += 1) {
  rotations.push([
    Math.random() * CONFIG.rotation.speed,
    Math.random() * CONFIG.rotation.speed,
    Math.random() * CONFIG.rotation.speed,
  ]);
  randomColors.push(getRandomColor());
  randomGeometries.push(getRandomGeometry());
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

function RandomObject(props) {
  const ref = useRef();
  const { viewport } = useThree();
  // Subscribe this component to the render-loop. Rotate the mesh every frame
  useFrame((state, delta) => {
    updateObjectRotation(ref);
  });

  const material = <meshBasicMaterial color={props.color} wireframe={true} />;

  // These numbers were found through experimentation- not an exact science!
  const viewportScaleFactor = (viewport.height * viewport.width) / 175;
  let width = 2.5 * viewportScaleFactor;
  let height = 5 * viewportScaleFactor;
  const stepScaleFactor = props.currentSequenceIndex === props.index ? 2 : 1;

  return (
    <mesh
      ref={ref}
      index={props.index}
      position={[
        props.basePosition[0] * width,
        props.basePosition[1] * height,
        0,
      ]}
      scale={viewportScaleFactor * stepScaleFactor}
    >
      {props.geometry}
      {material}
    </mesh>
  );
}

function createManyRandomObjects(currentSequenceIndex) {
  const basePositionVectors = [
    [-3, 1],
    [-1, 1],
    [1, 1],
    [3, 1],
    [-3, 1 / 3],
    [-1, 1 / 3],
    [1, 1 / 3],
    [3, 1 / 3],
    [-3, -1 / 3],
    [-1, -1 / 3],
    [1, -1 / 3],
    [3, -1 / 3],
    [-3, -1],
    [-1, -1],
    [1, -1],
    [3, -1],
  ];
  return basePositionVectors.map((vector, index) => (
    <RandomObject
      currentSequenceIndex={currentSequenceIndex}
      key={index}
      color={randomColors[index]}
      geometry={randomGeometries[index]}
      basePosition={[vector[0], vector[1], vector[2]]}
      index={index}
    />
  ));
}

function updateObjectRotation(ref) {
  ref.current.rotation.x += rotations[ref.current.index][0];
  ref.current.rotation.y += rotations[ref.current.index][1];
  ref.current.rotation.z += rotations[ref.current.index][2];
}

export default function Visualizer() {
  const [currentSequenceIndex, setCurrentSequenceIndex] = useState();
  return (
    <>
      <Sequencer setCurrentSequenceIndex={setCurrentSequenceIndex} />
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        {createManyRandomObjects(currentSequenceIndex)}
      </Canvas>
    </>
  );
}
