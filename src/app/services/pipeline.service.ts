import { Injectable, signal } from '@angular/core';

export interface PipelineStep {
  name: string;
  status: 'pending' | 'running' | 'success' | 'failed';
  duration?: string;
  command: string;
}

export interface PipelineRun {
  id: string;
  commitMessage: string;
  commitHash: string;
  branch: string;
  author: string;
  status: 'success' | 'running' | 'queued' | 'failed';
  duration: string;
  timestamp: string;
  steps: PipelineStep[];
}

export interface MicroserviceStatus {
  name: string;
  status: 'operational' | 'degraded' | 'mocked';
  latency: number;
  description: string;
  type: 'Frontend Host' | 'CI Pipeline' | 'CD Deployment' | 'Mock API';
}

@Injectable({
  providedIn: 'root',
})
export class PipelineService {
  // Signals for reactive state
  readonly isSimulating = signal<boolean>(false);
  readonly simulationProgress = signal<number>(0);
  readonly currentStepIndex = signal<number>(-1);
  readonly simulationLogs = signal<string[]>([]);

  readonly services = signal<MicroserviceStatus[]>([
    {
      name: 'GitHub Pages Static CDN',
      status: 'operational',
      latency: 24,
      description: 'Global edge distribution serving Angular single-page application at /lab03/',
      type: 'Frontend Host',
    },
    {
      name: 'GitHub Actions Runner (CI)',
      status: 'operational',
      latency: 42,
      description: 'Ubuntu runner validating dependencies, tests (vitest), and ng build',
      type: 'CI Pipeline',
    },
    {
      name: 'GitHub Pages Deployment (CD)',
      status: 'operational',
      latency: 35,
      description: 'Official actions/deploy-pages@v4 artifact deployment engine',
      type: 'CD Deployment',
    },
    {
      name: 'Demo Mode Mock API Gateway',
      status: 'mocked',
      latency: 18,
      description: 'Client-side simulated backend providing zero-downtime mock responses',
      type: 'Mock API',
    },
  ]);

  readonly activeRuns = signal<PipelineRun[]>([
    {
      id: 'run-104',
      commitMessage: 'feat(ci): configure automated GitHub Pages deployment workflow',
      commitHash: 'b853ac4',
      branch: 'main',
      author: 'ordinary4576',
      status: 'success',
      duration: '48s',
      timestamp: 'Just now',
      steps: [
        {
          name: 'actions/checkout@v4',
          status: 'success',
          duration: '3s',
          command: 'git checkout main',
        },
        {
          name: 'actions/setup-node@v4',
          status: 'success',
          duration: '5s',
          command: 'setup Node.js v24 with npm cache',
        },
        { name: 'Install dependencies', status: 'success', duration: '14s', command: 'npm ci' },
        {
          name: 'Execute Automated Unit Tests',
          status: 'success',
          duration: '4s',
          command: 'npm test -- --watch=false',
        },
        {
          name: 'Angular Production Build',
          status: 'success',
          duration: '8s',
          command: 'ng build --base-href /lab03/',
        },
        {
          name: 'SPA 404 Routing Fallback',
          status: 'success',
          duration: '1s',
          command: 'copy index.html to 404.html',
        },
        {
          name: 'Upload Pages Artifact',
          status: 'success',
          duration: '4s',
          command: 'actions/upload-pages-artifact@v3',
        },
        {
          name: 'Deploy to GitHub Pages',
          status: 'success',
          duration: '9s',
          command: 'actions/deploy-pages@v4',
        },
      ],
    },
    {
      id: 'run-103',
      commitMessage: 'refactor: organize Angular standalone components & routing',
      commitHash: '763a38c',
      branch: 'main',
      author: 'ordinary4576',
      status: 'success',
      duration: '42s',
      timestamp: '12 mins ago',
      steps: [
        {
          name: 'actions/checkout@v4',
          status: 'success',
          duration: '2s',
          command: 'git checkout main',
        },
        { name: 'Install dependencies', status: 'success', duration: '12s', command: 'npm ci' },
        { name: 'Run Unit Tests', status: 'success', duration: '4s', command: 'npm test' },
        {
          name: 'Production Build',
          status: 'success',
          duration: '9s',
          command: 'ng build --base-href /lab03/',
        },
        { name: 'Deploy', status: 'success', duration: '8s', command: 'deploy-pages' },
      ],
    },
    {
      id: 'run-102',
      commitMessage: 'chore: initial repository setup and Git branch tracking',
      commitHash: 'eb87669',
      branch: 'main',
      author: 'ordinary4576',
      status: 'success',
      duration: '39s',
      timestamp: '1 hour ago',
      steps: [
        {
          name: 'actions/checkout@v4',
          status: 'success',
          duration: '2s',
          command: 'git checkout main',
        },
        { name: 'Install dependencies', status: 'success', duration: '13s', command: 'npm ci' },
        { name: 'Production Build', status: 'success', duration: '8s', command: 'ng build' },
        { name: 'Deploy', status: 'success', duration: '7s', command: 'deploy-pages' },
      ],
    },
  ]);

  /**
   * Simulates a live pipeline execution in the browser
   */
  simulatePipeline(): void {
    if (this.isSimulating()) return;

    this.isSimulating.set(true);
    this.simulationProgress.set(10);
    this.currentStepIndex.set(0);
    this.simulationLogs.set([
      '[CI Trigger] Push detected on refs/heads/main',
      '[CI Validation] Initializing runner on ubuntu-latest...',
      '[CI Checkout] actions/checkout@v4: Fetching commit ref...',
    ]);

    setTimeout(() => {
      this.simulationProgress.set(30);
      this.currentStepIndex.set(1);
      this.simulationLogs.update((logs) => [
        ...logs,
        '[CI Setup] actions/setup-node@v4: Node.js v24.19.0 configured with npm cache',
        '[CI Dependencies] Running npm ci --prefer-offline...',
        '[CI Dependencies] Packages resolved and verified successfully.',
      ]);
    }, 1000);

    setTimeout(() => {
      this.simulationProgress.set(60);
      this.currentStepIndex.set(2);
      this.simulationLogs.update((logs) => [
        ...logs,
        '[CI Test] Running automated tests: npm test -- --watch=false',
        '[CI Test] Vitest executed: 2 test files passed, 0 failed.',
      ]);
    }, 2000);

    setTimeout(() => {
      this.simulationProgress.set(80);
      this.currentStepIndex.set(3);
      this.simulationLogs.update((logs) => [
        ...logs,
        '[CI Build] Running ng build --configuration production --base-href /lab03/',
        '[CI Build] Output generated in dist/lab03/browser/',
        '[CI SPA Routing] Generated 404.html fallback for client-side routing.',
      ]);
    }, 3000);

    setTimeout(() => {
      this.simulationProgress.set(100);
      this.currentStepIndex.set(4);
      this.simulationLogs.update((logs) => [
        ...logs,
        '[CD Deployment] actions/upload-pages-artifact@v3: Artifact bundled',
        '[CD Deployment] actions/deploy-pages@v4: Successfully deployed to GitHub Pages!',
        '[CD Deployed] Site URL: https://ordinary4576.github.io/lab03/',
      ]);
      this.isSimulating.set(false);
    }, 4200);
  }

  pingServices(): void {
    const updated = this.services().map((service) => ({
      ...service,
      latency: Math.floor(Math.random() * 25) + 15,
    }));
    this.services.set(updated);
  }
}
