"use client";
// next & react
import { useState } from "react";
import { useRouter } from "next/navigation";
// api route handlers
import { ApiError } from "@/app/api/api";
// api functions
import { loginUser, LoginRequest } from "@/lib/api/clientApi";
// store
import { useAuthStore } from "@/lib/store/authStore";
// styles
import css from "./SignInPage.module.css";

export default function SignInPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  const setUser = useAuthStore((state) => state.setUser);

  const handleSubmit = async (formData: FormData) => {
    try {
      // Типізуємо дані форми
      const formValues = Object.fromEntries(formData) as unknown as LoginRequest;
      // Виконуємо запит
      const res = await loginUser(formValues);
      // Виконуємо редірект або відображаємо помилку
      if (res) {
        // Записуємо користувача у глобальний стан
        setUser(res);
        router.push("/profile");
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      setError(
        (error as ApiError).response?.data?.error ??
          (error as ApiError).message ??
          "Oops... some error"
      );
    }
  };

  return (
    <main className={css.mainContent}>
      <form className={css.form} action={handleSubmit}>
        <h1 className={css.formTitle}>Sign in</h1>
        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            autoComplete="email"
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            autoComplete="password"
            required
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Sign in
          </button>
        </div>

        <p className={css.error}>{error}</p>
      </form>
    </main>
  );
}
