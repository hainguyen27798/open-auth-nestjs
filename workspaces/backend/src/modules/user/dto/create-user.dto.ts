import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty } from 'class-validator';

@Exclude()
export class CreateUserDto {
    @Expose()
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @Expose()
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty()
    email: string;
}
