import { PartialType } from '@nestjs/swagger';
import { CreateInviteDto } from './create-invite.dto';

export class UpdatePartyDto extends PartialType(CreateInviteDto) {}
