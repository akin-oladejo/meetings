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

  @Post()
  create(
    @Query('creatorId') creatorId: string,
    @Body() createPartyDto: CreatePartyDto) {
    return this.partiesService.createParty(creatorId, createPartyDto);
  }


  @Get()
  findAll() {
    return this.partiesService.findAll();
  }

  @ApiOperation({summary:"Chnage space privacy"})
  @Patch('/setPrivacy')
  async setPrivacy(
    @Query('spaceId') spaceId: string,
    @Query('isPrivate', ParseBoolPipe) isPrivate: boolean,
  ) {
    // isPrivate = Boolean(isPrivate);
    return this.partiesService.setPartyPrivacy(spaceId, isPrivate);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.partiesService.findOneParty(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePartyDto: UpdatePartyDto) {
    return this.partiesService.updateParty(id, updatePartyDto);
  }

  @Patch()
  joinParty(@Body() createInviteDto:CreateInviteDto){
    return this.partiesService.createInvite()
    //
  }

  @Post('/invite')
  joinParty(@Body() createInviteDto:CreateInviteDto){
    return this.partiesService.createInvite()
    //
  }

  @Patch('/invite/:id')
  joinParty(@Param('id') id:string){
    return this.partiesService.createInvite()
    //
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.partiesService.closeParty(id);
  }
}
