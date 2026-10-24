import { Component, inject, signal } from '@angular/core';
import { PipelineService, PipelineRun } from '../../services/pipeline.service';

@Component({
  selector: 'app-pipelines',
  templateUrl: './pipelines.html',
  styleUrl: './pipelines.css',
})
export class PipelinesComponent {
  readonly pipelineService = inject(PipelineService);
  readonly selectedRun = signal<PipelineRun | null>(null);

  selectRun(run: PipelineRun): void {
    if (this.selectedRun()?.id === run.id) {
      this.selectedRun.set(null);
    } else {
      this.selectedRun.set(run);
    }
  }

  onTriggerNewRun(): void {
    this.pipelineService.simulatePipeline();
  }
}
