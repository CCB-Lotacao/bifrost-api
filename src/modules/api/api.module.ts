import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { UserController } from "./controllers";
import { UserService } from "./services";

@Module({
  controllers: [UserController],
  providers: [UserService],
})
export class ApiModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer;
  }
}
