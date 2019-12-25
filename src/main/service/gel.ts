
const HOST = 'https://www.gel.usherbrooke.ca/grille-notes/api';

export interface Session {
  user: {
    cip: string;
    email: string;
    fullName: string;
  }
}

export interface Trimester {
  id: string;
  label: string;
  current: boolean;
  profiles: {
    id: string;
    label: string;
  }[];
}

export interface Grid {
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

export interface Competency {
  id: string;
  sub_competencies: {
    id: string;
    evaluations: {
      app: string;
      label: string;
      score: number;
      total: number;
    }[];
    score: number;
    total: number;
  }[];
  score: number;
  total: number;
}

function convertGridToCompetencies(grid: Grid): Competency[] {
  return grid.aps.map(ap => ({
    id: ap.id,
    sub_competencies: ap.competences.map(competency => ({
      id: competency.id,
      evaluations: [],
      score: competency.score,
      total: competency.total,
    })),
    score: ap.competences.reduce((a, b) => a + (b['score'] || 0), 0),
    total: ap.competences.reduce((a, b) => a + (b['total'] || 0), 0),
  }));
}

export async function fetchSession(): Promise<Session> {
  return fetch(HOST + '/auth/session', {
    "credentials": "include",
    "method": "GET",
    "mode": "cors"
  })
    .then(res => res.json());
}

export async function fetchTrimesters(): Promise<Trimester[]> {
  return fetch(HOST + '/trimester', {
    "credentials": "include",
    "method": "GET",
    "mode": "cors"
  })
    .then(res => res.json());
}

export async function fetchCompetencies(trimester: string, profil: string): Promise<Competency[]> {
  return fetch(HOST + `/grid/results?trimester=${trimester}&profil=${profil}`, {
    "credentials": "include",
    "method": "GET",
    "mode": "cors"
  })
    .then(res =>  res.json())
    .then((res: Grid) => convertGridToCompetencies(res))
    .then(res => res.sort((a, b) => a.id < b.id ? -1 : a.id > b.id ? 1 : 0))
}