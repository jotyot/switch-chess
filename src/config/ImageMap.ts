import WhitePawn from "../assets/wP.png";
import WhiteRook from "../assets/wR.png";
import WhiteBishop from "../assets/wB.png";
import WhiteKnight from "../assets/wKn.png";
import WhiteQueen from "../assets/wQ.png";
import WhiteKing from "../assets/wK.png";
import WhiteSuperPawn from "../assets/wSP.gif";

import BlackPawn from "../assets/bP.png";
import BlackRook from "../assets/bR.png";
import BlackBishop from "../assets/bB.png";
import BlackKnight from "../assets/bKn.png";
import BlackQueen from "../assets/bQ.png";
import BlackKing from "../assets/bK.png";
import BlackSuperPawn from "../assets/bSP.gif";

import WhiteSquare from "../assets/wS.png";
import BlackSquare from "../assets/bS.png";

import nWhitePawn from "../assets/wP-neon.png";
import nWhiteRook from "../assets/wR-neon.png";
import nWhiteBishop from "../assets/wB-neon.png";
import nWhiteKnight from "../assets/wKn-neon.png";
import nWhiteQueen from "../assets/wQ-neon.png";
import nWhiteKing from "../assets/wK-neon.png";
import nWhiteSuperPawn from "../assets/wSP-neon.gif";

import nBlackPawn from "../assets/bP-neon.png";
import nBlackRook from "../assets/bR-neon.png";
import nBlackBishop from "../assets/bB-neon.png";
import nBlackKnight from "../assets/bKn-neon.png";
import nBlackQueen from "../assets/bQ-neon.png";
import nBlackKing from "../assets/bK-neon.png";
import nBlackSuperPawn from "../assets/bSP-neon.gif";

import nWhiteSquare from "../assets/wS-neon.png";
import nBlackSquare from "../assets/bS-neon.png";

import rWhitePawn from "../assets/wP-rich.png";
import rWhiteRook from "../assets/wR-rich.png";
import rWhiteBishop from "../assets/wB-rich.png";
import rWhiteKnight from "../assets/wKn-rich.png";
import rWhiteQueen from "../assets/wQ-rich.png";
import rWhiteKing from "../assets/wK-rich.png";
import rWhiteSuperPawn from "../assets/wSP-rich.gif";

import rBlackPawn from "../assets/bP-rich.png";
import rBlackRook from "../assets/bR-rich.png";
import rBlackBishop from "../assets/bB-rich.png";
import rBlackKnight from "../assets/bKn-rich.png";
import rBlackQueen from "../assets/bQ-rich.png";
import rBlackKing from "../assets/bK-rich.png";
import rBlackSuperPawn from "../assets/bSP-rich.gif";

import rWhiteSquare from "../assets/wS-rich.png";
import rBlackSquare from "../assets/bS-rich.png";

import logo from "../assets/logo.png";

/**
 * Maps a string to its image. ex. get("WhitePawn") returns its corresponding image
 */
const ImageMap = new Map([
  // DEFAULT
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

  // NEON
  ["nWhitePawn", nWhitePawn],
  ["nWhiteRook", nWhiteRook],
  ["nWhiteBishop", nWhiteBishop],
  ["nWhiteKnight", nWhiteKnight],
  ["nWhiteQueen", nWhiteQueen],
  ["nWhiteKing", nWhiteKing],
  ["nWhiteSuperPawn", nWhiteSuperPawn],

  ["nBlackPawn", nBlackPawn],
  ["nBlackRook", nBlackRook],
  ["nBlackBishop", nBlackBishop],
  ["nBlackKnight", nBlackKnight],
  ["nBlackQueen", nBlackQueen],
  ["nBlackKing", nBlackKing],
  ["nBlackSuperPawn", nBlackSuperPawn],

  ["nWhiteSquare", nWhiteSquare],
  ["nBlackSquare", nBlackSquare],

  // ROYAL
  ["rWhitePawn", rWhitePawn],
  ["rWhiteRook", rWhiteRook],
  ["rWhiteBishop", rWhiteBishop],
  ["rWhiteKnight", rWhiteKnight],
  ["rWhiteQueen", rWhiteQueen],
  ["rWhiteKing", rWhiteKing],
  ["rWhiteSuperPawn", rWhiteSuperPawn],

  ["rBlackPawn", rBlackPawn],
  ["rBlackRook", rBlackRook],
  ["rBlackBishop", rBlackBishop],
  ["rBlackKnight", rBlackKnight],
  ["rBlackQueen", rBlackQueen],
  ["rBlackKing", rBlackKing],
  ["rBlackSuperPawn", rBlackSuperPawn],

  ["rWhiteSquare", rWhiteSquare],
  ["rBlackSquare", rBlackSquare],

  ["logo", logo],
]);

export default ImageMap;
