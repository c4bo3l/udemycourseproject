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
    newShopping.shoppingID=1;
    newShopping.setIngredientID(1);
    newShopping.quantity=10;
    newShopping.isImportant=true;
    this.bhShopping.next([...this.bhShopping.value,newShopping]);

    newShopping=new ShoppingModel(this.ingredientService);
    newShopping.shoppingID=2;
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
    if(index<0 || !this.bhShopping.value.find(b => b.shoppingID===index))
      return;
    let idx=this.bhShopping.value.findIndex(b => b.shoppingID==index);
    this.bhShopping.value[idx].isImportant = !this.bhShopping.value[idx].isImportant;
    this.bhShopping.next(this.sortList([...this.bhShopping.value]));
  }

  getShoppingList(index:number):ShoppingModel{
    let idx:number=this.bhShopping.value.findIndex(b => b.shoppingID==index);
    if(idx<0)
      return null;
    return this.bhShopping.value[idx];
  }

  addShoppingList(obj:ShoppingModel){
    if(!obj)
      return;
    obj.shoppingID=this.bhShopping.value.length+1;
    this.bhShopping.next(this.sortList([...this.bhShopping.value,obj]));
  }

  editShoppingList(obj:ShoppingModel){
    if(!obj || !this.bhShopping.value.find(b => b.shoppingID===obj.shoppingID))
      return;
    let shoppingIndex=this.bhShopping.value.findIndex(b => b.shoppingID===obj.shoppingID);
    
    if(this.bhShopping.value[shoppingIndex].ingredientID!==obj.ingredientID)
    this.bhShopping.value[shoppingIndex].setIngredientID(obj.ingredientID);
    
    this.bhShopping.value[shoppingIndex].quantity=obj.quantity;
    this.bhShopping.value[shoppingIndex].isImportant=obj.isImportant;
    this.bhShopping.next(this.sortList([...this.bhShopping.value]));
  }

  deleteShoppingList(index:number){
    let idx:number=this.bhShopping.value.findIndex(b => b.shoppingID==index);
    if(idx<0)
      return;
    let arr=[...this.bhShopping.value];
    if(arr.length<=1)
      this.bhShopping.next([]);
    else{
      arr.splice(idx,1);
      this.bhShopping.next(this.sortList([...arr]));
    }
  }
}
