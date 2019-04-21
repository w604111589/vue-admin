import { VuexModule, Module, MutationAction, Mutation, Action, getModule } from 'vuex-module-decorators';
import { login, logout, getInfo } from '@/api/login';
import { getToken, setToken, removeToken } from '@/utils/auth';
import Session from '@/utils/session';
import store from '@/store';

export interface IUserState {
  token: string;
  name: string;
  avatar: string;
  role: string[];
}

@Module({ dynamic: true, store, name: 'user' })
class User extends VuexModule implements IUserState {
  public token = '';
  public name = '';
  public avatar = '';
  public role = [];

  @Action({ commit: 'SET_TOKEN' })
  public async Login(userInfo: { username: string, password: string}) {
    const username = userInfo.username.trim();
    const data: any = await login(username, userInfo.password);
    const token = data.data.token;
    setToken(token);
    return token;
  }

  @Action({ commit: 'SET_TOKEN' })
  public async FedLogOut() {
    removeToken();
    Session.remove('category');
    return '';
  }

  @Action({ commit: 'SET_AVATAR' })
  public async setAvatar(avatar: string) {
    return avatar;
  }

  @Action({ commit: 'SET_TOKEN' })
  public async setToken(token: string) {
    return token;
  }

  @MutationAction({ mutate: [ 'role', 'name', 'avatar' ] })
  public async GetInfo() {
    const token = getToken();
    if (token === undefined) {
      throw Error('GetInfo: token is undefined!');
    }
    const { data } = await getInfo(token);
    const role = [data.role];
    if (role.length > 0) {
      return {
        role,
        name: data.username,
        avatar: data.avatar,
      };
    } else {
      throw Error('GetInfo: role must be a non-null array!');
    }
  }

  @MutationAction({ mutate: [ 'token', 'role' ] })
  public async LogOut() {
    if (getToken() === undefined) {
      throw Error('LogOut: token is undefined!');
    }
    await logout();
    removeToken();
    return {
      token: '',
      role: [],
    };
  }

  @Mutation
  private SET_TOKEN(token: string) {
    this.token = token;
  }

  @Mutation
  private SET_AVATAR(avatar: string) {
    this.avatar = avatar;
  }
}

export const UserModule = getModule(User);
