import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PipelineService } from '../../services/pipeline.service';

@Component({
  selector: 'app-services',
  imports: [FormsModule],
  templateUrl: './services.html',
  styleUrl: './services.css',
})
export class ServicesComponent {
  readonly pipelineService = inject(PipelineService);

  // Interactive diagnostic form
  diagnosticServiceName = signal<string>('GitHub Pages Static CDN');
  diagnosticNotes = signal<string>('Standard latency verification');
  submissionSuccess = signal<boolean>(false);
  lastSubmittedTimestamp = signal<string>('');

  onPingAll(): void {
    this.pipelineService.pingServices();
  }

  onSubmitDiagnostic(): void {
    if (!this.diagnosticServiceName()) return;
    this.submissionSuccess.set(true);
    this.lastSubmittedTimestamp.set(new Date().toLocaleTimeString());
    setTimeout(() => {
      this.submissionSuccess.set(false);
    }, 4000);
  }
}
