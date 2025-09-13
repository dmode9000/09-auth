//next
import Link from "next/link";
// Components
import TagsMenu from "@/components/TagsMenu/TagsMenu";
import AuthNavigation from "../AuthNavigation/AuthNavigation";
//styles
import css from "@/components/Header/Header.module.css";

export default async function Header() {
  return (
    <header className={css.header}>
      <Link className={css.headerLink} href="/" aria-label="Home">
        NoteHub
      </Link>
      <nav className={css.headerLink} aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li>
            <TagsMenu />
          </li>

          <AuthNavigation />
        </ul>
      </nav>
    </header>
  );
}
