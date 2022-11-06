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
  
  export function getRandomGeometry() {
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