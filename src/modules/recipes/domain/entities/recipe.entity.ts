export class Recipe {
  constructor(
    public readonly id: string,
    public title: string,
    public description: string,
    public ingredients: string[],
    public createdAt: Date,
    public updatedAt: Date
  ) { }
}