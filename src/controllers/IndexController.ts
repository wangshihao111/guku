import {
  Controller,
  Get,
  useInterceptor,
  RouterCtx,
  autoWired,
  AppCtx,
  Post,
} from '@guku/core';
import { AuthInterceptor } from '../interceptors/AuthInterceptor';
import { DBService } from '../services/DBService';
import { UserService } from '../services/UserService';

@useInterceptor([AuthInterceptor])
@Controller('/')
export class IndexController {
  age: number;

  @autoWired(UserService)
  userService!: UserService;

  @autoWired(DBService)
  db!: DBService;

  constructor(private appCtx: AppCtx) {
    this.age = 999;
  }

  @Get('/hello')
  index(ctx: RouterCtx) {
    console.log(this.appCtx);
    console.log('req Body', ctx.request.body);
    console.log(
      this.userService,
      this.db.user,
      this.userService === this.db.user
    );
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    console.log(ctx.appCtx.render?.());

    ctx.appCtx.ctx.body = 'hello world';
  }
  @Post('/hello')
  postIndex(ctx: RouterCtx) {
    ctx.body = ctx.request.body;
  }
}
