////////////////////////////////////////////////////////////////////////
// 핸드폰 번호로 중복 가입을 체크할 때 사용했음
//
// const user = await this.UserRepository.findOne({
//   where: { user_phone: createUserInput.user_phone },
// });
// if (user)
//   throw new ConflictException('동일한 핸드폰 번호로 계정이 등록되어있습니다.');

////////////////////////////////////////////////////////////////////////
// 소셜 계정 로그인할 때 사용했음
// 가입확인
// console.log(req.user);

// let user = await this.userService.findOne({
//   user_email: req.user.user_email,
// });

// // 회원가입
// if (!user) {
//   const { password, ...rest } = req.user;
//   const createUserInput = { ...rest, password };
//   user = await this.userService.create({ createUserInput });
// }

// // 로그인
// this.authService.setRefreshToken({ user, res });
// res.redirect(
//   'http://localhost:5500/main-project/frontend/login/index.html',
// );
////////////////////////////////////////////////////////////////////////

////다른게 있었음 ㅎ; 날짜 라이브러리
// import * as moment from 'moment';
// const date = moment();
// member_since: date.format('YYYY-MM-DD kk:mm:ss')

/////////////////////////
// .createQueryBuilder()
// .update()
// .set({ point: point + amount })
// .where('user_email = :user_email', {
//   user_email: currentUser.user_email,
// })
// .execute();
