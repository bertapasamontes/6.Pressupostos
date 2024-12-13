import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BudgetsListComponent } from "./components/budgets-list/budgets-list.component";

@Component({
  selector: 'app-root',
  imports: [BudgetsListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'S6.Pressupostos';
}
