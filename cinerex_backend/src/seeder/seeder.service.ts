import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import * as bcrypt from 'bcrypt'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../auth/entities/user.entity';
import { Location } from '../location/entities/location.entity';

@Injectable()
export class SeederService implements OnApplicationBootstrap {
    constructor(
        @InjectRepository(User) private readonly userRepository : Repository<User>,
        @InjectRepository(Location) private readonly locationRepository: Repository<Location>,
        private readonly authService : AuthService,
    ){}

    async onApplicationBootstrap(){
        await this.createDefaultAdmin();
        await this.createDefaultLocation();
    }

    private async createDefaultAdmin() {
        const adminEmail = 'admin@cinerex.com';
        const existingAdmin = await this.userRepository.findOneBy({email: adminEmail});

        if(!existingAdmin) {
            await this.authService.signUp({
                email: adminEmail,
                password: "Admin1234",
                role: ['Admin']
            })
            console.log("SuperAdmin created: admin@cinerex.com / Admin1234");
        } else {
            console.log("SuperAdmin already exists: admin@cinerex.com / Admin1234");
        }
    }

    private async createDefaultLocation() {
        const defaultLocation = await this.locationRepository.findOneBy({ id: 1 });

        if (!defaultLocation) {
            const location = this.locationRepository.create({
                id: 1,
                name: 'Cinerex',
                address: 'Av Principal'
            });
            await this.locationRepository.save(location);
            console.log('Default location created: Cinerex');
        } else {
            console.log('Default location already exists');
        }
    }
}
