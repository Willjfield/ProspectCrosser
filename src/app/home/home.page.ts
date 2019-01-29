import { 
  Component, 
  ElementRef, 
  QueryList, 
  ViewChild, 
  ViewChildren 
} from '@angular/core';

import { Flashlight } from '@ionic-native/flashlight/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  @ViewChild('nolight') h1; 
  @ViewChild('turnonbtn') turnonbtn; 
  @ViewChild('strobefreq') strobefreq; 
  @ViewChild('flash') flash; 

  private strobing;
  private strobe;
  private strobeFreq;
  private screenColors;
  private currentScreenColor;

  ngAfterViewInit() {
    console.log(this.strobefreq.nativeElement);

    this.flashlight.available()
    .catch(
      error=>{
        this.h1.nativeElement.innerHTML = "No Flashlight Available";
        //this.turnonbtn.nativeElement.remove();
      })
  }


	constructor(private flashlight: Flashlight, myElement: ElementRef) {
    this.strobing = false;
    this.strobeFreq = 100;
    this.screenColors = ["red","black","blue","black","yellow","black"]
    this.currentScreenColor = 0;
  }

  RangeChange(event){
    var inst = this;
    inst.strobeFreq = (Math.sqrt(event.detail.value)*40)+100;
    console.log(inst.strobeFreq);
  }

  OnBlur(event){
    var inst = this;
    clearInterval(inst.strobe);

    this.flashlight.available()
    .then(
      data=>{
        if(inst.strobing){
          inst.strobe = setInterval(function(){
            inst.flashlight.toggle();
            inst.flash.nativeElement.style.backgroundColor = inst.screenColors[inst.currentScreenColor];
            inst.currentScreenColor = (inst.currentScreenColor+1)%inst.screenColors.length;
          }, inst.strobeFreq)
        }else{
          inst.flashlight.switchOff();
          inst.flash.nativeElement.style.backgroundColor = "white";
        }
      }
    )
    .catch(
      error=>{
        console.log("error!");
      }
    )
  }

  StrobeLight(){
    var inst = this;

    this.flashlight.available()
    .then(
      data=>{
        if(!inst.strobing){
            inst.strobing = true;
            inst.strobe = setInterval(function(){
              inst.flashlight.toggle();
              inst.flash.nativeElement.style.backgroundColor = inst.screenColors[inst.currentScreenColor];
              inst.currentScreenColor = (inst.currentScreenColor+1)%inst.screenColors.length;
          }, inst.strobeFreq)
        }else{
          inst.strobing = false;
          clearInterval(inst.strobe);
          inst.flashlight.switchOff();
          inst.flash.nativeElement.style.backgroundColor = "white";
        }
      }
    )
    .catch(
      error=>{
        console.log("error!");
      }
    )
  }


	/*
  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Albums',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          console.log('Delete clicked');
        }
      }, {
        text: 'Share',
        icon: 'share',
        handler: () => {
          console.log('Share clicked');
        }
      }, {
        text: 'Play (open modal)',
        icon: 'arrow-dropright-circle',
        handler: () => {
          console.log('Play clicked');
        }
      }, {
        text: 'Favorite',
        icon: 'heart',
        handler: () => {
          console.log('Favorite clicked');
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }*/
}
