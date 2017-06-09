import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import {
 GoogleMaps,
 GoogleMap,
 GoogleMapsEvent,
 LatLng,
 CameraPosition,
 MarkerOptions,
 Marker
} from '@ionic-native/google-maps';

/**
 * Generated class for the MapPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

 declare var plugin: any;
 declare var cordova: any;

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  position: LatLng;
  @ViewChild('map') mapContainer: ElementRef;
  map: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private googleMaps: GoogleMaps,
    private platform: Platform
  ) {
    this.position = new LatLng(navParams.data.position.latitude, navParams.data.position.longitude);
  }

  ionViewDidEnter() {
    this.platform.ready().then(() => {
      this.loadMap();
    });
  }

  loadMap() {
    this.map = this.googleMaps.create(this.mapContainer.nativeElement, {
          'backgroundColor': 'white',
          'controls': {
            'compass': true,
            'myLocationButton': true,
            'indoorPicker': true,
            'zoom': true
          },
          'gestures': {
            'scroll': true,
            'tilt': true,
            'rotate': true,
            'zoom': true
          },
          'camera': {
            'latLng': this.position,
            'tilt': 30,
            'zoom': 15,
            'bearing': 50
          }
        });

    //set clickable
    this.map.setCenter(this.position);
    this.map.setClickable(true);
    // clean the map every time you enter the view
    this.map.clear();

    this.map.one(GoogleMapsEvent.MAP_READY).then(
       () => {
         let markerOptions: MarkerOptions = {
           position: this.position
         };

         this.map.addMarker(markerOptions).then((marker: Marker) => {
              console.log('with mark');
          });
       }
     );
  }

  onMapInit() {
    console.log('map init');
  }

}
