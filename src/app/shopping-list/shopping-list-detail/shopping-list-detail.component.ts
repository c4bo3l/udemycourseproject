import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { ShoppingModel } from '../../model/shopping-model';

@Component({
  selector: 'app-shopping-list-detail',
  templateUrl: './shopping-list-detail.component.html',
  styleUrls: ['./shopping-list-detail.component.scss']
})
export class ShoppingListDetailComponent implements OnInit {
  @Input() shopping: ShoppingModel;

  @Output() changeImportant: EventEmitter<number>;
  @Output() edit: EventEmitter<number>;
  @Output() delete: EventEmitter<number>;

  constructor() { 
    this.changeImportant=new EventEmitter<number>();
    this.edit=new EventEmitter<number>();
    this.delete=new EventEmitter<number>();
  }

  ngOnInit() {
    
  }

  changeImportantLevel(){
    this.changeImportant.emit(this.shopping.shoppingID);
  }

  editShoppingList(){
    this.edit.emit(this.shopping.shoppingID);
  }

  deleteShoppingList(){
    this.delete.emit(this.shopping.shoppingID);
  }

}
