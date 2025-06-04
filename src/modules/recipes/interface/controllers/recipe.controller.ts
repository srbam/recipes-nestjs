import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateRecipeUseCase } from '../../application/use-cases/create-recipe.use-case';
import { Recipe } from '../../domain/entities/recipe.entity';
import { CreateRecipeDto } from '../../application/dto/recipe.dto';
import { ListAllRecipes } from '../../application/use-cases/list-all-recipes.use-case';
import { GetRecipeByIdUseCase } from '../../application/use-cases/get-recipe-by-id.use-case';
import { RecipePresenter } from '../presenters/recipe.presenter';

@Controller('recipes')
export class RecipeController {
  constructor(
    private readonly createRecipeUseCase: CreateRecipeUseCase,
    private readonly ListAllRecipesUseCase: ListAllRecipes,
    private readonly getRecipeByIdUseCase: GetRecipeByIdUseCase
  ) { }

  @Post()
  createRecipe(@Body() body: CreateRecipeDto): RecipePresenter {
    const { title, description, ingredients } = body;
    const recipe = this.createRecipeUseCase.execute(title, description, ingredients)
    return RecipePresenter.toHTTP(recipe);
  }

  @Get()
  ListAllRecipes(): RecipePresenter[] {
    const recipes = this.ListAllRecipesUseCase.execute();
    return recipes.map(RecipePresenter.toHTTP);
  }

  @Get(':id')
  getRecipeById(@Param('id') id: string): RecipePresenter {
    const recipe = this.getRecipeByIdUseCase.execute(id);
    return RecipePresenter.toHTTP(recipe)
  }
}