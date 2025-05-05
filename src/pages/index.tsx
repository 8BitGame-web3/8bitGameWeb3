import { useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import GameList from '../components/GameList';
import Emulator from '../components/Emulator';

export default function Home() {
  const { publicKey } = useWallet();
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="p-4 border-b border-gray-800">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">8Bit Game</h1>
          <WalletMultiButton />
        </div>
      </header>

      <main className="container mx-auto p-4">
        {!selectedGame ? (
          <GameList onSelectGame={setSelectedGame} />
        ) : (
          <div>
            <button
              onClick={() => setSelectedGame(null)}
              className="mb-4 px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
            >
              Back to Games
            </button>
            <Emulator gameId={selectedGame} />
          </div>
        )}
      </main>
    </div>
  );
} 