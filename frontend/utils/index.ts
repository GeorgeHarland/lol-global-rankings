import { RankingType, TeamInfo } from '@/types/types';

export function snakeToCamel(obj: any): any {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => snakeToCamel(item));
  }

  const camelObj: Record<string, any> = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const camelKey = key.replace(/_([a-z])/g, function (match, letter) {
        return letter.toUpperCase();
      });
      camelObj[camelKey] = snakeToCamel(obj[key]);
    }
  }

  return camelObj;
}

export function teamFilter(teams: RankingType[], input: string) {
  const results = teams.filter((team) => {
    return (
      (input &&
        team.team_name &&
        team.team_name.toLowerCase().includes(input)) ||
      (input && team.team_code && team.team_code.toLowerCase().includes(input))
    );
  });
  return results;
}
