import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class FooterComponent {
  readonly currentYear = new Date().getFullYear();
  readonly repoUrl = 'https://github.com/ordinary4576/lab03';
  readonly pagesUrl = 'https://ordinary4576.github.io/lab03/';
}
