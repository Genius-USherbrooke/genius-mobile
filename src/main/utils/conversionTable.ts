export interface Grade {
  minPercent: number;
  maxPercent: number;
  letter: string;
  value: number;
  color: string;
}

export const grades: Grade[] =  [
  { minPercent: 0, maxPercent: 49, letter: "E", value: 0.0 , color: "#ff0000"},
  { minPercent: 50, maxPercent: 52, letter: "D", value: 1.0, color: "#ffbf00" },
  { minPercent: 53, maxPercent: 56, letter: "D+", value: 1.3, color: "#ffbf00" },
  { minPercent: 57, maxPercent: 59, letter: "C-", value: 1.7, color: "#ffff00" },
  { minPercent: 60, maxPercent: 63, letter: "C", value: 2.0, color: "#ffff00" },
  { minPercent: 64, maxPercent: 67, letter: "C+", value: 2.3, color: "#ffff00" },
  { minPercent: 66, maxPercent: 70, letter: "B-", value: 2.7, color: "#ccff33" },
  { minPercent: 71, maxPercent: 74, letter: "B", value: 3.0, color: "#ccff33"},
  { minPercent: 75, maxPercent: 77, letter: "B+", value: 3.3, color: "#ccff33" },
  { minPercent: 78, maxPercent: 80, letter: "A-", value: 3.7, color: "#00cc00" },
  { minPercent: 81, maxPercent: 84, letter: "A", value: 4.0, color: "#00cc00" },
  { minPercent: 85, maxPercent: 100, letter: "A+", value: 4.3, color: "#00BFFF" }];

export function getGrade(percent: number) {
  percent = Math.round(percent * 100);
  return grades.find(grade => grade.minPercent <= percent && grade.maxPercent >= percent);
}
