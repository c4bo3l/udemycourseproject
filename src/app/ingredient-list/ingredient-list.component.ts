import { Component, OnInit } from '@angular/core';
import { IngredientModel } from '../model/ingredient-model';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ingredient-list',
  templateUrl: './ingredient-list.component.html',
  styleUrls: ['./ingredient-list.component.scss']
})
export class IngredientListComponent implements OnInit {
  ingredients:Array<IngredientModel>;

  constructor(private service:DataService, private router:Router) { 
    
  }

  ngOnInit() {
    this.service.ingredients.subscribe(res => this.ingredients=[...res]);
  }

  editIngredient(id:number){
    if(id>=0)
      this.router.navigate(["ingredients/edit/" + id]);
    else
      this.router.navigate(["ingredients/add"]);
  }

  deleteIngredient(id:number){
    this.service.deleteIngredient(id);
  }

  addIngredient(){
    this.editIngredient(-1);
  }
}
