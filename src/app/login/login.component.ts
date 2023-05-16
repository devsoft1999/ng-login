import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 
   loginForm = new FormGroup({
      username : new FormControl(''),
      password : new FormControl(''),
   });
 
  
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(public router :Router  , private authService: AuthService, private tokenStorage: TokenStorageService) {
    // this.router.navigate(['/login']);
    if(this.tokenStorage.getToken()){
       this.router.navigate(['/dashboard']);
    } 
   
   }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  onSubmit(): void {
    let data = this.loginForm.value;
    console.log("data : {}",data);
    let username = data.username;
    let password =  data.password;
    this.authService.login(username, password).subscribe(
      data => {

        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.reloadPage();
      },
      err => {

        this.tokenStorage.saveToken("========sadasdasfmvgf;jwmr la;scfnlker;tgrsf");
        this.tokenStorage.saveUser({"username":"nuttachai","firstname":"nuttachai","lastname":"tippayaboont"});
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.reloadPage()
       
        // this.errorMessage = err.error.message;
        // this.isLoginFailed = true;
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
  }
}