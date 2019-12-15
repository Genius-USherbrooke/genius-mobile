
interface grid {
  evaluations: {
    id: string;
    score: number;
    total: number;
    unit: string;
    title: string;
    order: number;
    competences: {
      id: string;
      score: number;
      total: number;
    }[];
  }[];
  aps: {
    id: string;
    score: number;
    total: number;
    competences: {
      id: string;
      score: number;
      total: number;
    }[];
  }[];
}