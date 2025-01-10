import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Req } from '@nestjs/common';
import { Request } from 'express';

const extractJwtFromCookies = (req: Request) => {
  console.log("extractJwt", req.cookies);
  if (req.cookies && 
      'accessToken' in req.cookies && 
      req.cookies.accessToken.length > 0) {
    return req.cookies.accessToken;
  }
  return null;  
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        extractJwtFromCookies, 
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.REACT_APP_JWT_SECRET,
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}
