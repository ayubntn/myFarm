import { useState, useEffect, useRef } from 'react'
import './stylesheets/App.css'
import Phaser from "phaser";
import FarmScene from "./scenes/FarmScene";
import StoreScene from "./scenes/StoreScene";
import KitchenScene from "./scenes/KitchenScene";
import GameConfig from "./GameConfig";
import myGlobal from "./myGlobal";

function App() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [farm, setFarm] = useState<Phaser.Game | null>(null);
  const [store, setStore] = useState<Phaser.Game | null>(null);
  const [kitchen, setKitchen] = useState<Phaser.Game | null>(null);
  const [currentScene, setCurrentScene] = useState<string>("");

  const reset = () => {
    myGlobal.reset = true;
    setCurrentScene('farm');
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
      backgroundColor: "#ffe4e1",
      antialias: true,
    };
    setStore(new Phaser.Game(config));
  };

  const initKitchen = () => {
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
      scene: KitchenScene,
      backgroundColor: "#f5deb3",
      antialias: true,
    };
    setKitchen(new Phaser.Game(config));
  }

  useEffect(() => {
    if (!canvas || farm) return;

    myGlobal.setCurrentScene = setCurrentScene;
    myGlobal.setCurrentScene('kitchen');
  }, [canvas, farm]);

  useEffect(() => {
    if (!currentScene) return;
    console.log(currentScene);
    if (currentScene === 'store') {
      farm?.destroy(true);
      kitchen?.destroy(true);
      initStore();
    } else if (currentScene === 'farm') {
      store?.destroy(true);
      kitchen?.destroy(true);
      initFarm();
    } else if (currentScene === 'kitchen') {
      store?.destroy(true);
      farm?.destroy(true);
      initKitchen();
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
