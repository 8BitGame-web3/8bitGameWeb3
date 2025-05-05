import React from 'react';

interface Game {
  id: string;
  title: string;
  description: string;
  image: string;
}

const games: Game[] = [
  {
    id: 'super-mario-bros',
    title: 'Super Mario Bros',
    description: 'The classic platformer that started it all',
    image: '/games/mario.png'
  },
  {
    id: 'contra',
    title: 'Contra',
    description: 'Run and gun action game',
    image: '/games/contra.png'
  },
  {
    id: 'battle-city',
    title: 'Battle City',
    description: 'Classic tank battle game',
    image: '/games/battle-city.png'
  }
];

interface GameListProps {
  onSelectGame: (gameId: string) => void;
}

const GameList: React.FC<GameListProps> = ({ onSelectGame }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {games.map((game) => (
        <div
          key={game.id}
          className="bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:bg-gray-700 transition"
          onClick={() => onSelectGame(game.id)}
        >
          <div className="aspect-w-16 aspect-h-9 bg-gray-900">
            <img
              src={game.image}
              alt={game.title}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="p-4">
            <h3 className="text-xl font-bold mb-2">{game.title}</h3>
            <p className="text-gray-400">{game.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GameList; 