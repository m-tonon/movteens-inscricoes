import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NbDateFnsDateModule } from '@nebular/date-fns';
import {
  NbButtonModule,
  NbCardModule,
  NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbSpinnerModule,
} from '@nebular/theme';
import { RegistrationService } from '../services/registration.service';
import { ExportedRegistration } from '../../../shared/registration.interface';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PhoneFormatPipe } from '../pipes/phone-format.pipe';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NbCardModule,
    NbInputModule,
    NbButtonModule,
    NbFormFieldModule,
    NbIconModule,
    NbSpinnerModule,
    NbDateFnsDateModule,
    MatTableModule,
    MatProgressSpinnerModule,
    PhoneFormatPipe,
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminDashboardComponent implements OnInit {
  private registrationService = inject(RegistrationService);
  registrations$?: Observable<ExportedRegistration[]>;

  displayedColumns: string[] = [
    'Nome',
    'Idade',
    'Gênero',
    'Nome do responsável',
    'Telefone',
    'Pagamento confirmado',
    'Criado em',
  ];

  ngOnInit(): void {
    this.registrations$ = this.registrationService.retrieveRegistrations();
  }
}
