export interface UserCocktailComment {
  id: string;
  userCocktailId: string;
  userId: string;
  comment: string;
  dateCreated: string;
}

export interface UserCocktailLike {
  id: string;
  userCocktailId: string;
  userId: string;
  isLiked?: boolean;
}

export interface UserCocktail {
  id?: string;
  createUserId: string;
  name: string;
  imageUrl: string | null;
  ingredients: string[];
  measures: string[];
  mixingMethod: string;
  instructions: string;
  glass: string | null;
  dateModified: string;
  isPublic: boolean;
  tags?: string[];
  commentsCount: number;
  likesCount: number;
}
