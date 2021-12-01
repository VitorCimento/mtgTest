import { MaterialModule } from './material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class IconModule {
  private path: string = '../../assets';

  constructor(
    private domSanitizer: DomSanitizer,
    public matIconRegistry: MatIconRegistry
  ) {
    this.matIconRegistry
      .addSvgIcon('B' , this.setPath(`${this.path}/B.svg` ) )
      .addSvgIcon('BG', this.setPath(`${this.path}/BG.svg`) )
      .addSvgIcon('BR', this.setPath(`${this.path}/BR.svg`) )
      .addSvgIcon('G' , this.setPath(`${this.path}/G.svg` ) )
      .addSvgIcon('GU', this.setPath(`${this.path}/GU.svg`) )
      .addSvgIcon('GW', this.setPath(`${this.path}/GW.svg`) )
      .addSvgIcon('R' , this.setPath(`${this.path}/R.svg` ) )
      .addSvgIcon('RG', this.setPath(`${this.path}/RG.svg`) )
      .addSvgIcon('RW', this.setPath(`${this.path}/RW.svg`) )
      .addSvgIcon('U' , this.setPath(`${this.path}/U.svg` ) )
      .addSvgIcon('UB', this.setPath(`${this.path}/UB.svg`) )
      .addSvgIcon('UR', this.setPath(`${this.path}/UR.svg`) )
      .addSvgIcon('W' , this.setPath(`${this.path}/W.svg` ) )
      .addSvgIcon('WB', this.setPath(`${this.path}/WB.svg`) )
      .addSvgIcon('WU', this.setPath(`${this.path}/WU.svg`) );
  }

  private setPath(url: string): SafeResourceUrl {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
