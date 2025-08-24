// app/(private routes)/profile/page.tsx

import Link from 'next/link';
import { getServerMe } from '@/lib/api/serverApi';
import css from "./ProfilePage.module.css";
import Image from "next/image";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Profile NoteHub",
  description: "User profile data",
  openGraph: {
    title: "Profile NoteHub",
    description: "User profile data",
    url: "https://09-auth-kappa-one.vercel.app/",
    siteName: "NoteHub",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub",
      },
    ],
    type: "article",
  },
};

const Profile = async () => {
  const user = await getServerMe();

  return (
      <main className={css.mainContent}>
  
  <div className={css.profileCard}>
      <div className={css.header}>
	     <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>Edit profile</Link>
	   </div>
     <div className={css.avatarWrapper}>
       <Image
            src={user.avatar}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
    </div>
    <div className={css.profileInfo}>
      <p>
        Username:{user.username}
      </p>
      <p>
        Email: {user.email}
      </p>
    </div>
  </div>
</main>

  );
};

export default Profile;
