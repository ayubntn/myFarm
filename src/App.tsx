import { useState, useEffect, useRef } from 'react'
import './App.css'
import Phaser from "phaser";
import MyScene from "./scenes/MyScene";
import GameConfig from "./GameConfig";

function App() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [game, setGame] = useState<Phaser.Game | null>(null);
  

  useEffect(() => {
    if (!canvas || game) return;

    const config: Phaser.Types.Core.GameConfig = {
      canvas: canvas.current!,
      customEnvironment: true,
      type: Phaser.CANVAS,
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

  return (
    <>
      <canvas ref={canvas} />
    </>
  )
}

export default App
