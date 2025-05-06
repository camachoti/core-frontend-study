import { Component } from '@angular/core';
import { DefaultLoginLayoutComponent } from '../default-login-layout/default-login-layout.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryInputComponent } from '../primary-input/primary-input.component';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TranslateService} from '@ngx-translate/core';
//import { ToastrService } from 'ngx-toastr';

interface LoginForm {
  username: FormControl,
  password: FormControl
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    DefaultLoginLayoutComponent,
    ReactiveFormsModule,
    PrimaryInputComponent
  ],
  providers: [
    LoginService
  ],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  loginForm!: FormGroup<LoginForm>;

  constructor(
    private readonly router: Router,
    private readonly loginService: LoginService,
    private readonly snackBar: MatSnackBar,
    private readonly translate: TranslateService
  ){
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }

  submit(){
    this.loginService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe({
      next: () => {
        this.openSnackBar("Login feito com sucesso!");
        this.router.navigate(['/guests']);
      },
      error: (error) => {
        const errorMessage = error.error ? error.error : "Erro inesperado! Tente novamente mais tarde";
        this.openSnackBar(errorMessage);
      }
    })
  }

  navigate(){
    this.router.navigate(["signup"])
  }

  openSnackBar(message: string) {
    this.translate.get('close').subscribe((res: string) => {
      this.snackBar.open(message, res, {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });
    });
  }
}
