import { axiosInstance, useAsync } from "@/src/sharing/util";
import { useCallback, useEffect } from "react";
import { Token } from "../type";

type UseSignUpParams = { email: string; password: string };

export const useSignUp = ({ email, password }: UseSignUpParams) => {
  const signUp = useCallback(
    () =>
      axiosInstance.post<{ data: Token }>("sign-up", {
        email,
        password,
      }),
    [email, password]
  );
  const { execute, loading, error, data } = useAsync(signUp, true);

  useEffect(() => {
    if (data?.data.accessToken) {
      localStorage.setItem("accessToken", data.data.accessToken);
    }
  }, [data?.data.accessToken]);

  return {
    execute,
    loading,
    error,
    data,
  };
};
