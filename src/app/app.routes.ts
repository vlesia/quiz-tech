import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PlayComponent } from './play/play.component';
import { FinishComponent } from './finish/finish.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Home' },
  { path: 'play/:id', component: PlayComponent, title: 'Play Quiz' },
  { path: 'finish', component: FinishComponent, title: 'Quiz Results' },
  { path: '**', redirectTo: '' }
];
