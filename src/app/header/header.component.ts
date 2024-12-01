import { Component } from '@angular/core';
import{MatToolbar} from '@angular/material/toolbar'
import{MatIcon} from '@angular/material/icon'
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbar,MatIcon],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
