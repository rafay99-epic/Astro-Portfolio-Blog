export interface Idea {
  title: string;
  description: string;
  stage: string;
}

export interface IdeaCategory {
  category: string;
  ideas: Idea[];
}
