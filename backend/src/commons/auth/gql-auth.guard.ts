import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

export class GqlAuthAccessGuard extends AuthGuard('access') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
    // ctx는 context의 약자
    //rest api 기반인 것을 gql api 기반으로 바꾸기 위해서 값을 고쳐나가는 중이다
  }
}

export class GqlAuthRefreshGuard extends AuthGuard('refresh') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}

// 1. api 요청
// 2. 함수 gqlAuthAccessGuard 실행
// 3. rest방식을 gql 방식으로 바꿔서 리턴
// 4. JwtAccessStrategy 함수 실행
// 5. 검증
// 6. 검증 완료 시 리턴
// 7. 프론트단에서는 받아올 수 있는 데이터가 아니라서 새로운 데코레이터 생성
// 8. 그것도 restapi기반이라서 gql 기반으로 바꿔주고
// 9. 데코테이터를 프론트에서 꺼내쓰면서 확인함
