import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SideNavComponent } from './components/sidenav/sidenav.component';
import { RegistrationsOverviewComponent } from './components/registrations-overview/registrations-overview.component';
import { NbCardModule } from '@nebular/theme';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NbCardModule,
    SideNavComponent,
    RegistrationsOverviewComponent,
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminDashboardComponent {}
