import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';

class FoodDTO {
   data: string
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/ask")
  async ask(@Query("question") question: string): Promise<string> {
    return await this.appService.query(question);
  }

  @Post("/train")
  async train(@Body() food: FoodDTO) {
    return await this.appService.feed(food.data);
  }


}
