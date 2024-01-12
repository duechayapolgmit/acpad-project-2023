import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
// Search page with all counties
export class SearchPage implements OnInit {

  counties: any[] = [];
  filteredCounties: any[] = [];

  constructor(private database: DatabaseService, private router: Router, private storage: StorageService) { }

  ngOnInit() {
    // Get counties
    this.database.getCounties().subscribe(counties => {
      this.counties = counties
      
      // Attach images to counties
      let newCounties : any[] = [];
      this.counties.forEach(county => {
        this.storage.getImage(county.name).then( (res) => { 
          let urlCreator = window.URL || window.webkitURL;
          let imageUrl = urlCreator.createObjectURL(res);
          county.imageURL = imageUrl;
          newCounties.push(county)});

      this.counties = newCounties;
      this.filteredCounties = this.counties;
      })
    });
  }

  // Filter counties based on query
  filterCounties(event: any) {
    const query = event.target.value.toLowerCase();
    this.filteredCounties = this.counties.filter(county => county.name.toLowerCase().indexOf(query) > -1)
  }
  
  // Go to desired county via "More Info"
  goCounty(countyName: string){
    this.router.navigate(["/county", countyName.toLowerCase()])
  }

}
