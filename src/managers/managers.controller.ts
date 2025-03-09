import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ManagersService } from './managers.service';
import { CreateManagerDto } from './dto/create-manager.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ROLES } from 'src/auth/constants/roles.constants';
import { AuthApi } from 'src/auth/decorators/api.decorator';

@Controller('managers')
export class ManagersController {
  constructor(private readonly managersService: ManagersService) {}

  @Auth()
  @AuthApi()
  @Post()
  create(@Body() createManagerDto: CreateManagerDto) {
    return this.managersService.create(createManagerDto);
  }

  @Auth()
  @AuthApi()
  @Get()
  findAll() {
    return this.managersService.findAll();
  }

  @Auth()
  @AuthApi()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.managersService.findOne(id);
  }

  @Auth(ROLES.MANAGER)
  @AuthApi()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateManagerDto: UpdateManagerDto) {
    return this.managersService.update(id, updateManagerDto);
  }

  @Auth()
  @AuthApi()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.managersService.remove(id);
  }
}
