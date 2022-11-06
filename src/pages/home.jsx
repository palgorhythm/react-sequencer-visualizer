import { useState, useRef } from "react";
import { animated } from "react-spring";
import { useWiggle } from "../hooks/wiggle";
import { Link } from "wouter";
import { Canvas, useFrame } from "@react-three/fiber";

// Our language strings for the header
const strings = ["Hello", "Salut", "Hola", "안녕", "Hej"];

// Utility function to choose a random value from the language array
function randomLanguage() {
  return strings[Math.floor(Math.random() * strings.length)];
}

function RotatingCube(props) {
  const ref = useRef();
  useFrame(() => (ref.current.rotation.x = ref.current.rotation.y += 0.01));
  return (
    <mesh
      ref={ref}
      onClick={props.onClick}
      className="mesh-clickable"
      scale={3}
    >
      <boxGeometry />
      <meshStandardMaterial color={"orange"} wireframe={true} />
    </mesh>
  );
}

function ThreeCanvas(props) {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <RotatingCube onClick={props.handleChangeHello} />
    </Canvas>
  );
}

/**
 * The Home function defines the content that makes up the main content of the Home page
 *
 * This component is attached to the /about path in router.jsx
 * The function in app.jsx defines the page wrapper that this appears in along with the footer
 */

export default function Home() {
  /* We use state to set the hello string from the array https://reactjs.org/docs/hooks-state.html
     - We'll call setHello when the user clicks to change the string
  */
  const [hello, setHello] = useState(strings[0]);

  /* The wiggle function defined in /hooks/wiggle.jsx returns the style effect and trigger function
     - We can attach this to events on elements in the page and apply the resulting style
  */
  const [style, trigger] = useWiggle({ x: 5, y: 5, scale: 1 });

  // When the user clicks we change the header language
  const handleChangeHello = () => {
    // Choose a new Hello from our languages
    const newHello = randomLanguage();

    // Call the function to set the state string in our component
    setHello(newHello);
  };
  return (
    <>
      <h1 className="title">{hello}!</h1>
      {/* When the user hovers over the image we apply the wiggle style to it */}
      <animated.div onMouseEnter={trigger} style={style}>
        {/* <img
          src="https://cdn.glitch.com/2f80c958-3bc4-4f47-8e97-6a5c8684ac2c%2Fillustration.svg?v=1618196579405"
          className="illustration"
          onClick={handleChangeHello}
          alt="Illustration click to change language"
        /> */}
        <ThreeCanvas handleChangeHello={handleChangeHello} />
      </animated.div>
      <div className="instructions">
        <h2>Using this project</h2>
        <p>
          This is the{" "}
          <strong>
            Intro to Creative Coding in React with{" "}
            <Link href="https://threejs.org/">Three.JS</Link> and{" "}
            <Link href="https://tonejs.github.io/">Tone.JS</Link>
          </strong>
          .
          <br />
          You can use this project as a starter to build your own app.
          <br />
          See more info in the <Link href="/about">About</Link> page, and check
          out README.md in the editor for additional detail!
        </p>
      </div>
    </>
  );
}
