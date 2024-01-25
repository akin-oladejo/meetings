import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsBoolean, IsDateString, IsObject, IsString, ValidateNested, IsNumber, IsOptional } from "class-validator"
import { rating } from "src/spaces/interfaces/rating.interface";


// class Rating {
//     @ApiProperty({description: 'Name of the host'})
//     @IsNumber()
//     verySad: number;

//     @ApiProperty({description: 'Name of the host'})
//     @IsNumber()
//     veryHappy: number;
    
//     @ApiProperty({description: 'Name of the host'})
//     @IsNumber()
//     sad: number;
    
//     @ApiProperty({description: 'Name of the host'})
//     @IsNumber()
//     happy: number;
// }

export class CreateSpaceDto {
    @ApiProperty({description: 'Name of the host'})
    @IsString()
    readonly host: string

    @ApiProperty({description: 'Title of the space'})
    @IsString()
    readonly title: string

    @ApiProperty({description: 'Party ID'})
    @IsString()
    readonly party: string
    
    @ApiProperty({description: 'Time the space starts'})
    @IsOptional()
    @IsDateString()
    readonly startTime: Date

    // @IsDateString()
    // readonly endTime: Date

    @ApiProperty({description: "ID's of the members"})
    @IsString({each:true})
    readonly members: string[]

    // @ApiProperty({description: ""})
    // @IsNumber()
    // readonly nExited: string

    // @ApiProperty({description: 'Name of the host'})
    // @IsNumber()
    // readonly maxAttended: number

    // @ApiProperty({description: 'Name of the host'})
    // @IsObject()
    // @ValidateNested() @Type(() => Rating)
    // readonly rating: rating
}
