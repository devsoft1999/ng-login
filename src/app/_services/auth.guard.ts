import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { TokenStorageService } from './token-storage.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private tokenStorageService: TokenStorageService, private router: Router) {}

  canActivate(): boolean {
    console.log("canActivate ===============================");
    if (this.tokenStorageService.getToken()) {
      return true; // ถ้ามีการ Authenticated จะสามารถเข้าถึงหน้าเว็บนั้น ๆ ได้
    } else {
      this.router.navigate(['/login']); //ถ้าไม่มีหน้าเว็บจะเร้าท์ติ้งไปยังหน้า /login
      return false;
    }
  }
}