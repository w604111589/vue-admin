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
    const token = JSON.stringify(data.token);
    setToken(token);
    return token;
  }

  @Action({ commit: 'SET_TOKEN' })
  public async FedLogOut() {
    removeToken();
    Session.remove('category');
    return '';
  }

  @MutationAction({ mutate: [ 'role', 'name', 'avatar' ] })
  public async GetInfo() {
    const token = getToken();
    if (token === undefined) {
      throw Error('GetInfo: token is undefined!');
    }
    const { data } = await getInfo(token);
    if (data.role.length > 0) {
      return {
        role: data.role,
        name: data.user_name,
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
}

export const UserModule = getModule(User);
