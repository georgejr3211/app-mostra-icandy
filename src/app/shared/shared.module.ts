import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsComponent } from './components/tabs/tabs.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [TabsComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [TabsComponent]
})
export class SharedModule { }
