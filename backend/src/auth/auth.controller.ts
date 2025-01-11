import { Body, Controller, Get, Post, Request, Res, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

//Opções para criação dos cookies. Como são repetidas em todos os casos, criei uma constante.
//As configurações permitem o acesso aos cookies mesmo numa situação de requisição CORS.
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

    
    @UseGuards(LocalAuthGuard) 
    //Estratégia adiciona uma propriedade 'user' na requisição se o usuário existe no banco de dados.
    @Post('/login') 
    //Caminho da REST API para login.
    async login(
        @Request() req: any, 
        @Res({passthrough: true}) response: any
    ) {
        const loggedIn = this.authService.login(req.user);
        //Serviço de autenticação faz a comparação da senha da requisição com a senha do banco de dados
        //Retorna o access_token se tiver sucesso, se não retorna nulo.
        if (loggedIn != null) {
            const token = (await loggedIn).access_token;
            response.cookie('accessToken', token, cookieOptions)
            //Adiciona o access_token JWT aos cookies da resposta que será enviada
            return loggedIn;
        }
        return null;
    }

    @Get('/logout')
    //Caminho da REST API para logout.
    async logout(@Res({passthrough: true}) response: any) {
       response.clearCookie('accessToken', cookieOptions);
       //Apaga a váriavel accessToken dos cookies.
    }

    @UseGuards(JwtAuthGuard)
    //Estratégia checa se ou header da requisição ou os cookies tem o access token para confirmar um usuário logado.
    @Get('/profile')
    //Caminho da REST API para obter o perfil do usuário logado.
    getProfile(@Request() req: any){
        return req.user;
    }
}
