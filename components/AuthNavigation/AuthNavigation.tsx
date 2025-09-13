"use client";

// next
import Link from "next/link";
// store
import { useAuthStore } from "@/lib/store/authStore";
// api
import { logout } from "@/lib/api/clientApi";
// css
import css from "./AuthNavigation.module.css";
import { useRouter } from "next/navigation";

export default function AuthNavigation() {
  const router = useRouter();
  // Отримуємо поточну сесію та юзера
  const { isAuthenticated, user, clearIsAuthenticated } = useAuthStore();

  const handleLogout = async () => {
    // Викликаємо logout
    await logout();
    // Чистимо глобальний стан
    clearIsAuthenticated();
    // Виконуємо навігацію на сторінку авторизації
    router.push("/sign-in");
  };

  // Якщо є сесія - відображаємо Logout та інформацію про користувача
  // інакше - посилання на логін та реєстрацію
  return (
    <>
      {isAuthenticated && (
        <>
          <li className={css.navigationItem}>
            <Link href="/profile" prefetch={false} className={css.navigationLink}>
              Profile
            </Link>
          </li>
          <li className={css.navigationItem}>
            <p className={css.userEmail}>{user?.email}</p>
            <button className={css.logoutButton} onClick={handleLogout}>
              Logout
            </button>
          </li>
        </>
      )}
      {!isAuthenticated && (
        <>
          <li className={css.navigationItem}>
            <Link href="/sign-in" prefetch={false} className={css.navigationLink}>
              Sign in
            </Link>
          </li>
          <li className={css.navigationItem}>
            <Link href="/sign-up" prefetch={false} className={css.navigationLink}>
              Sign up
            </Link>
          </li>
        </>
      )}
    </>
  );
}
