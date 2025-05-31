import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor (
    @InjectRepository(User) 
    private readonly userRepository : Repository<User>,
    private jwtService: JwtService
  ){}
  //registro users
  signUp(createUserDto: CreateUserDto) {
    createUserDto.password = bcrypt.hashSync(createUserDto.password, 8)
    return this.userRepository.save(createUserDto);
  }
  //login 
  async login(loginUserDto: LoginUserDto){

    const user = await this.userRepository.findOne({
        where: { email: loginUserDto.email }
    });

      if(!user) {
        throw new UnauthorizedException("User not found")
      }
      console.log("Plain:", loginUserDto.password);
      console.log("Hash from DB:", user.password);

      const match = await bcrypt.compare(loginUserDto.password, user.password);
      if(!match){
        throw new UnauthorizedException("You are not authorized");
      }

      const payload = {
        email: user.email,
        role: user.role,
        userId: user.userId
      }
      
      const token = this.jwtService.sign(payload);
      return token;
    }
} 
