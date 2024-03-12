import { Controller, Get, Request, Post, UseGuards, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation } from '@nestjs/swagger';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private readonly authService:AuthService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @ApiOperation({summary:'Check API health'})
  @Get('/api/health')
  getHealth(): string {
    return this.appService.getHealth();
  }

  @ApiOperation({summary:'Login'})
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req){
    // return req.user
    return this.authService.login(req.user);
  }

  @ApiOperation({summary:'Return user profile'})
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req){
    return req.user
  }
}
