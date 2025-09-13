import { NextRequest, NextResponse } from "next/server";
import { api } from "../../api";
import { cookies } from "next/headers";
import { parse } from "cookie";
import { isAxiosError } from "axios";
import { logErrorResponse } from "../../_utils/utils";

export async function POST(req: NextRequest) {
  try {
    // Парсимо тіло запиту
    const body = await req.json();
    // Виконуємо запит до API
    const apiRes = await api.post("auth/login", body);
    // Ініціалізуємо cookieStore
    const cookieStore = await cookies();
    // Дістаємо set-cookie з хедерів відповіді
    const setCookie = apiRes.headers["set-cookie"];

    if (setCookie) {
      // Якщо set-cookie — масив, беремо як є, інакше примусово робимо масив
      const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];
      // Проходимо по кожному cookie
      for (const cookieStr of cookieArray) {
        const parsed = parse(cookieStr);
        // Створюємо опції для cookie
        const options = {
          expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
          path: parsed.Path,
          maxAge: Number(parsed["Max-Age"]),
        };
        // Встановлюємо токени у cookieStore
        if (parsed.accessToken) cookieStore.set("accessToken", parsed.accessToken, options);
        if (parsed.refreshToken) cookieStore.set("refreshToken", parsed.refreshToken, options);
      }

      return NextResponse.json(apiRes.data, { status: apiRes.status });
    }

    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        // { error: error.message, response: error.response?.data },
        // { status: error.status }
        { error: error.response?.data?.message || error.message, response: error.response?.data },
        { status: error.response?.status || 500 }
      );
    }
    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
