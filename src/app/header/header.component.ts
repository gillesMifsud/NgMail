import {Component, Input, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() isLoggedIn;
  constructor(private userService: UserService) { }

  ngOnInit() {
    console.log('HEADER COMPONENT : ' + this.isLoggedIn);
  }

  logout() {
    this.userService.signOut();
  }
}
