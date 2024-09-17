import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import * as httpMock from 'node-mocks-http';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      imports: [],
      providers: [],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  // it('should be defined', () => {
  //   expect(controller).toBeDefined();
  // });

  it('should can say hello', async () => {
    const response = await controller.sayHello('arief', 'taufik');
    expect(response).toBe('Hello arief taufik!');
  });

  // Testing express.Response using mock
  it('should can get view', async () => {
    const response = httpMock.createResponse();
    controller.viewHello('arief', response);

    expect(response._getRenderView()).toBe('index.html');
    expect(response._getRenderData()).toEqual({
      title: 'Template Engine',
      name: 'arief',
    });
  });
});
