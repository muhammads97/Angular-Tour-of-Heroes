import { Component, OnInit } from '@angular/core';
import {hero} from '../hero';
import {HeroService} from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes : hero[];
  constructor(private heroService : HeroService) {}

  getHeroes(): void {
    this.heroService.getHeroes()
        .subscribe(heroes => this.heroes = heroes);
  }
  
  ngOnInit() {
    this.getHeroes();
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as hero)
      .subscribe(h => {
        this.heroes.push(h);
      });
  }
  delete(h: hero): void {
    this.heroes = this.heroes.filter(hr => hr !== h);
    this.heroService.deleteHero(h).subscribe();
  }

}
