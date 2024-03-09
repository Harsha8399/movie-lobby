import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    const userRoles: string[] = (request.headers['user-roles'] || '').split(
      ',',
    );

    // Check if the user has the 'admin' role
    return userRoles.includes('admin');
  }
}
