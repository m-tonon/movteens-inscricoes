import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { NbDateFnsDateModule } from '@nebular/date-fns';
import {
  NbButtonModule,
  NbCardModule,
  NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbSpinnerModule,
} from '@nebular/theme';
import { PhoneFormatPipe } from '../../../pipes/phone-format.pipe';
import { RegistrationService } from '../../../services/registration.service';
import { Observable } from 'rxjs';
import { ExportedRegistration } from '../../../../../shared/registration.interface';

@Component({
  selector: 'app-registrations-overview',
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
  templateUrl: './registrations-overview.component.html',
  styleUrl: './registrations-overview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationsOverviewComponent implements OnInit {
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
