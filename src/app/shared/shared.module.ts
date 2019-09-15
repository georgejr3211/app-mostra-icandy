import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsComponent } from './components/tabs/tabs.component';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ToolbarComponent } from './components/toolbar/toolbar.component';

@NgModule({
  declarations: [TabsComponent, ToolbarComponent],
  imports: [
    CommonModule,
    IonicModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  exports: [TabsComponent, ToolbarComponent, ReactiveFormsModule]
})
export class SharedModule { }
