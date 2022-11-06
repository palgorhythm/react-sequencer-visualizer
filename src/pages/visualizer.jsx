import React, { useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Sequencer } from "../components/sequencer";
import {getRandomColor, getRandomGeometry} from '../lib/utils'
import { CONFIG } from "../config";

// Initialize an array that will hold configuration values
// for our 3D objects.
const objectConfigs = []
const positions = [
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
for (let i = 0; i < positions.length; i += 1) {
  objectConfigs.push({
    rotation: [
      Math.random() * CONFIG.visualizer.baseRotationSpeed,
      Math.random() * CONFIG.visualizer.baseRotationSpeed,
      Math.random() * CONFIG.visualizer.baseRotationSpeed,
    ],
    color: getRandomColor(),
    geometry: getRandomGeometry(),
    basePosition: [...positions[i], 0]
  });
}


function SequenceableObject(props) {
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

function updateObjectRotation(ref) {
  ref.current.rotation.x += objectConfigs[ref.current.index].rotation[0];
  ref.current.rotation.y += objectConfigs[ref.current.index].rotation[1];
  ref.current.rotation.z += objectConfigs[ref.current.index].rotation[2];
}

export default function Visualizer() {
  const [currentSequenceIndex, setCurrentSequenceIndex] = useState();
  return (
    <>
      <Sequencer setCurrentSequenceIndex={setCurrentSequenceIndex} />
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        {objectConfigs.map((objectConfig, index) => (
    <SequenceableObject
      currentSequenceIndex={currentSequenceIndex}
      key={index}
      color={objectConfig.color}
      geometry={objectConfig.geometry}
      basePosition={objectConfig.basePosition}
      index={index}
    />
  ))}
      </Canvas>
    </>
  );
}
