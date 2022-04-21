import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from './dto/createUser.input';
import { UpdateUserInput } from './dto/updateUser.input';
import { User } from './models/entities/user.entity';
import { UserService } from './user.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { CurrentUser } from 'src/commons/auth/gql-user-param';
import { UpdateSocialInput } from './dto/updateSocial.input';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {} // 이렇게 쓰면 서비스 ts에 있는 클래스를 가져다가 쓸 수 있음

  // Create Api Create Api Create Api Create Api Create Api Create Api Create Api Create Api Create Api //
  @Mutation(() => User)
  createUser(
    @Args('createUserInput') createUserInput: CreateUserInput, // args == 주는쪽
  ) {
    return this.userService.create({ createUserInput });
  }

  // Read Api Read Api Read Api Read Api Read Api Read Api Read Api Read Api Read Api Read Api Read Api  //
  @Query(() => User)
  fetchUser(
    //
    @Args('user_email') user_email: string,
  ) {
    return this.userService.findOne({ user_email });
  }
  @Query(() => [User])
  fetchUsers() {
    return this.userService.findAll();
  }
  //
  //
  @UseGuards(GqlAuthAccessGuard)
  @Query(() => User)
  fetchLoginUser(
    //
    @CurrentUser() currentUser: any,
  ) {
    return this.userService.findOne({ user_email: currentUser.user_email });
  }
  // Update Api Update Api  Update Api  Update Api  Update Api  Update Api  Update Api  Update Api  Update Api  //
  @Mutation(() => User)
  async updateUser(
    @Args('user_email') user_email: string,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    return await this.userService.update({ user_email, updateUserInput }); // <- 이거 지워도 댐 로그인 안한 상태로 정보 바꾼다는거는 비번찾기만 가능
  }
  //
  //
  @Mutation(() => User)
  async PasswordChange(
    @Args('user_email') user_email: string,
    @Args('password') password: string,
  ) {
    return await this.userService.ChangePW({ user_email, password });
  }
  //
  //
  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => User)
  async updateLoginUser(
    //
    @CurrentUser() currentUser: any,
    @Args('password') password: string,
  ) {
    return this.userService.loginUpdate({
      user_email: currentUser.user_email,
      password,
    });
  }
  //
  //
  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => User)
  async updateSocialUser(
    //
    @CurrentUser() currentUser: any,
    @Args('updateSocilaInput') updateSocilaInput: UpdateSocialInput,
  ) {
    return this.userService.SocialUpdate({
      user_email: currentUser.user_email,
      updateSocilaInput,
    });
  }

  // Delete Api Delete Api Delete Api Delete Api Delete Api Delete Api Delete Api Delete Api Delete Api Delete Api //
  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Boolean)
  deleteLoginUser(
    //
    @CurrentUser() currentUser: any,
  ) {
    return this.userService.delete({ user_email: currentUser.user_email });
  }
  //
  //
  @Mutation(() => Boolean)
  deleteUser(
    @Args('user_email') user_email: string, //
  ) {
    return this.userService.delete({ user_email });
  }
  //
  //
  @Mutation(() => Boolean)
  restoreUser(
    @Args('user_email') user_email: string, //
  ) {
    return this.userService.restore({ user_email });
  }
}
