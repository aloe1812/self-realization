import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-about-site',
  templateUrl: './about-site.component.html',
  styleUrls: ['./about-site.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutSiteComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
