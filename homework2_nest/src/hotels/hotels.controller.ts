import {Controller,Get,Post,Put,Delete,Param,Body,UseGuards,} from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { Hotel } from './hotel.model';


@Controller('hotels')
export class HotelsController {
constructor(private readonly hotelsService: HotelsService) {}

@Get()
findAll(): Promise<Hotel[]> {
    return this.hotelsService.findAll();
}

@Get(':name')
findByName(@Param('name') name: string): Promise<Hotel> {
    return this.hotelsService.findByName(name);
}

@Post()
create(@Body() hotelData: Partial<Hotel>): Promise<Hotel> {
    return this.hotelsService.create(hotelData);
}

@Put(':id')
update(
    @Param('id') id: number,
    @Body() hotelData: Partial<Hotel>,
): Promise<Hotel> {
    return this.hotelsService.update(id, hotelData);
}

@Delete(':id')
remove(@Param('id') id: number): Promise<void> {
    return this.hotelsService.remove(id);
}
}
  