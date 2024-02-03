import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseBoolPipe } from '@nestjs/common';
import { PartiesService } from './parties.service';
import { CreatePartyDto } from './dto/party/create-party.dto';
import { UpdatePartyDto } from './dto/party/update-party.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateInviteDto } from './dto/invite/create-invite.dto';

@ApiTags('parties')
@Controller('parties')
export class PartiesController {
  constructor(private readonly partiesService: PartiesService) {}

  @ApiOperation({description:"Create a party"})
  @Post()
  async create(
    @Query('creatorId') creatorId: string,
    @Body() createPartyDto: CreatePartyDto) {
    return await this.partiesService.createParty(creatorId, createPartyDto);
  }

  @ApiOperation({description:"Find parties you are a member of"})
  @Get()
  findPartiesbyMemberId(
    @Query('memberId') memberId:string
  ) {
    return this.partiesService.findPartiesbyMemberId(memberId);
  }

  @ApiOperation({ summary: 'Get all spaces in a party' })
  @Get('/spaces')
  findSpacesbyParty(
    @Query('partyId') partyId: string
  ) {
    return this.partiesService.findSpacesbyParty(partyId);
  }

  @Get(':partyId')
  findOne(@Param('partyId') partyId: string) {
    return this.partiesService.findOneParty(partyId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePartyDto: UpdatePartyDto) {
    return this.partiesService.updateParty(id, updatePartyDto);
  }

  // @Post('/invite')
  // joinParty(@Body() createInviteDto:CreateInviteDto){
  //   return this.partiesService.createInvite()
  //   //
  // }

  // @Patch('/invite/:id')
  // leaveParty(@Param('id') id:string){
  //   return this.partiesService.createInvite()
  //   //
  // }

  // @Patch('/invite/:id')
  // leaveParty(@Param('id') id:string){
  //   return this.partiesService.createInvite()
  //   //
  // }

  // @Patch('/invite/:id')
  // leaveParty(@Param('id') id:string){
  //   return this.partiesService.createInvite()
  //   //
  // }

  @Delete(':partyId')
  async closeParty(@Param('partyId') partyId: string) {
    return await this.partiesService.closeParty(partyId);
  }
}
