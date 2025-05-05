import React, { useEffect, useRef, useState } from 'react';
import JSNES from 'jsnes';

interface EmulatorProps {
  gameId: string;
}

const Emulator: React.FC<EmulatorProps> = ({ gameId }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [nes, setNes] = useState<JSNES | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const nes = new JSNES({
      onFrame: (frameBuffer: number[]) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const imageData = ctx.createImageData(256, 240);
        for (let i = 0; i < frameBuffer.length; i++) {
          imageData.data[i] = frameBuffer[i];
        }
        ctx.putImageData(imageData, 0, 0);
      },
      onAudioSample: (left: number, right: number) => {
        // Handle audio if needed
      }
    });

    setNes(nes);

    // Load ROM
    fetch(`/games/${gameId}.nes`)
      .then(response => response.arrayBuffer())
      .then(buffer => {
        nes.loadROM(buffer);
        setIsPlaying(true);
      })
      .catch(error => {
        console.error('Error loading ROM:', error);
      });

    return () => {
      if (nes) {
        nes.stop();
      }
    };
  }, [gameId]);

  useEffect(() => {
    if (!nes) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          nes.buttonDown(1, JSNES.Controller.BUTTON_UP);
          break;
        case 'ArrowDown':
          nes.buttonDown(1, JSNES.Controller.BUTTON_DOWN);
          break;
        case 'ArrowLeft':
          nes.buttonDown(1, JSNES.Controller.BUTTON_LEFT);
          break;
        case 'ArrowRight':
          nes.buttonDown(1, JSNES.Controller.BUTTON_RIGHT);
          break;
        case 'z':
          nes.buttonDown(1, JSNES.Controller.BUTTON_A);
          break;
        case 'x':
          nes.buttonDown(1, JSNES.Controller.BUTTON_B);
          break;
        case 'Enter':
          nes.buttonDown(1, JSNES.Controller.BUTTON_START);
          break;
        case 'Shift':
          nes.buttonDown(1, JSNES.Controller.BUTTON_SELECT);
          break;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          nes.buttonUp(1, JSNES.Controller.BUTTON_UP);
          break;
        case 'ArrowDown':
          nes.buttonUp(1, JSNES.Controller.BUTTON_DOWN);
          break;
        case 'ArrowLeft':
          nes.buttonUp(1, JSNES.Controller.BUTTON_LEFT);
          break;
        case 'ArrowRight':
          nes.buttonUp(1, JSNES.Controller.BUTTON_RIGHT);
          break;
        case 'z':
          nes.buttonUp(1, JSNES.Controller.BUTTON_A);
          break;
        case 'x':
          nes.buttonUp(1, JSNES.Controller.BUTTON_B);
          break;
        case 'Enter':
          nes.buttonUp(1, JSNES.Controller.BUTTON_START);
          break;
        case 'Shift':
          nes.buttonUp(1, JSNES.Controller.BUTTON_SELECT);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [nes]);

  return (
    <div className="flex flex-col items-center">
      <canvas
        ref={canvasRef}
        width={256}
        height={240}
        className="border-4 border-gray-800 rounded-lg"
        style={{ imageRendering: 'pixelated' }}
      />
      <div className="mt-4 text-center">
        <h2 className="text-xl font-bold mb-2">Controls</h2>
        <p>Arrow Keys: Move</p>
        <p>Z: A Button</p>
        <p>X: B Button</p>
        <p>Enter: Start</p>
        <p>Shift: Select</p>
      </div>
    </div>
  );
};

export default Emulator; 