import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { api } from "../../api";
import { parse } from "cookie";
import { isAxiosError } from "axios";
import { logErrorResponse } from "../../_utils/utils";

export async function GET() {
  try {
    // Отримуємо інстанс для роботи з cookie
    const cookieStore = await cookies();
    // Дістаємо токени з cookie
    const accessToken = cookieStore.get("accessToken")?.value;
    const refreshToken = cookieStore.get("refreshToken")?.value;
    // Якщо accessToken є — сесія валідна
    if (accessToken) {
      return NextResponse.json({ success: true });
    }
    // Якщо accessToken немає — перевіряємо refreshToken
    if (refreshToken) {
      // Виконуємо запит до API, передаючи всі cookie у заголовку
      const apiRes = await api.get("auth/session", {
        headers: {
          // перетворюємо cookie у рядок
          Cookie: cookieStore.toString(),
        },
      });

      // Якщо бекенд повернув нові токени — встановлюємо їх
      const setCookie = apiRes.headers["set-cookie"];

      if (setCookie) {
        const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];
        for (const cookieStr of cookieArray) {
          const parsed = parse(cookieStr);

          const options = {
            expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
            path: parsed.Path,
            maxAge: Number(parsed["Max-Age"]),
          };

          if (parsed.accessToken) cookieStore.set("accessToken", parsed.accessToken, options);
          if (parsed.refreshToken) cookieStore.set("refreshToken", parsed.refreshToken, options);
        }
        return NextResponse.json({ success: true }, { status: 200 });
      }
    }
    // Якщо немає refreshToken або API повернув пустий setCookie — сесія невалідна
    return NextResponse.json({ success: false }, { status: 200 });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json({ success: false }, { status: 200 });
    }
    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json({ success: false }, { status: 200 });
  }
}
