import { IsInt } from "class-validator";

export class CreateRatingDto {
    @IsInt()
    verySad: number;

    @IsInt()
    veryHappy: number;
    
    @IsInt()
    sad: number;
    
    @IsInt()
    happy: number;
}
