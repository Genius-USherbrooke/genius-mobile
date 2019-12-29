
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
    score: number | null;
    total: number;
    unit: string;
    title: string;
    order: number;
    competences: {
      id: string;
      score: number | null;
      total: number;
    }[];
  }[];
  aps: {
    id: string;
    score: number | null;
    total: number;
    competences: {
      id: string;
      score: number | null;
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
      completed: boolean;
    }[];
    score: number;
    total: number;
    completedTotal: number;
  }[];
  score: number;
  total: number;
  completedTotal: number;
}

function convertGridToCompetencies(grid: Grid): Competency[] {
  let competencies: Competency[] = grid.aps.map(ap => ({
    id: ap.id,
    sub_competencies: ap.competences.map(competency => ({
      id: competency.id,
      evaluations: [],
      score: competency.score || 0,
      total: competency.total,
      completedTotal: 0
    })),
    score: ap.competences.reduce((a, b) => a + (b['score'] || 0), 0),
    total: ap.competences.reduce((a, b) => a + b['total'], 0),
    completedTotal: 0
  }));

  grid.evaluations.forEach(evaluation =>
    evaluation.competences.forEach(competence => {
      const compId = competence.id.substring(0, competence.id.indexOf('-'));
      const subCompId = competence.id.substring(competence.id.indexOf('-') + 1, competence.id.length);

      // Todo check for undefined
      const comp = competencies.find(competency => competency.id === compId);
      const subComp = comp.sub_competencies.find(subCompetency => subCompetency.id === subCompId);

      subComp.evaluations.push({
        score: competence.score || 0,
        total: competence.total,
        app: evaluation.unit,
        label: evaluation.title,
        completed: competence.score != null,
      });

      subComp.completedTotal = subComp.evaluations.reduce((a, b) => a + (b['completed'] ? b['total'] : 0), 0);
      comp.completedTotal = comp.sub_competencies.reduce((a, b) => a + b['completedTotal'], 0);
    }));
  return competencies;
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