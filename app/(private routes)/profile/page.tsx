// app/(private routes)/profile/page.tsx

import Link from 'next/link';
import { getServerMe } from '@/lib/api/serverApi';
import css from "./ProfilePage.module.css";

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
      <img
        src="Avatar"
        alt="User Avatar"
        width={120}
        height={120}
        className={css.avatar}
      />
    </div>
    <div className={css.profileInfo}>
      <p>
        Username: your_username
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
