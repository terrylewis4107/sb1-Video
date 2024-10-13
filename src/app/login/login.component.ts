import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from '../services/auth.service'

@Component({
  selector: 'ns-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = ''
  password: string = ''

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.username, this.password).subscribe(
      (isAuthorized) => {
        if (isAuthorized) {
          this.router.navigate(['/conference'])
        } else {
          alert('Login failed. Please check your credentials.')
        }
      },
      (error) => {
        console.error('Login error:', error)
        alert('An error occurred during login. Please try again.')
      }
    )
  }
}