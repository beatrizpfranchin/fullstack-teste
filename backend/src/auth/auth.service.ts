import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    
    async validateUser(username: string, password: string) {
        //Função para validar o usuário para login

        const user = await this.userService.findByEmail(username);
        //Procura se o username existe chave única no banco de dados
        if (user) { //Se o usuário existe...
            const match = await bcrypt.compare(password,user.password);
            //Compara o hash da senha guardado no banco de dados com a senha inserida
            if (match) {
                const { password, ...result } = user;
                return result;
                //Retorna as informações do usuário logado sem a senha para maior segurança
            }
        }
        return null;
    }

    async login(user: User) {
        //Função que utiliza o serviço JWT para gerar um token de acesso baseado no usuário
        const payload = { username: user.email, sub: user.id };
        return {
          access_token: this.jwtService.sign(payload),
        };
      }
}
