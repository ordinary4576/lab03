import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PipelineService } from '../../services/pipeline.service';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class DashboardComponent {
  readonly pipelineService = inject(PipelineService);

  readonly repoName = 'ordinary4576/lab03';
  readonly branchName = 'main';
  readonly pagesUrl = 'https://ordinary4576.github.io/lab03/';
  readonly basePath = '/lab03/';

  onTriggerSimulation(): void {
    this.pipelineService.simulatePipeline();
  }

  onPingServices(): void {
    this.pipelineService.pingServices();
  }
}
