import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeBookComponent } from './recipe-book/recipe-book.component';
import { HomeComponent } from './home/home.component';
import { IngredientListComponent } from './ingredient-list/ingredient-list.component';
import { IngredientEditComponent } from './ingredient-list/ingredient-edit/ingredient-edit.component';
import { ShoppingListEditComponent } from './shopping-list/shopping-list-edit/shopping-list-edit.component';

const routes: Routes = [
  {
    path:'',
    component:HomeComponent
  },
  {
    path:'shoppinglist',
    component:ShoppingListComponent
  },
  {
    path:'shoppinglist/add',
    component:ShoppingListEditComponent
  },
  {
    path:'shoppinglist/edit/:id',
    component:ShoppingListEditComponent
  },
  {
    path:'recipebook',
    component:RecipeBookComponent
  },
  {
    path:'ingredients',
    component:IngredientListComponent
  },
  {
    path:'ingredients/edit/:id',
    component:IngredientEditComponent
  },
  {
    path:'ingredients/add',
    component:IngredientEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
