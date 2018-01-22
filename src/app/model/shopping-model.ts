import { IngredientModel } from './ingredient-model';
import { DataService } from '../services/data.service';

export class ShoppingModel{
    ingredientID:number;
    quantity:number;
    isImportant:boolean;

    ingredient:IngredientModel;

    constructor(private ingredientService:DataService){
        this.isImportant=false;
        this.quantity=0;
        this.ingredientID=-1;
    }

    setIngredientID(id:number){
        this.ingredientID=id;
        this.ingredient=this.ingredientService.getIngredient(this.ingredientID);
    }
}