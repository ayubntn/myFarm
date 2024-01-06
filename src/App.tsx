import { useState, useEffect, useRef } from 'react'
import './stylesheets/App.css'
import Phaser from "phaser";
import MyScene from "./scenes/MyScene";
import GameConfig from "./GameConfig";
import myGlobal, { OperationType } from "./myGlobal";
import { CropType } from "./objects/crop";
import wastelandImage from "./assets/wasteland.png";
function App() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [game, setGame] = useState<Phaser.Game | null>(null);
  const [operation, setOperation] = useState<OperationType>(OperationType.plow);
  const [cropType, setCropType] = useState<CropType>(CropType.wheat);

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
    myGlobal.cropType = cropType;
  }, [operation, cropType]);

  return (
    <div className="container">
      <img src={wastelandImage} alt="wasteland" />
      <div id="game"></div>
      <div className="operations">
        <label className="operationBtn">
          <input
            type="radio"
            name="operation"
            value={OperationType.plow}
            onChange={() => setOperation(OperationType.plow)}
            checked={operation === OperationType.plow}
          />たがやす
        </label>
        <label className="operationBtn">
          <input
            type="radio"
            name="operation"
            value={OperationType.planting}
            onChange={() => setOperation(OperationType.planting)}
            checked={operation === OperationType.planting}
          />うえつける
        </label>

        {operation === OperationType.planting && (
          <div className="cropTypes">
            <label className="cropTypeBtn">
              <input
                type="radio"
                name="cropType"
                value={CropType.wheat}
                onChange={() => setCropType(CropType.wheat)}
                checked={cropType === CropType.wheat}
              />こむぎ
            </label>
            <label className="cropTypeBtn">
              <input
                type="radio"
                name="cropType"
                value={CropType.rice}
                onChange={() => setCropType(CropType.rice)}
                checked={cropType === CropType.rice}
              />おこめ
            </label>
          </div>
        )}

        <div className="buttons">
          <button type="button" onClick={reset}>リセット</button>
        </div>
      </div>
    </div>
  )
}

export default App
