import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './components/input/input/input.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from './components/button/button/button.component';

const modules = [IonicModule, ReactiveFormsModule, FormsModule]
const components = [InputComponent, ButtonComponent]

@NgModule({
  declarations: [...components],
  providers: [Storage],
  imports: [
    CommonModule, 
    IonicModule, 
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [...modules, ...components],
 
})
export class SharedModule { }
