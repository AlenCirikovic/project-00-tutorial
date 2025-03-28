import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common'
import { UsersService } from './users.service'
import { PaginatedResult } from 'interfaces/paginated-result.interface'
import { User } from 'entities/user.entity'
import { UserData } from 'interfaces/user.interface'

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor) // We need the ClassSerializerInterceptor so that the @Exclude from User entity columns are added
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(@Query('page') page: number): Promise<PaginatedResult> {
    return this.usersService.paginate(page)
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findById(id)
  }

  @Post(':id')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto)
  }
}
