import { PartialType } from '@nestjs/mapped-types';
import { CreateSpaceDto } from '../space/create-space.dto';

export class UpdateSpaceDto extends PartialType(CreateSpaceDto) {}
