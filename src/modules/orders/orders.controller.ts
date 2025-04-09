import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Res,
  UseInterceptors,
} from '@nestjs/common'
import { Public } from 'decorators/public.decorator'
import { Response } from 'express'
import { PaginatedResult } from 'interfaces/paginated-result.interface'

import { OrdersService } from './orders.service'

@Controller('orders')
@UseInterceptors(ClassSerializerInterceptor)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(@Query('page') page: number): Promise<PaginatedResult> {
    return this.ordersService.paginate(page, ['order_items'])
  }

  @Public()
  @Post('export')
  @HttpCode(HttpStatus.OK)
  async export(@Res() response: Response): Promise<any> {
    return this.ordersService.export(response)
  }

  @Get('chart')
  async chart(): Promise<{ date: string; sum: string }[]> {
    return this.ordersService.chart()
  }
}
