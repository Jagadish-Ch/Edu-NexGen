import { initialSignInFormData, initialUserSignUpFormData, initialOtherSignUpFormData } from "@/config";
import { checkAuthService, loginService, registerService } from "@/services";
import { SuccessMessage, ErrorMessage, LoadingMessage, promiseToast } from "@/components/Alert-Toast";
import { createContext, useEffect, useState } from "react";
import Loader from "@/components/ui/CommetLoader"

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [signInFormData, setSignInFormData] = useState(initialSignInFormData);
  const [signUpFormData, setSignUpFormData] = useState(initialUserSignUpFormData);
  const [auth, setAuth] = useState({
    authenticate: false,
    user: null,
  });
  const [loading, setLoading] = useState(false);

  function clearSignInFormData() {
    setSignInFormData(initialSignInFormData);
  }

  function clearSignUpFormData() {
    setSignUpFormData(initialUserSignUpFormData);
  }

  async function handleRegisterUser(event) {
    event.preventDefault();
    setLoading(true);
    const data = await registerService(signUpFormData);

    if(data?.success){
      console.log("Registered Data: ", data)
      SuccessMessage("Registered Successfully...!");
      setTimeout(() => {
        window.location.href = "/auth"
      }, 2000);
      setLoading(false);
    }
    else{
      setLoading(false);
      clearSignUpFormData();
      ErrorMessage(data.message);
    }    
  }

  async function handleGuestUserLogin(demoLoginCredentials) {
    
    // loading && LoadingMessage(loading, "Loading Please Wait...");
    console.log(demoLoginCredentials);
    setLoading(true);
    const data = await loginService(demoLoginCredentials);
    console.log(data, "datadatadatadatadata");
    
    if (data?.success) {
      sessionStorage.setItem(
        "accessToken",
        JSON.stringify(data.data.accessToken)
      );
      
      SuccessMessage("Login Successfully...!");
      setLoading(false);
      setTimeout(() => {
        setAuth({
          authenticate: true,
          user: data.data.user,
        });
      }, 1000);
      setLoading(false);

    } else {
      setAuth({
        authenticate: false,
        user: null,
      });
      setLoading(false);
      clearSignInFormData();
      // ErrorMessage("Invalid email or password!");
      ErrorMessage(data?.message);
    }
  }

  async function handleLoginUser(event) {
    event.preventDefault();
    
    // loading && LoadingMessage(loading, "Loading Please Wait...");
    setLoading(true);
    const data = await loginService(signInFormData);
    console.log(data, "datadatadatadatadata");
    
    if (data?.success) {
      sessionStorage.setItem(
        "accessToken",
        JSON.stringify(data.data.accessToken)
      );
      
      SuccessMessage("Login Successfully...!");
      setLoading(false);
      setTimeout(() => {
        setAuth({
          authenticate: true,
          user: data.data.user,
        });
      }, 1000);
      setLoading(false);

    } else {
      setAuth({
        authenticate: false,
        user: null,
      });
      setLoading(false);
      clearSignInFormData();
      // ErrorMessage("Invalid email or password!");
      ErrorMessage(data?.message);
    }
  }

  //check auth user

  async function checkAuthUser() {
    try {
      setLoading(true);
      const data = await checkAuthService();
      if (data?.success) {
        setAuth({
          authenticate: true,
          user: data.data.user,
        });
        setLoading(false);
      
      } else {
        setAuth({
          authenticate: false,
          user: null,
        });
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      if (!error?.response?.data?.success) {
        setAuth({
          authenticate: false,
          user: null,
        });
        setLoading(false);
      }
    }
  }

  function resetCredentials() {
    setLoading(true);
    setAuth({
      authenticate: false,
      user: null,
    });
    setSignInFormData(initialSignInFormData);
    setLoading(false);
  }

  useEffect(() => {
    
    checkAuthUser();
    
  }, []);

  console.log(auth, "gf");

  return ( 
    <AuthContext.Provider
      value={{
        loading,
        signInFormData,
        setSignInFormData,
        signUpFormData,
        setSignUpFormData,
        handleRegisterUser,
        handleLoginUser,
        handleGuestUserLogin,
        auth,
        resetCredentials,
        clearSignInFormData,
        clearSignUpFormData
      }}
    >
      {loading? <Loader/> : children}
    </AuthContext.Provider>
  );
}
