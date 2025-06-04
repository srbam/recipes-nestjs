import { Recipe } from '../entities/recipe.entity';

export abstract class RecipeRepository {
  abstract create(recipe: Recipe): void;
  abstract listAll(): Recipe[];
  abstract getById(id: string): Recipe | null;
  abstract findByTitle(title: string): Recipe | null;
}