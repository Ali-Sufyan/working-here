import { UserI } from "../../user/user.types";

export interface TokenI {
  token: string;
  refreshToken: string;
  tokenExpireTime: string;
  refreshTokenExpireTime: string;
}

export interface AuthI extends TokenI {
  user: Partial<UserI> | undefined;
  isEmailSent: boolean;
}

export interface LoginDataI {
  email: string;
  password: string;
}
export interface RefreshTokenI {
  refreshToken: string;
}

export interface forgotPasswordI {
  email: string;
}

export interface resetPasswordI {
  password: string;
  confirmPassword: string;
  token: string;
}

export interface RegisterDataI
  extends Pick<UserI, "email" | "given_name" | "family_name"> {
  password: string;
  firstName: string;
  lastName: string;
}

// payloads
export interface AuthPayloadI {
  user: UserI;
  tokens: TokenPayloadI;
}
export interface TokenPayloadI {
  access: {
    token: string;
    expires: string;
  };
  refresh: {
    token: string;
    expires: string;
  };
}
