import { Injectable } from "@nestjs/common";
import { v4 as uuidv4 } from "uuid";
import { Recipe } from "../../domain/entities/recipe.entity";
import { RecipeRepository } from "../../domain/repositories/recipe.repository";
import { ConflictException } from "@nestjs/common";

@Injectable()
export class CreateRecipeUseCase {
    constructor(
        private readonly recipeRepo: RecipeRepository
    ) { }

    execute(title: string, description: string, ingredients: string[]) {
        const existing = this.recipeRepo.findByTitle(title);
        if (existing) throw new ConflictException('Recipe already exists');
        const now: Date = new Date();
        const recipe = new Recipe(
            uuidv4(),
            title,
            description,
            ingredients,
            now,
            now
        );
        this.recipeRepo.create(recipe);
        return recipe;
    }
}