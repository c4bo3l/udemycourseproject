import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { IngredientModel } from '../model/ingredient-model';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DataService {

  private bhIngredients:BehaviorSubject<IngredientModel[]>;
  ingredients:Observable<IngredientModel[]>;
  constructor() { 
    this.bhIngredients=new BehaviorSubject<IngredientModel[]>(this.sortIngredients([
      {
        id:1,
        name:'Flour',
        uom:'cup'
      },
      {
        id:2,
        name:'Salt',
        uom:'teaspoon'
      },
      {
        id:3,
        name:'Baking Powder',
        uom:'teaspoon'
      },
      {
        id:4,
        name:'Butter',
        uom:'cup'
      },
      {
        id:5,
        name:'Sugar',
        uom:'cup'
      },
      {
        id:6,
        name:'Egg',
        uom:''
      },
      {
        id:7,
        name:'Milk',
        uom:'cup'
      },
      {
        id:8,
        name:'Vanilla Essence',
        uom:'teaspoon'
      }
    ]));
    this.ingredients=this.bhIngredients.asObservable();
  }

  getIngredient(id:number):IngredientModel{
    if(!id)
      return new IngredientModel();
    let retValue:IngredientModel=this.bhIngredients.value.find(s => {
      return s.id === id;
    });
    return !retValue ? new IngredientModel() : retValue;
  }

  editIngredient(id:number,editedObj:IngredientModel){
    if(!editedObj)
      return;
    else if(!id){
      editedObj.id=this.bhIngredients.value.length+1;
      this.bhIngredients.next([...this.bhIngredients.value,editedObj]);
      return;
    }

    let existed:IngredientModel=this.getIngredient(id);
    if(!existed)
      return;
    existed.name=editedObj.name;
    existed.uom=editedObj.uom;
    this.bhIngredients.next(this.sortIngredients([...this.bhIngredients.value]));
  }

  deleteIngredient(id:number){
    if(!id)
      return;
    let editedArr:IngredientModel[]=[...this.bhIngredients.value];
    editedArr.splice(this.bhIngredients.value.findIndex((s) => {
      return s.id===id;
    }), 1);
    this.bhIngredients.next(this.sortIngredients(editedArr));
  }

  sortIngredients(arr:IngredientModel[]):IngredientModel[]{
    if(!arr || arr.length<=0)
      return [];
    return arr.sort((a,b) => {
      if(a.name<b.name)
        return -1;
      else if(a.name>b.name)
        return 1;
      else if(a.uom<b.uom)
        return -1;
      else if(a.uom>b.uom)
        return 1;
      return 0;
    });
  }

}
