// react & next
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
// api
import { getServerMe } from "@/lib/api/serverApi";
// styles
import css from "./ProfilePage.module.css";

export const metadata: Metadata = {
  title: "Note Hub - Profile",
  description: "Note Hub - profile page",
  openGraph: {
    title: `Note Hub - Profile`,
    description: "Note Hub - profile page",
    url: `https://notehub.com/profile`,
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 644,
        height: 429,
        alt: "Note Hub",
      },
    ],
    type: "article",
  },
};

export default async function ProfilePage() {
  const user = await getServerMe();
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>

        <div className={css.avatarWrapper}>
          <Image
            src={user?.avatar || "/next.svg"}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p>Username: {user?.username}</p>
          <p>Email: {user?.email}</p>
        </div>
      </div>
    </main>
  );
}
