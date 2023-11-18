import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { FindOneDto } from 'src/modules/user/dto/FindOne.dto';
@Injectable()
export class ClassInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

        console.log("da vao")

        return next
            .handle()
            .pipe(
                tap(() => {
                }),
                map((data) => {

                    data = plainToInstance(FindOneDto, data, {
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