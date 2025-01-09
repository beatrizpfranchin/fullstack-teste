import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post()
    async getUser(@Request() req: any) {
        return await this.authService.validateUser(req.body.username, req.body.password);
    }

    @UseGuards(LocalAuthGuard)
    @Post('/login')
    async login(@Request() req: any) {
        return this.authService.login(req.user);
    }

    @UseGuards(LocalAuthGuard)
    @Post('/logout')
    async logout(@Request() req: any) {
        return req.logout();
    }

    @UseGuards(JwtAuthGuard)
    @Get('/profile')
    getProfile(@Request() req: any) {
        return req.user;
    }
}
