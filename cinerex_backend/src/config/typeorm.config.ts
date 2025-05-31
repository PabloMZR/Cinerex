import { ConfigService } from '@nestjs/config'
import type { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { join } from 'path'

export const typeOrmConfig = async (configService: ConfigService) : Promise<TypeOrmModuleOptions> => ({
    type: 'postgres',
    host: configService.get('DATABASE_HOST'),
    port: configService.get('DATABASE_PORT'),
    username: configService.get('DATABASE_USER'),
    password: configService.get('DATABASE_PASS'),
    database: configService.get('DATABASE_NAME'),
    ssl: false,
    logging:true,
    entities: [join(__dirname + '/../**/*.entity{.ts,.js}')],
    autoLoadEntities: true,
    synchronize: true
})