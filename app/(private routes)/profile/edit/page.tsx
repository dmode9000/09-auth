"use client";
// Ця сторінка має бути клієнтським компонентом, який відповідає за всю клієнтську логіку (отримання поточних даних користувача, роботу з формою тощо).

// next & react
import { useRouter } from "next/navigation";
import Image from "next/image";
// store
import { useAuthStore } from "@/lib/store/authStore";
// api
import { setMe } from "@/lib/api/clientApi";
// styles
import css from "./EditProfilePage.module.css";

export default function EditProfilePage() {
  const router = useRouter();
  const { user, setUser } = useAuthStore();

  const handleSubmit = async (formData: FormData) => {
    const username = formData.get("username") as string;
    if (user && username) {
      try {
        const updatedUser = await setMe(username);
        setUser(updatedUser);
        router.push("/profile");
      } catch (error) {
        console.error("Failed to update profile:", error);
      }
    }
  };

  const handleCancel = () => {
    router.push("/profile");
  };

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src={user?.photoUrl || "/globe.svg"}
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />

        <form className={css.profileInfo} action={handleSubmit}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              name="username"
              id="username"
              type="text"
              className={css.input}
              defaultValue={user?.username}
            />
          </div>

          <p>Email: {user?.email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button type="button" className={css.cancelButton} onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
