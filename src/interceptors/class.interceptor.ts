import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class ClassInterceptor implements NestInterceptor {

    constructor(private dto: any) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

        const req = context.switchToHttp().getRequest();

        console.log("da vao")

        return next
            .handle()
            .pipe(
                tap(() => {
                    // thực hiện gì đó mà không tác động gì vào response
                }),
                map((data) => {
                    // bắt data xử lý
                    data = plainToInstance(this.dto, data, {
                        excludeExtraneousValues: true
                    })

                    return data
                })
            );
    }
}

/*
  Sử dụng Interceptor để thực hiện việc validate cho body gửi.
  case => user => userName => > 6 ký tự. => ok next => ....  
*/