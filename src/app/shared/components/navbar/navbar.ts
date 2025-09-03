import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FlowbiteService } from './../../../core/services/flowbiteService/flowbite-service';
import { LoginService } from './../../../core/services/loginService/login-service';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {
  constructor(private _FlowbiteService: FlowbiteService, private _LoginService: LoginService) { }

  isLoggedIn!: boolean

  ngOnInit(): void {
    this._LoginService.userData.subscribe({
      next: res => {
        if (res !== null) {
          this.isLoggedIn = true
        } else {
          this.isLoggedIn = false
        }
      }
    })

    this._FlowbiteService.loadFlowbite((flowbite) => {
      initFlowbite()
    })
  }

  signOut(){
    this._LoginService.logOut()
  }
}
