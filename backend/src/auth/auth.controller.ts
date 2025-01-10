import { Body, Controller, Get, Post, Request, Res, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

const cookieOptions = {
    expires: new Date(Date.now() + 3600000),
    httpOnly: true,
    path: '/',
    sameSite: 'none',
    secure: true
}

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post()
    async getUser(@Request() req: any) {
        console.log(req.cookies);
        return await this.authService.validateUser(req.body.username, req.body.password);
    }

    @UseGuards(LocalAuthGuard)
    @Post('/login')
    async login(
        @Request() req: any, 
        @Res({passthrough: true}) response: any
    ) {

        const loggedIn = this.authService.login(req.user);
        if (loggedIn != null) {
            const token = (await loggedIn).access_token;
            response.cookie('accessToken', token, cookieOptions)
            return loggedIn;
        }
        return null;
    }

    @UseGuards(JwtAuthGuard)
    @Get('/logout')
    async logout(@Res({passthrough: true}) response: any) {
       response.clearCookie('accessToken', cookieOptions);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/profile')
    getProfile(
        @Request() req: any, 
        @Res({passthrough: true}) response: any
    ){
        return req.user;
    }
}
