import { useState, useEffect, useRef } from 'react'
import './App.css'
import Phaser from "phaser";
import MyScene from "./scenes/MyScene";

function App() {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvas) return;

    const config: Phaser.Types.Core.GameConfig = {
      canvas: canvas.current!,
      customEnvironment: true,
      type: Phaser.CANVAS,
      width: 800,
      height: 600,
      physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 200 },
        },
      },
      scene: MyScene,
    };
    new Phaser.Game(config);
  }, [canvas]);

  return (
    <>
      <canvas ref={canvas} />
    </>
  )
}

export default App
