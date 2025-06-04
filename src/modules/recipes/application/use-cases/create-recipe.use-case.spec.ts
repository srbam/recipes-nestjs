import { CreateRecipeUseCase } from './create-recipe.use-case';
import { RecipeRepositoryImpl } from '../../infrastructure/repositories/user.repository.impl';
import { Recipe } from '../../domain/entities/recipe.entity';
import { v4 as uuidv4 } from 'uuid';

describe('Create recipe', () => {
    let useCase: CreateRecipeUseCase;
    let recipeRepo: RecipeRepositoryImpl;

    beforeEach(() => {
        recipeRepo = new RecipeRepositoryImpl();
        useCase = new CreateRecipeUseCase(recipeRepo);
    });

    it('should create a recipe successfully', () => {
        const recipeJson = {
            title: 'Bolo de cenoura',
            description: 'Um bolo de cenoura',
            ingredients: ['Cenoura', 'Trigo', 'Ovo']
        };

        const recipe = useCase.execute(
            recipeJson.title,
            recipeJson.description,
            recipeJson.ingredients
        );

        expect(recipe.id).toBeDefined();
        expect(recipe.title).toBe(recipeJson.title);
        expect(recipe.description).toBe(recipeJson.description);
        expect(recipe.ingredients).toEqual(recipeJson.ingredients);
        expect(recipe.createdAt).toBeInstanceOf(Date);
        expect(recipe.updatedAt).toBeInstanceOf(Date);
    });

    it('should not create a recipe if title already exists', () => {
        const recipeJson = {
            title: 'Bolo de cenoura',
            description: 'Um bolo de cenoura',
            ingredients: ['Cenoura', 'Trigo', 'Ovo']
        };

        const existingRecipe = new Recipe(
            uuidv4(),
            recipeJson.title,
            recipeJson.description,
            recipeJson.ingredients,
            new Date(),
            new Date()
        );
        recipeRepo.create(existingRecipe);

        expect(() =>
            useCase.execute(recipeJson.title, recipeJson.description, recipeJson.ingredients)
        ).toThrow('Recipe already exists');

        expect(recipeRepo.listAll().length).toBe(1);
        expect(recipeRepo.listAll()[0].id).toBe(existingRecipe.id);
    });
});