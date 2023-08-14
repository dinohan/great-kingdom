export interface GameKey {
  id: string;
}

export interface Game extends GameKey {
  log: string[];
  players: {
    black?: string;
    white?: string;
  };
  title: string;
}
