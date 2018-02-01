import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingListEditComponent } from './shopping-list/shopping-list-edit/shopping-list-edit.component';
import { RecipeBookComponent } from './recipe-book/recipe-book.component';
import { HomeComponent } from './home/home.component';
import { IngredientListComponent } from './ingredient-list/ingredient-list.component';
import { IngredientEditComponent } from './ingredient-list/ingredient-edit/ingredient-edit.component';
import { DataService } from './services/data.service';
import { ShoppingService } from './services/shopping/shopping.service';
import { ShoppingListDetailComponent } from './shopping-list/shopping-list-detail/shopping-list-detail.component'


@NgModule({
  declarations: [
    AppComponent,
    ShoppingListComponent,
    ShoppingListEditComponent,
    RecipeBookComponent,
    HomeComponent,
    IngredientListComponent,
    IngredientEditComponent,
    ShoppingListDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    DataService,
    ShoppingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
