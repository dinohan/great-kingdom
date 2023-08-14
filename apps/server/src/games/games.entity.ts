export interface Game {
  id: number;
  log: string[];
  players: {
    black?: string;
    white?: string;
  };
  title: string;
}
