import WhitePawn from "./wP.png";
import WhiteRook from "./wR.png";
import WhiteBishop from "./wB.png";
import WhiteKnight from "./wKn.png";
import WhiteQueen from "./wQ.png";
import WhiteKing from "./wK.png";
import WhiteSuperPawn from "./wSP.png";

import BlackPawn from "./bP.png";
import BlackRook from "./bR.png";
import BlackBishop from "./bB.png";
import BlackKnight from "./bKn.png";
import BlackQueen from "./bQ.png";
import BlackKing from "./bK.png";
import BlackSuperPawn from "./bSP.png";

import WhiteSquare from "./wS.png";
import BlackSquare from "./bS.png";

/**
 * Maps a string to its image. ex. get("WhitePawn") returns its corresponding image
 */
const ImageMap = new Map([
  ["WhitePawn", WhitePawn],
  ["WhiteRook", WhiteRook],
  ["WhiteBishop", WhiteBishop],
  ["WhiteKnight", WhiteKnight],
  ["WhiteQueen", WhiteQueen],
  ["WhiteKing", WhiteKing],
  ["WhiteSuperPawn", WhiteSuperPawn],

  ["BlackPawn", BlackPawn],
  ["BlackRook", BlackRook],
  ["BlackBishop", BlackBishop],
  ["BlackKnight", BlackKnight],
  ["BlackQueen", BlackQueen],
  ["BlackKing", BlackKing],
  ["BlackSuperPawn", BlackSuperPawn],

  ["WhiteSquare", WhiteSquare],
  ["BlackSquare", BlackSquare],
]);

export default ImageMap;
