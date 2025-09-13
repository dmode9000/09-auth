// lib/api/serverApi.ts — для функцій, які викликаються у серверних компонентах
// (до params потрібно додавати cookeis у headers.).

// next
import { cookies } from "next/headers";
// api
import { nextServer } from "./api";
// types
import { User } from "@/types/user";

// check session validity
export const checkServerSession = async () => {
  // get current cookies
  const cookieStore = await cookies();
  const res = await nextServer.get("/auth/session", {
    headers: {
      // pass cookies further
      Cookie: cookieStore.toString(),
    },
  });

  // return full response, for middleware access to new cookies
  return res;
};

// get current user data for server components
export const getServerMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};
