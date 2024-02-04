import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseBoolPipe,
} from '@nestjs/common';
import { PartiesService } from './parties.service';
import { CreatePartyDto } from './dto/party/create-party.dto';
import { UpdatePartyDto } from './dto/party/update-party.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateRequestDto } from './dto/request/create-request.dto';
import { UpdateRequestDto } from './dto/request/update-request.dto';

@ApiTags('parties')
@Controller('parties')
export class PartiesController {
  constructor(private readonly partiesService: PartiesService) {}

  @ApiOperation({ summary: 'Create a party' })
  @Post()
  async create(
    @Query('creatorId') creatorId: string,
    @Body() createPartyDto: CreatePartyDto,
  ) {
    return await this.partiesService.createParty(creatorId, createPartyDto);
  }

  @ApiOperation({ summary: 'Find parties you are a member of' })
  @Get()
  findPartiesbyMemberId(@Query('memberId') memberId: string) {
    return this.partiesService.findPartiesbyMemberId(memberId);
  }

  @ApiOperation({ summary: 'Get all spaces in a party' })
  @Get('/spaces')
  findSpacesbyParty(@Query('partyId') partyId: string) {
    return this.partiesService.findSpacesbyParty(partyId);
  }

  @ApiOperation({ summary: 'List pending requests' })
  @Get('/requests')
  listInvites(@Query('partyId') partyId: string) {
    return this.partiesService.listRequests(partyId);
  }

  @ApiOperation({ summary: 'Return the members in a party' })
  @Get('/members')
  async listMembers(@Query('partyId') partyId: string) {
    return await this.partiesService.listMembers(partyId);
  }

  @ApiOperation({ summary: 'Return one party' })
  @Get(':partyId')
  findOne(@Param('partyId') partyId: string) {
    return this.partiesService.findOneParty(partyId);
  }

  @ApiOperation({ summary: '(Attempt to) join party' })
  @Patch('/join')
  joinParty(@Body() createRequestDto: CreateRequestDto) {
    return this.partiesService.joinParty(createRequestDto);
    //
  }

  @ApiOperation({ summary: 'Exit/Eject from party' })
  @Patch('/exit')
  leaveParty(@Body() updateRequestDto: UpdateRequestDto) {
    return this.partiesService.leaveParty(updateRequestDto);
  }

  @ApiOperation({ summary: 'Approve reqest to join party' })
  @Patch('/approve')
  acceptInvite(
    @Query('inviteId') requestId: string,
  ) {
    return this.partiesService.approveRequest(requestId);
  }

  @ApiOperation({ summary: 'Update party details' })
  @Patch(':partyId')
  update(
    @Param('partyId') partyId: string,
    @Body() updatePartyDto: UpdatePartyDto,
  ) {
    return this.partiesService.updateParty(partyId, updatePartyDto);
  }

  @ApiOperation({ summary: 'Delete a party' })
  @Delete(':partyId')
  async closeParty(@Param('partyId') partyId: string) {
    return await this.partiesService.closeParty(partyId);
  }
}
