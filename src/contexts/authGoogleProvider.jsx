import { createContext, useState } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../services/firebase";

const provider = new GoogleAuthProvider();

export const AuthGoogleContext = createContext({});

export function AuthGoogleProvider({ children }) {
  const auth = getAuth(app);
  const [user, setUser] = useState(null);

  const signInGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;

        setUser(user);

        sessionStorage.setItem("@AuthFireBase:token", token);
        sessionStorage.setItem("@AuthFireBase:user", JSON.stringify(user));
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };
  return (
    <AuthGoogleContext.Provider
      value={{ signInGoogle, signed: !!user }}>
    </AuthGoogleContext.Provider>
  );
}
