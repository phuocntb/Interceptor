import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import * as fs from 'fs'

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        // request http
        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();
        request.body.userName = "abc"
        let logObj = {
            id: Date.now() * Math.random(),
            title: `Vào lúc ${new Date(Date.now()).getDate()} user ${request.body.email} da login`,
            des: ""
        }

        if (request.body.userName.length < 7) {
            response.json({
                message: "Loi user name phai co it nhat 7 ky tu"
            })
            logObj.des = "that bai"
            let oldData = fs.readFileSync("log.json", 'utf-8');
            fs.writeFileSync("log.json", JSON.stringify([...JSON.parse(oldData), logObj]));
            return of(null);
        }

        return next
            .handle()
            .pipe(
                tap(() => {
                    logObj.des = "thanh cong"
                    let oldData = fs.readFileSync("log.json", 'utf-8');
                    fs.writeFileSync("log.json", JSON.stringify([...JSON.parse(oldData), logObj]));
                }),
            );
    }
}

/*
  Sử dụng Interceptor để thực hiện việc validate cho body gửi.
  case => user => userName => > 6 ký tự. => ok next => ....  
*/