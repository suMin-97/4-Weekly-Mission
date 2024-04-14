import { useAsync } from "@/src/sharing/util";
import { publicAxios } from "@/src/sharing/util";
import { UserRawData } from "@/src/user/type";

export const useGetUser = () => {
  const getUser = () => publicAxios.get<{ data: UserRawData }>("sample/user");
  const { loading, error, data } = useAsync(getUser);
  return { loading, error, data: data?.data ?? null };
};
