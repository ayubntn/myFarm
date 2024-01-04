import { useState, useEffect, useRef } from 'react'
import './stylesheets/App.css'
import Phaser from "phaser";
import MyScene from "./scenes/MyScene";
import GameConfig from "./GameConfig";
import myGlobal, { OperationType } from "./myGlobal";

function App() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [game, setGame] = useState<Phaser.Game | null>(null);
  const [operation, setOperation] = useState<OperationType>(OperationType.plow);

  myGlobal.setOperation = setOperation;

  const reset = () => {
    myGlobal.reset = true;
  }

  useEffect(() => {
    if (!canvas || game) return;

    const config: Phaser.Types.Core.GameConfig = {
      parent: "game",
      width: GameConfig.canvasWidth,
      height: GameConfig.canvasHeight,
      physics: {
        default: "arcade",
        arcade: {
          debug: false
        },
      },
      scene: MyScene,
    };
    setGame(new Phaser.Game(config));

  }, [canvas, game]);

  useEffect(() => {
    myGlobal.operation = operation;
    console.log(operation)
  }, [operation]);

  return (
    <div className="container">
      <div id="game"></div>
      <div className="operations">
        <label><input type="radio" name="operation" value={OperationType.plow} onChange={() => setOperation(OperationType.plow)} checked={operation === OperationType.plow} />耕す</label>
        <label><input type="radio" name="operation" value={OperationType.planting} onChange={() => setOperation(OperationType.planting)} checked={operation === OperationType.planting} />植付け</label>
        <div className="buttons">
          <button type="button" onClick={reset}>リセット</button>
        </div>
      </div>
    </div>
  )
}

export default App
