// import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { CreatePartyDto } from './create-party.dto';
import { ApiProperty } from '@nestjs/swagger';

// export class UpdatePartyDto extends PartialType(CreatePartyDto) {}
export class UpdatePartyDto{
    @ApiProperty({description: 'Name of the party'})
    @IsString()
    @IsOptional()
    readonly name: string

    @ApiProperty({description: 'Whether space is private'})
    @IsBoolean()
    @IsOptional()
    readonly isPrivate: boolean
}
