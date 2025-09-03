import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

type InputType = 'text' | 'email' | 'password';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  standalone: false,
})
export class InputComponent implements OnInit {
  private _type: InputType = 'text';

  @Input()
  set type(val: string) {
    const v = (val || 'text').toLowerCase();
    this._type = (v === 'text' || v === 'email' || v === 'password') ? v as InputType : 'text';
  }
  get type(): InputType { return this._type; }

  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() control: FormControl = new FormControl<string>('');
  @Input() togglePassword: boolean = false;

  hasError = false;
  showPassword = false;

  ngOnInit() {}

  get computedType(): 'text' | 'email' | 'password' {
    if (this.type === 'password' && this.togglePassword) {
      return this.showPassword ? 'text' : 'password';
    }
    return this.type;
  }


  toggleVisibility() {
    if (this.type === 'password' && this.togglePassword) {
      this.showPassword = !this.showPassword;
    }
  }
}
