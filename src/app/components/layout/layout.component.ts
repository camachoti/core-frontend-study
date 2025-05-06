import { Component } from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';
import {MatIcon} from '@angular/material/icon';
import {NgIf} from '@angular/common';
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from '@angular/material/sidenav';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {MatDivider} from '@angular/material/divider';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {FooterComponent} from '../../footer/footer.component';
import {MatButton, MatIconButton} from '@angular/material/button';
import {LoginService} from '../../services/login.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatToolbar,
    MatIcon,
    NgIf,
    MatSidenavContainer,
    MatSidenav,
    MatSidenavContent,
    TranslatePipe,
    MatDivider,
    RouterOutlet,
    FooterComponent,
    MatButton,
    RouterLink,
    MatIconButton
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

  constructor(
    private readonly router: Router,
    private readonly snackBar: MatSnackBar,
    private readonly loginService: LoginService,
    private readonly translate: TranslateService) { }

  logout() {
    this.loginService.logout();
    this.openSnackBar("Logout feito com sucesso!");
    this.router.navigate(['/']);
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
