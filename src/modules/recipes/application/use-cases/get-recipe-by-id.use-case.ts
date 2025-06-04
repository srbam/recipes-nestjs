import { Injectable } from "@nestjs/common";
import { RecipeRepository } from "../../domain/repositories/recipe.repository";
import { Recipe } from "../../domain/entities/recipe.entity";
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class GetRecipeByIdUseCase {
    constructor(
        private readonly recipeRepo: RecipeRepository
    ) { }

    execute(id: string): Recipe {
        const recipe = this.recipeRepo.getById(id);
        if (!recipe) throw new NotFoundException(`Recipe with id ${id} not found`);
        return recipe
    }
}