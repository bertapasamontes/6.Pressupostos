import { Routes } from '@angular/router';
import { BudgetsListComponent } from './components/budgets-list/budgets-list.component';
import { PanelComponent } from './components/panel/panel.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
    {path: 'budgete-list/:pages/:languages', component: BudgetsListComponent, title:"budget-list"},
    {path: 'panel', component: PanelComponent, title: "pannel"},
];
