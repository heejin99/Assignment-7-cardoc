import { Test, TestingModule } from '@nestjs/testing';
import { TireController } from './trim.controller';

describe('TireController', () => {
  let controller: TireController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TireController],
    }).compile();

    controller = module.get<TireController>(TireController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
