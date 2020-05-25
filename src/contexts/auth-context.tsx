import React, { FC, useState, useEffect } from 'react';
import {
  User,
  SignIn,
  ServiceResolver,
  ApiResponse,
  JwtToken,
  ErrorResponse,
} from '@api';
import { defaultProfileImage } from '@images';
import { SessionStorageHelper, UserAuthHelper } from '@helpers';

interface AuthContextState {
  authenticated: boolean;
  avatar: string;
  member: User;
  signIn?: (
    credentials: SignIn,
  ) => Promise<ApiResponse<JwtToken | ErrorResponse>>;
  signOut?: () => void;
  setMember?: (user: User) => void;
}

const defaultMember: User = {
  username: '',
  bio: '',
  technologies: [],
};

const defaultAuthContextState: AuthContextState = {
  authenticated: false,
  avatar: defaultProfileImage,
  member: defaultMember,
};

export const AuthContext = React.createContext(defaultAuthContextState);
export const AuthConsumer = AuthContext.Consumer;

export const AuthProvider: FC = (props) => {
  const [authContextState, setAuthContextState] = useState(
    defaultAuthContextState,
  );

  const getUser = async (): Promise<ApiResponse<User | ErrorResponse>> => {
    const userId = UserAuthHelper.getUserId();
    const api = ServiceResolver.apiResolver();
    const response = (await api.getUser(userId)) as ApiResponse<
      User | ErrorResponse
    >;
    return response;
  };

  const signIn = async (
    credentials: SignIn,
  ): Promise<ApiResponse<JwtToken | ErrorResponse>> => {
    const auth = ServiceResolver.authResolver();
    const response = (await auth.signIn(credentials)) as ApiResponse<
      JwtToken | ErrorResponse
    >;

    if (response.ok) {
      SessionStorageHelper.storeJwt(response.data as JwtToken);
      const userResponse = (await getUser()) as ApiResponse<
        User | ErrorResponse
      >;

      // TODO: simplify, will always be true
      if (userResponse.ok) {
        const user = userResponse.data as User;
        const authContextState = {
          authenticated: true,
          avatar: user.profilePictureUrl || defaultProfileImage,
          member: user,
          signIn: signIn,
        };

        setAuthContextState(authContextState);
      }
    }
    return response;
  };

  const signOut = () => {
    SessionStorageHelper.deleteJwt();
  };

  const setMember = (user: User) => {
    const authContext = {
      ...authContextState,
      member: user,
      avatar: user.profilePictureUrl || defaultProfileImage,
    };

    setAuthContextState(authContext);
  };

  useEffect(() => {
    const initializeAuthContext = async () => {
      const isUserAuthenticated = UserAuthHelper.isUserAuthenticated();
      const defaultAuthContextState: AuthContextState = {
        authenticated: isUserAuthenticated,
        avatar: defaultProfileImage,
        member: defaultMember,
      };

      if (isUserAuthenticated) {
        const response = await getUser();
        const user = response.data as User;
        defaultAuthContextState.member = response.data as User;
        defaultAuthContextState.avatar =
          user.profilePictureUrl || defaultProfileImage;
      }
      setAuthContextState(defaultAuthContextState);
    };

    initializeAuthContext();
  }, []);

  return (
    <AuthContext.Provider
      value={{ ...authContextState, signIn, signOut, setMember }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
