import { AlertController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuariosService } from '../services/usuarios.service';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private usuarioService: UsuariosService, private router: Router, private alertCtrl: AlertController) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    return this.usuarioService.usuarioLogado().pipe(map((data: any) => data.ativo ? true : false),
      tap(async (data: any) => {
        if (!data) {
          const alert = await this.alertCtrl.create({ message: 'A conta foi bloqueada', buttons: ['OK'] });
          alert.present();
          localStorage.removeItem('auth/data');
          this.router.navigate(['/login']);
        }
      })
    )
  }

}
