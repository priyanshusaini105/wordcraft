import { createContext, ReactNode, useEffect, useState } from 'react';
import { IProfileData } from '@/types';
import { auth, database } from '@/config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { ref, child, get } from 'firebase/database';

interface ProfileProviderProps {
  children: ReactNode;
}

export const ProfileContext = createContext<IProfileData>({
    name: '',
    email: '',
    photo: '',
    userId: '',
    role: 'reader',
    login: false,
});

const ProfileProvider = ({ children }: ProfileProviderProps) => {
  const [profileData, setProfileData] = useState<IProfileData>({
    name: '',
    email: '',
    photo: '',
    userId: '',
    role: 'reader',
    login: false,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const profileRef = child(ref(database), `users/${user.uid}/profile`);
          const snapshot = await get(profileRef);

          if (snapshot.exists()) {
            const data = snapshot.val() as IProfileData;
            setProfileData({
              email: data.email,
              photo: data.photo,
              name: data.name,
              userId: user.uid,
              role: data.role,
              login: true,
            });
          } else {
            console.log('No data available');
          }
        } catch (error) {
          console.error(error);
        }
      } else {
        setProfileData({
            ...profileData,
            login: false,
        });
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <ProfileContext.Provider value={profileData}>
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileProvider;
