import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
  TemplateRef,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TableModule } from 'primeng/table';
import { NbDateFnsDateModule } from '@nebular/date-fns';
import {
  NbButtonModule,
  NbCardModule,
  NbDialogRef,
  NbDialogService,
  NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbRadioModule,
  NbSpinnerModule,
} from '@nebular/theme';
import { PhoneFormatPipe } from '../../../pipes/phone-format.pipe';
import { RegistrationService } from '../../../services/registration.service';
import { Observable } from 'rxjs';
import { ExportedRegistration } from '../../../../../shared/registration.interface';
import { IconFieldModule } from 'primeng/iconfield';
import { Button } from 'primeng/button';
import { Toast } from 'primeng/toast';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { StyleClassModule } from 'primeng/styleclass';
import { SelectModule } from 'primeng/select';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-registrations-overview',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NbCardModule,
    NbInputModule,
    NbButtonModule,
    NbFormFieldModule,
    NbIconModule,
    NbSpinnerModule,
    NbDateFnsDateModule,
    MatProgressSpinnerModule,
    PhoneFormatPipe,
    TableModule,
    IconFieldModule,
    Button,
    Toast,
    ToastModule,
    StyleClassModule,
    SelectModule,
    TagModule,
    NbRadioModule
  ],
  providers: [MessageService],
  templateUrl: './registrations-overview.component.html',
  styleUrl: './registrations-overview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationsOverviewComponent implements OnInit {
  private registrationService = inject(RegistrationService);
  private messageService = inject(MessageService);
  private dialogService = inject(NbDialogService);

  isExporting = signal(false);
  exportDialogRef = signal<NbDialogRef<any> | null>(null);
  registrations$?: Observable<ExportedRegistration[]>;

  allRegistrations: ExportedRegistration[] = [];
  filteredRegistrations: ExportedRegistration[] = [];
  paymentFilter: 'all' | 'true' | 'false' = 'all';
  genders: any[] = [
    { label: 'Masculino', value: 'Masculino' },
    { label: 'Feminino', value: 'Feminino' }
  ];
  exportPaymentFilter: 'all' | 'true' = 'all';
  exportPaymentOptions = [
    { label: 'Todos', value: 'all' },
    { label: 'Somente pagos', value: 'true' },
  ];

  ngOnInit(): void {
    this.registrations$ = this.registrationService.retrieveRegistrations();
    this.registrations$.subscribe((regs) => {
      this.allRegistrations = regs;
      this.applyPaymentFilter();
    });
  }

  applyPaymentFilter(): void {
    if (this.paymentFilter === 'all') {
      this.filteredRegistrations = this.allRegistrations;
    } else if (this.paymentFilter === 'true') {
      this.filteredRegistrations = this.allRegistrations.filter(
        (r) => r.paymentConfirmed === true
      );
    } else {
      this.filteredRegistrations = this.allRegistrations.filter(
        (r) => r.paymentConfirmed === false
      );
    }
  }

  setPaymentFilter(filter: 'all' | 'true' | 'false') {
    this.paymentFilter = filter;
    this.applyPaymentFilter();
  }

  openExportDialog(tpl: TemplateRef<any>) {
    this.exportPaymentFilter = this.paymentFilter === 'true' ? 'true' : 'all';
    const ref = this.dialogService.open(tpl, { context: { title: 'Exportar CSV' } });
    this.exportDialogRef.set(ref);
  }

  confirmExport(): void {
    this.isExporting.set(true);
    this.registrationService.exportRegistrations(this.exportPaymentFilter).subscribe({
      next: (blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'inscricoes-movteens-2025.csv';
        a.click();
        window.URL.revokeObjectURL(url);
        this.isExporting.set(false);
        this.exportDialogRef()?.close();
      },
      error: (err) => {
        this.isExporting.set(false);
        console.error('Failed to export CSV', err);
      },
    });
  }

  updatePaymentStatus(reg: ExportedRegistration): void {
    this.messageService.add({
      severity: 'info',
      summary: 'Registration Selected',
      detail: reg.name,
    });
  }
}
