import { Component } from '@angular/core';
import { BudgetsListComponent } from "./components/budgets-list/budgets-list.component";
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [BudgetsListComponent, RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'S6.Pressupostos';
}
