import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {Router} from '@angular/router';
import {ADMIN_KEY} from '../../commons/constant/constant';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  private role = localStorage.getItem(ADMIN_KEY);
  constructor( private authService: AuthService,
               private router: Router) {
    if (this.role === 'true') {
      this.router.navigate(['/management']);
    }
  }

  ngOnInit() {
  }

}
