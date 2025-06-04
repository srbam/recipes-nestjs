import { Module } from '@nestjs/common';
import { RecipeController } from './interface/controllers/recipe.controller';
import { CreateRecipeUseCase } from './application/use-cases/create-recipe.use-case';
import { RecipeRepositoryImpl } from './infrastructure/repositories/user.repository.impl';
import { RecipeRepository } from './domain/repositories/recipe.repository';
import { ListAllRecipes } from './application/use-cases/list-all-recipes.use-case';
import { GetRecipeByIdUseCase } from './application/use-cases/get-recipe-by-id.use-case';

@Module({
  imports: [],
  controllers: [RecipeController],
  providers: [
    CreateRecipeUseCase,
    ListAllRecipes,
    GetRecipeByIdUseCase,
    {
      provide: RecipeRepository,
      useClass: RecipeRepositoryImpl,
    },
  ],
  exports: [CreateRecipeUseCase]
})
export class RecipeModule { }