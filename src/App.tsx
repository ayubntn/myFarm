import { useState, useEffect, useRef } from 'react'
import './stylesheets/App.css'
import Phaser from "phaser";
import MyScene from "./scenes/MyScene";
import GameConfig from "./GameConfig";
import myGlobal from "./myGlobal";

function App() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [game, setGame] = useState<Phaser.Game | null>(null);

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
      backgroundColor: "#ffffff",
      antialias: true,
    };
    setGame(new Phaser.Game(config));

  }, [canvas, game]);



  return (
    <div className="container">
      <div id="game" className={import.meta.env.MODE === 'development' ? 'is-development' : ''}></div>
      <div className="operations">
        <div className="buttons">
          <button type="button" onClick={reset}>リセット</button>
        </div>
      </div>
    </div>
  )
}

export default App
