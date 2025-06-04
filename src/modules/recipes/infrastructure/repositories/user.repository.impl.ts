import { Injectable } from '@nestjs/common';
import { RecipeRepository } from '../../domain/repositories/recipe.repository';
import { Recipe } from '../../domain/entities/recipe.entity';
import { HttpCode } from '@nestjs/common';

@Injectable()
export class RecipeRepositoryImpl implements RecipeRepository {
    private recipes: Recipe[] = [];

    @HttpCode(201)
    create(recipe: Recipe): void {
        this.recipes.push(recipe);
    }

    listAll(): Recipe[] {
        return this.recipes;
    }

    getById(id: string): Recipe | null {
        const recipe = this.recipes.find((r) => r.id === id);
        if (!recipe) return null;
        return recipe;
    }

    findByTitle(title: string): Recipe | null {
        const recipe = this.recipes.find((r) => r.title === title);
        if (!recipe) return null;
        return recipe;
    }
}