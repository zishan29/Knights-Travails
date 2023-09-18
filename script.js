function knight(coord = null) {
  const k = {};
  k.coord = coord;
  k.map = [];
  return k;
}

function checkValidity(coord) {
  for (const i of coord) {
    if (i < 0 || i > 7) {
      console.log('Invalid input');
      return false;
    }
  }
  return true;
}

const possibleMoves = (coord) => {
  const x = coord[0];
  const y = coord[1];

  const moves = [
    [x - 2, y + 1],
    [x - 1, y + 2],
    [x + 1, y + 2],
    [x + 2, y + 1],
    [x + 2, y - 1],
    [x + 1, y - 2],
    [x - 1, y - 2],
    [x - 2, y - 1],
  ];

  const legalMoves = [];
  for (let i = 0; i < 8; i += 1) {
    const current = moves[i];
    const a = current[0];
    const b = current[1];

    if (a >= 0 && a <= 7 && b >= 0 && b <= 7) {
      legalMoves.push(current);
    }
  }
  return legalMoves;
};

const generateNextMove = (currentNode, coord, queue) => {
  const possibleNextMoves = possibleMoves(coord);

  for (const move in possibleNextMoves) {
    const newKnight = knight(possibleNextMoves[move]);
    const prevMap = currentNode.map;
    for (coord of prevMap) {
      newKnight.map.push(coord);
    }
    currentNode[`node${move}`] = newKnight;
    queue.push(newKnight);
  }
};

const knightMoves = (knightNode, destination) => {
  let { coord } = knightNode;

  const validCoord = checkValidity(coord);
  const validDest = checkValidity(destination);

  if (!validCoord || !validDest) {
    return `Invalid input`;
  }

  knightNode.map.push(coord);
  const queue = [];
  let found = false;

  if (coord[0] === destination[0] && coord[1] === destination[1]) {
    found = true;
    console.log(`You made it in 0 moves!`);
  } else {
    generateNextMove(knightNode, coord, queue);

    while (found === false) {
      const currentNode = queue.shift();
      coord = currentNode.coord;
      currentNode.map.push(coord);

      if (coord[0] === destination[0] && coord[1] === destination[1]) {
        found = true;
        console.log(
          `You made it in ${
            Object.keys(currentNode.map).length - 1
          } moves! Here's your path:`,
        );
        for (const coordinates of currentNode.map) {
          console.log(coordinates);
        }
      } else {
        generateNextMove(currentNode, coord, queue);
      }
    }
  }
};

const k = knight([7, 7]);
knightMoves(k, [7, 6]);
