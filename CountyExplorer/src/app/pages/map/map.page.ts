import { Component, OnInit } from '@angular/core';
import { GoogleMap, Marker} from '@capacitor/google-maps';
import { Geolocation } from '@capacitor/geolocation';
import { environment } from 'src/environments/environment';
import { Capacitor } from '@capacitor/core';
import { County, DatabaseService } from '../../services/database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
// Map page of the map of counties in Ireland
export class MapPage implements OnInit {

  latitude: number = 0;
  longitude: number = 0;
  apiKey: any = "AIzaSyAhTAuXMnhhQqnPLomru0Z16d1vKRgkrdk"

  constructor(private database: DatabaseService, private router: Router) { }

  async ngOnInit() {
    // Get current coordinates
    const currentLocation = await Geolocation.getCurrentPosition();
    this.latitude = currentLocation.coords.latitude;
    this.longitude = currentLocation.coords.longitude;

    // Create map
    const mapRef = document.getElementById('map') as HTMLElement;
    const newMap = await GoogleMap.create({
      id: 'my-map', // Unique identifier for this map instance
      element: mapRef, // reference to the capacitor-google-map element
      apiKey: this.apiKey, // Your Google Maps API Key
      config: {
        center: {
          // The initial position to be rendered by the map
          lat: this.latitude,
          lng: this.longitude,
        },
        zoom: 8, // The initial zoom level to be rendered by the map
      },
    });

    // Add markers
    this.database.getCounties().subscribe( value => {
      value.forEach(county => {
        newMap.addMarker({
          title: county.name,
          coordinate: {
            lat: county.position.latitude,
            lng: county.position.longitude
          }
        })
      })
    }
    );

    // Add marker interactions
    newMap.setOnMarkerClickListener(event => {
      this.router.navigate(["/county", event.title.toLowerCase()])
    })
    
  }

}



