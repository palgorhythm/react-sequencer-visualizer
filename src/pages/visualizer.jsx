import { createRoot } from 'react-dom/client'
import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'

// SECTION 2: CREATING AN OBJECT
function createCube(color = "#00FFAA") {
  // create a geometry, a material, and then make the mesh out of those two components.
  let geometry = <boxGeometry/>;
  let material = <meshBasicMaterial color/>;
  let newCube = <mesh geometry material/>;

  return newCube;
}

// SECTION 3: ANIMATING!

// create a cube
// let cube = createCube();
export let objects = createManyRandomObjects();
let rotations = [];
// loop from 0 all the way to 15 (bc we have 16 objects)
for (let i = 0; i < objects.length; i += 1) {
  // create a random x, y, and z rotation for the current object.
  rotations.push([
    Math.random() * 0.03,
    Math.random() * 0.03,
    Math.random() * 0.03,
  ]);
}


// SECTION 4: CREATE FUNCTIONS TO GET RANDOM COLORS/SHAPES
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

function createRandomGeometry() {
  let geometries = [
    <boxGeometry/>,
    <circleGeometry/>,
    <coneGeometry/>,
    <cylinderGeometry/>,
    <dodecahedronGeometry/>,
    <icosahedronGeometry/>,
    <octahedronGeometry/>,
    <sphereGeometry/>,
    <tetrahedronGeometry/>,
    <torusGeometry/>,
    <torusKnotGeometry/>,
  ];
  let chosenGeometryIndex = Math.floor(Math.random() * geometries.length);
  let chosenGeometry = geometries[chosenGeometryIndex];
  return chosenGeometry;
}

// SECTION 5: CREATE RANDOM OBJECTS
function createObject(position) {
  let geometry = createRandomGeometry();

  let material = <meshBasicMaterial color={getRandomColor()} wireframe={true}/>;

  let newObject = <mesh geometry material position={[position[0], position[1], position[2]]}/>;

  return newObject;
}

// createObject([-4, 0, 0]);

// SECTION 6: CREATE MANY OBJECTS
function createManyRandomObjects() {
  // these numbers were found thru experimentation- not an exact science!
  let width = 2.5;
  let height = 5;
  let depth = 4.5;
  return [
    createObject([-width * 3, height, -depth]),
    createObject([-width, height, -depth]),
    createObject([width, height, -depth]),
    createObject([width * 3, height, -depth]),

    createObject([-width * 3, height / 3, -depth]),
    createObject([-width, height / 3, -depth]),
    createObject([width, height / 3, -depth]),
    createObject([width * 3, height / 3, -depth]),

    createObject([-width * 3, -height / 3, -depth]),
    createObject([-width, -height / 3, -depth]),
    createObject([width, -height / 3, -depth]),
    createObject([width * 3, -height / 3, -depth]),

    createObject([-width * 3, -height, -depth]),
    createObject([-width, -height, -depth]),
    createObject([width, -height, -depth]),
    createObject([width * 3, -height, -depth]),
  ];
}

function updateRotationsOfObjects() {
  // call this function inside animate, and it will update the rotations of all objects
  // by their custom rotation amounts.
  if (!objects) {
    return;
  }
  for (let i = 0; i < objects.length; i += 1) {
    objects[i].rotation.x += rotations[i][0];
    objects[i].rotation.y += rotations[i][1];
    objects[i].rotation.z += rotations[i][2];
  }
}

function Box(props) {
  const ref = useRef()
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => {
             ref.current.rotation.x += 0.01;
             updateRotationsOfObjects();
  })
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh {...props} ref={ref}>
      <boxGeometry args={[1, 1, 1]}/>
      <meshStandardMaterial wireframe={true}/>
    </mesh>
  )
}

export default function Visualizer() {
  /* DECLARE STYLE AND TRIGGER FOR WIGGLE EFFECT FROM TODO ON NEXT LINE */
  
  return (
    <div className="page">
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Box position={[-1.2, 0, 0]} />
        <Box position={[1.2, 0, 0]} />
      </Canvas>
    </div>
  );
}
