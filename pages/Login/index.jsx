import React, { useContext } from "react";
import { AuthGoogleContext } from "../../src/contexts/authGoogleProvider";

export default function Login() {
  const { signInGoogle } = useContext(AuthGoogleContext);
  return (
    <div>
      <button onClick={()=> signInGoogle()}>Logar com google</button>
    </div>
  );
}
