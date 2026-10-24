import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-demo-guide',
  templateUrl: './demo-guide.html',
  styleUrl: './demo-guide.css',
})
export class DemoGuideComponent {
  readonly repoUrl = 'https://github.com/ordinary4576/lab03';
  readonly actionsUrl = 'https://github.com/ordinary4576/lab03/actions';
  readonly pagesUrl = 'https://ordinary4576.github.io/lab03/';
  readonly targetFilePath = 'src/app/pages/dashboard/dashboard.html';

  readonly gitCommands = `git status\ngit add src/app/pages/dashboard/dashboard.html\ngit commit -m "demo: update live demonstration banner to v1.1.0"\ngit push origin main`;

  copied = signal<boolean>(false);

  copyGitCommands(): void {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(this.gitCommands);
      this.copied.set(true);
      setTimeout(() => {
        this.copied.set(false);
      }, 2000);
    }
  }
}
