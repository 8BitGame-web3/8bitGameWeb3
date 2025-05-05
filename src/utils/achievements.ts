export interface Achievement {
  id: string;
  title: string;
  description: string;
  reward: number;
  gameId: string;
}

export const achievements: Achievement[] = [
  {
    id: 'mario-1-1',
    title: 'First Steps',
    description: 'Complete World 1-1 in Super Mario Bros',
    reward: 100,
    gameId: 'super-mario-bros'
  },
  {
    id: 'contra-no-death',
    title: 'Contra Master',
    description: 'Complete Contra without dying',
    reward: 500,
    gameId: 'contra'
  },
  {
    id: 'battle-city-100k',
    title: 'Tank Commander',
    description: 'Score 100,000 points in Battle City',
    reward: 300,
    gameId: 'battle-city'
  }
];

export function checkAchievement(
  gameId: string,
  score: number,
  level: number,
  deaths: number
): Achievement | null {
  const gameAchievements = achievements.filter(a => a.gameId === gameId);
  
  for (const achievement of gameAchievements) {
    switch (achievement.id) {
      case 'mario-1-1':
        if (level === 1) return achievement;
        break;
      case 'contra-no-death':
        if (deaths === 0) return achievement;
        break;
      case 'battle-city-100k':
        if (score >= 100000) return achievement;
        break;
    }
  }
  
  return null;
} 