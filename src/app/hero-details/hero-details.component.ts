import { Component, OnInit, Input } from '@angular/core';
import { hero } from '../hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService }  from '../hero.service';

@Component({
  selector: 'app-hero-details',
  templateUrl: './hero-details.component.html',
  styleUrls: ['./hero-details.component.css']
})
export class HeroDetailsComponent implements OnInit {
  @Input() selectedHero : hero;
  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getHero();
  }
  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
      .subscribe(h => this.selectedHero = h);
  }
  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.heroService.updateHero(this.selectedHero)
      .subscribe(() => this.goBack());
  }
}
