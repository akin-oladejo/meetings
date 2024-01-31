import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({summary:"Create a user"})
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  // @ApiOperation({summary:"Return all users"})
  // @Get()
  // findAll() {
  //   return this.usersService.findAllUsers();
  // }

  @ApiOperation({summary:"Find user by Id"})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOneUser(id);
  }

  @ApiOperation({summary:"Update user details"})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @ApiOperation({summary:"Delete a user"})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.removeUser(id);
  }
}
