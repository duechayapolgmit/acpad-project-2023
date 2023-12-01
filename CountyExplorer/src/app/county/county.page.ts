import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-county',
  templateUrl: './county.page.html',
  styleUrls: ['./county.page.scss'],
})
export class CountyPage implements OnInit {

  county: County = new County("Galway", "assets/temp/Galway.jpg", 57.3, 79934);
  

  constructor() { }

  ngOnInit() {
    this.county.setDescription("Second largest county in Ireland, full of mountains, located near the pier.");
  }

}

class County {

  description: string = "Empty description.";

  constructor(public name: string, 
    public picture: string, 
    public area: number, 
    public population: number){
  }

  setDescription(desc: string){
    this.description = desc;
  }

}