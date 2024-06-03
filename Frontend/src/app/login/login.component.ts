import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupService } from "../services/signup.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  @ViewChild('popupContainer') popupContainerRef!: ElementRef;
  loginForm: FormGroup ; // Declare loginForm as FormGroup

  ngAfterViewInit() {
    this.showPopup();
  }


  showPopup() {
    const popupContainer = this.popupContainerRef.nativeElement as HTMLElement;
    popupContainer.style.display = "flex";
    setTimeout(() => {
      popupContainer.style.opacity = "1";
    }, 50);
  }
  hidePopup() {
    const popupContainer = this.popupContainerRef.nativeElement as HTMLElement;
    popupContainer.style.opacity = "0";
    setTimeout(() => {
      popupContainer.style.display = "none";
    }, 300);
  }
  private signUpButton: HTMLElement | null;
  private signInButton: HTMLElement | null;
  private container: HTMLElement | null;

  constructor(private route:Router,private fb:FormBuilder,private SignupService:SignupService) {
    this.signUpButton = null;
    this.signInButton = null;
    this.container = null;
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.signUpButton = document.getElementById('signUp');
    this.signInButton = document.getElementById('signIn');
    this.container = document.getElementById('container');

    if (this.signUpButton && this.signInButton && this.container) {
      this.signUpButton.addEventListener('click', () => {
        if (this.container!.classList) {
          this.container!.classList.add("right-panel-active");
        }
      });

      this.signInButton.addEventListener('click', () => {
        if (this.container!.classList) {
          this.container!.classList.remove("right-panel-active");
        }
      });
  }




}
login() {
  if (this.loginForm.valid) {
    const formData = this.loginForm.value;
    this.SignupService.login(formData).subscribe(
      (response) => {
        if (response.message === 'yes') {
          // User is authenticated, navigate to the dashboard or home page
          console.log("good")
        } else {
          // Authentication failed, display an error message
          alert('Login failed. Please check your credentials and try again.');
        }
      },
      (error) => {
        console.error('An error occurred:', error);
        alert('An error occurred while logging in. Please try again later.');
      }
    );
  }
}
}
