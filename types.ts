export interface UserCriteria {
  experienceYears: number;
  industry: string;
  jobTitle: string;
  otherRequirements: string;
}

export interface JobRecommendation {
  rank: string; // e.g., "首選", "次選", "三選"
  title: string;
  industry: string;
  skills: string;
}

export interface DivineToolGuide {
  advice: string; // 針對該工具的錦囊妙計
  link: string;   // 工具連結
}

export interface OracleResponse {
  recommendations: JobRecommendation[];
  advice: string; // 聖帝箴言
  toolGuide: DivineToolGuide; // 錦囊妙計
}

export enum AppState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}