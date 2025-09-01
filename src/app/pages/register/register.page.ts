import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppStorage } from 'src/app/shared/services/storage/storage';


interface Iuser {
  Name: string;
  LastName: string;
  Email: string;
  Password: string;
  
}

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage implements OnInit {
  public Name!: FormControl;
  public LastName!: FormControl;
  //public Country!: FormControl;
  public Email!: FormControl;
  public Password!: FormControl;
  public ConfirmPassword!: FormControl;
  public registerForm!: FormGroup;

  constructor(private readonly storageService: AppStorage) {
    this.initForm();
   }

  ngOnInit() {
  }

  public doRegister(){
    console.log(this.registerForm.value);
    let users = this.storageService.get<Iuser[]>('users');
    if(!users){
      users = [];
    }

    const exists = users.find(user => user.Email === this.Email.value);
    if(exists) throw new Error('Correo ya existente');

    users.push(this.registerForm.value);

    this.storageService.set('users', this.registerForm.value);
    this.registerForm.reset();
  }

  private initForm(){
    this.Name = new FormControl('', [Validators.required]);
    this.LastName = new FormControl('', [Validators.required]);
    //this.Country = new FormControl('', [Validators.required]);
    this.Email = new FormControl('', [Validators.required,Validators.email]);
    this.Password = new FormControl('', [Validators.required]);
    this.ConfirmPassword = new FormControl('', [Validators.required]);


    this.registerForm = new FormGroup({
      Name: this.Name,
      LastName: this.LastName,
      //Country: this.Country,
      Email: this.Email,
      Password: this.Password,
      ConfirmPassword: this.ConfirmPassword
      
    });

  }

}
