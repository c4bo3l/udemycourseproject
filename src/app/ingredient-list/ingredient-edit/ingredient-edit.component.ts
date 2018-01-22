import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { IngredientModel } from '../../model/ingredient-model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ingredient-edit',
  templateUrl: './ingredient-edit.component.html',
  styleUrls: ['./ingredient-edit.component.scss']
})
export class IngredientEditComponent implements OnInit {
  obj:IngredientModel;
  namePlaceholder:string;
  uomPlaceholder:string;
  nameLabel:string;
  uomLabel:string;

  constructor(private service:DataService, private acRoute:ActivatedRoute, private router:Router) { }

  ngOnInit() {
    this.acRoute.params.subscribe(resp => {
      this.obj=this.service.getIngredient(parseInt(resp.id));
    });
    this.namePlaceholder="Ingredient's Name";
    this.uomPlaceholder="Ingredient's UOM";
    this.nameLabel="Name";
    this.uomLabel="Unit of Measure";
  }

  onSave(){
    this.service.editIngredient(this.obj.id,this.obj);
    this.onCancel();
  }

  onCancel(){
    this.router.navigate(["ingredients"]);
  }
}
