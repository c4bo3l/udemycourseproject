import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShoppingService } from '../../services/shopping/shopping.service';
import { DataService } from '../../services/data.service';
import { ShoppingModel } from '../../model/shopping-model';
import { IngredientModel } from '../../model/ingredient-model';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.scss']
})
export class ShoppingListEditComponent implements OnInit {
  model:ShoppingModel;
  shoppingIndex:number;
  ingredients:IngredientModel[];

  constructor(private acRoute:ActivatedRoute, 
    private router:Router, 
    private service:ShoppingService,
    private ingredientService:DataService) { }

  ngOnInit() {
    this.shoppingIndex=-1;
    this.acRoute.params.subscribe(resp => {
      this.shoppingIndex=resp.id;
      this.model=this.service.getShoppingList(this.shoppingIndex);
      if((!this.shoppingIndex || this.shoppingIndex<0) && !this.model)
        this.model=new ShoppingModel(this.ingredientService);
    });
    
    this.ingredientService.ingredients.subscribe(resp => {
      this.ingredients=[...resp];
    });

    if(this.shoppingIndex && this.shoppingIndex>=0 && !this.model)
      this.onCancel();
  }

  onSelectedIngredientChange(evt:Event){
    this.model.setIngredientID(parseInt((<HTMLSelectElement>evt.target).value));
  }

  onSave(){
    if(!this.shoppingIndex || this.shoppingIndex<0)
      this.service.addShoppingList(this.model);
    else
      this.service.editShoppingList(this.shoppingIndex,this.model);
    this.onCancel();
  }

  changeImportantLevel(){
    this.model.isImportant=!this.model.isImportant;
  }

  onCancel(){
    this.router.navigate(['shoppinglist']);
  }

}
