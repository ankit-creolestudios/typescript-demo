import React, { FunctionComponent, useEffect, useState } from "react";
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";

interface GoogleSignInComponentProps {
  loginSuccess: (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => void;
}

export const GoogleSignInComponent: FunctionComponent<
  GoogleSignInComponentProps
> = ({ loginSuccess }) => {
  const [loginFailed, setLoginFailed] = useState<boolean>(false);
  //   useEffect(() => {
  //     if (loginFailed) {
  //       alert("login");
  //     }
  //   }, [loginFailed]);
  //   console.log(process.env.REACT_APP_CLIENT_ID);
  return (
    <div className="text-center mb-4">
      <h1 className="h3 mb-3 font-weight-normal">Welcome to Portal</h1>
      <p>Sign In</p>
      <GoogleLogin
        clientId={`307263460012-qmcvfr5jrj3bedj9sfgm6f6lcnejt772.apps.googleusercontent.com`}
        buttonText="Google"
        onSuccess={loginSuccess}
        onFailure={(response: any) => {
          setLoginFailed(true);
        }}
        cookiePolicy={"single_host_origin"}
        responseType="code,token"
      />
    </div>
  );
};
