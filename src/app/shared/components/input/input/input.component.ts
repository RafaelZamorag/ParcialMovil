import { Component, Input, input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  standalone: false,
})
export class InputComponent  implements OnInit {
 @Input() type: String = '';
 @Input() label: String = '';
 @Input() placeholder: String = '';
 @Input() control: FormControl = new FormControl();

  constructor() {}

  ngOnInit() {}


public onType(event: any){
  this.control.setValue(event.target.value);
}

}
