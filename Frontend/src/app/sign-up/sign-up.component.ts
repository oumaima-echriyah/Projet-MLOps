import { AfterViewInit, Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { trigger, style, animate, transition,keyframes } from '@angular/animations';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SignupService } from "../services/signup.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  animations: [
    trigger('slideInDiagonal', [
      transition(':enter', [
        animate('1s ease-in-out', keyframes([
          style({ transform: 'translate(-10%, -10%)',opacity: 0, offset: 0 }),
          style({ transform: 'translate(0, 0)', opacity: 1,offset: 1 })
        ]))
      ])
    ])
  ]
})
export class SignUpComponent implements AfterViewInit ,OnInit{
  ngOnInit(): void {
    initFlowbite();


  }


  signupForm: FormGroup;

  constructor(private fb: FormBuilder,private SignupService:SignupService) {
    this.signupForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      password: [''],
    });
  }

  onSubmit(): void {
    const formData = this.signupForm.value;
    this.SignupService.createUser(formData).subscribe(
      response => {
        console.log('User created successfully', response);
        this.signupForm.reset();
      },
      error => {
        console.error('Error creating user', error);
      }
    );
  }
  ngAfterViewInit() {
    const firstNameInput = document.getElementById('first-name') as HTMLInputElement;
    firstNameInput.addEventListener('input', () => {
      if (firstNameInput.value.trim() !== '') {
        firstNameInput.classList.add('input-with-content');
      } else {
        firstNameInput.classList.remove('input-with-content');
      }
    });


    const lastname = document.getElementById('last-name') as HTMLInputElement;
    lastname.addEventListener('input', () => {
      if (lastname.value.trim() !== '') {
        lastname.classList.add('input-with-content');
      } else {
        lastname.classList.remove('input-with-content');
      }
    });

    const email = document.getElementById('email') as HTMLInputElement;
    email.addEventListener('input', () => {
      if (email.value.trim() !== '') {
        email.classList.add('input-with-content');
      } else {
        email.classList.remove('input-with-content');
      }
    });

    const pass = document.getElementById('pass') as HTMLInputElement;
    pass.addEventListener('input', () => {
      if (pass.value.trim() !== '') {
        pass.classList.add('input-with-content');
      } else {
        pass.classList.remove('input-with-content');
      }
    });
  }

}
