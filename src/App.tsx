import { useState, useEffect, useRef } from 'react'
import './stylesheets/App.css'
import Phaser from "phaser";
import FarmScene from "./scenes/FarmScene";
import StoreScene from "./scenes/StoreScene";
import GameConfig from "./GameConfig";
import myGlobal from "./myGlobal";

function App() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [farm, setFarm] = useState<Phaser.Game | null>(null);
  const [store, setStore] = useState<Phaser.Game | null>(null);
  const [currentScene, setCurrentScene] = useState<string>("");

  const reset = () => {
    myGlobal.reset = true;
  }

  const initFarm = () => {
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
      scene: FarmScene,
      backgroundColor: "#ffffff",
      antialias: true,
    };
    setFarm(new Phaser.Game(config));
  };

  const initStore = () => {
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
      scene: StoreScene,
      backgroundColor: "#ffffff",
      antialias: true,
    };
    setStore(new Phaser.Game(config));
  };

  useEffect(() => {
    if (!canvas || farm) return;

    myGlobal.setCurrentScene = setCurrentScene;
    myGlobal.setCurrentScene('farm');
  }, [canvas, farm]);

  useEffect(() => {
    if (!currentScene) return;
    console.log(currentScene);
    if (currentScene === 'store') {
      farm?.destroy(true);
      initStore();
    } else if (currentScene === 'farm') {
      store?.destroy(true);
      initFarm();
    }
  }, [currentScene]);

  return (
    <div className="container">
      <div id="game"></div>
      <div className="operations">
        <div className="buttons">
          <button type="button" onClick={reset}>リセット</button>
        </div>
      </div>
    </div>
  )
}

export default App
