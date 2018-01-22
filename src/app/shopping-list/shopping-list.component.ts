import { Component, OnInit } from '@angular/core';
import { ShoppingService } from '../services/shopping/shopping.service';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import { ShoppingModel } from '../model/shopping-model';
import { IngredientModel } from '../model/ingredient-model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {
  title:string;
  shoppingList:ShoppingModel[];
  ingredientList:IngredientModel[];

  constructor(private shoppingService:ShoppingService, 
    private ingredientService:DataService,
    private router:Router) { }

  ngOnInit() {
    this.title="Shopping List";
    
    this.shoppingService.shoppingList.subscribe(resp => {
      this.shoppingList=[...resp];
    });

    this.ingredientService.ingredients.subscribe(resp => {
      this.ingredientList=[...resp];
    });
  }

  changeShoppingImportantLevel(index:number){
    this.shoppingService.changeShoppingImportantLevel(index);
  }

  addShopingList(){
    this.router.navigate(['shoppinglist/add']);
  }

  editShoppingList(index:number){
    this.router.navigate(['shoppinglist/edit/' + index]);
  }

  deleteShoppingList(index:number){
    this.shoppingService.deleteShoppingList(index);
  }

}
