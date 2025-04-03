import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Role } from 'entities/role.entity'
import { User } from 'entities/user.entity'
import { AuthService } from 'modules/auth/auth.service'
import { RolesService } from 'modules/roles/roles.service'
import { UsersService } from 'modules/users/users.service'
import { Observable } from 'rxjs'

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private authService: AuthService,
    private usersService: UsersService,
    private rolesService: RolesService,
  ) {}

  async canActivate(contex: ExecutionContext): Promise<boolean> {
    const access = this.reflector.get('access', contex.getHandler())

    if (!access) return true

    const request = contex.switchToHttp().getRequest()
    
    // Dobimo uporabnika iz access_tokena
    const user = await this.authService.user(request.cookies['access_token'] || '')

    // Če uporabnik nima povezane role - potem nima pravic dostopa
    if (!user.role) {
      return false
    }

    // Pridobimo pravice za rolo
    const role: Role = await this.rolesService.findById(user.role.id, ['permissions'])

    // (for the read operations) || p - permission || - If user has 'view_blogpost' or 'view_edit' permissions. And if they do, the request is allowed to proceed and the blog post is displayed to the user:
    if (request.method === 'GET') {
      return role.permissions.some((p) => p.name === `view${access}` || p.name === `edit${access}`)
    }
    // (for write operations) -  If method is not GET, it checks if the roles permissions include 'edit_access.
    return role.permissions.some((p) => p.name === `edit${access}`)
  }
}
