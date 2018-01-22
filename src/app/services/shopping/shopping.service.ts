import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ShoppingModel } from '../../model/shopping-model';
import { Observable } from 'rxjs/Observable';
import { DataService } from '../data.service';
import { IngredientModel } from '../../model/ingredient-model';

@Injectable()
export class ShoppingService {
  private bhShopping:BehaviorSubject<ShoppingModel[]>;
  shoppingList:Observable<ShoppingModel[]>;
  constructor(private ingredientService:DataService) { 
    this.bhShopping=new BehaviorSubject<ShoppingModel[]>([]);
    
    let newShopping:ShoppingModel=new ShoppingModel(this.ingredientService);
    newShopping.setIngredientID(1);
    newShopping.quantity=10;
    newShopping.isImportant=true;
    this.bhShopping.next([...this.bhShopping.value,newShopping]);

    newShopping=new ShoppingModel(this.ingredientService);
    newShopping.setIngredientID(2);
    newShopping.quantity=100;
    newShopping.isImportant=false;
    this.bhShopping.next([...this.bhShopping.value,newShopping]);

    this.shoppingList=this.bhShopping.asObservable();
  }

  sortList(arr:ShoppingModel[]){
    if(!arr || arr.length<=0)
      return [];
    return arr.sort((a,b) => {
      if(a.isImportant<b.isImportant)
        return 1;
      else if(a.isImportant>b.isImportant)
        return -1;
      else if(a.quantity<b.quantity)
        return -1;
      else if(a.quantity>b.quantity)
        return 1;
      return 0; 
    });
  }

  changeShoppingImportantLevel(index:number){
    if(index<0 || !this.bhShopping.value[index])
      return;
    let arr=[...this.bhShopping.value];
    arr[index].isImportant=!arr[index].isImportant;
    this.bhShopping.next(this.sortList([...arr]));
  }

  getShoppingList(index:number):ShoppingModel{
    if(!this.bhShopping.value[index])
      return null;
    return this.bhShopping.value[index];
  }

  addShoppingList(obj:ShoppingModel){
    if(!obj)
      return;
    this.bhShopping.next(this.sortList([...this.bhShopping.value,obj]));
  }

  editShoppingList(index:number,obj:ShoppingModel){
    if(!index || !obj || !this.bhShopping.value[index])
      return;
    let arr=[...this.bhShopping.value];
    
    if(arr[index].ingredientID!==obj.ingredientID)
      arr[index].setIngredientID(obj.ingredientID);
    
    arr[index].quantity=obj.quantity;
    arr[index].isImportant=obj.isImportant;
    this.bhShopping.next(this.sortList([...arr]));
  }

  deleteShoppingList(index:number){
    if(!this.bhShopping.value[index])
      return;
    let arr=[...this.bhShopping.value];
    arr.splice(index,1);
    this.bhShopping.next(this.sortList([...arr]));
  }
}
