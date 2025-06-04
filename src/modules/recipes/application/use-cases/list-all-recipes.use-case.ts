import { Injectable } from "@nestjs/common";
import { RecipeRepository } from "../../domain/repositories/recipe.repository";
import { Recipe } from "../../domain/entities/recipe.entity";

@Injectable()
export class ListAllRecipes {
    constructor(
        private readonly recipeRepo: RecipeRepository
    ) { }

    execute(): Recipe[] {
        const recipes = this.recipeRepo.listAll();
        return recipes
    }
}