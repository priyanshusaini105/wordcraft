import { createContext, ReactNode, useEffect, useLayoutEffect, useState } from 'react';
import { IProfileData } from '@/types';
import { auth, database } from '@/config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { ref, child, get } from 'firebase/database';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';

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

  // get user profile data from firebase
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



  // redirect if user is visited to restricted links
  const router = useRouter();

  const restrictedLinks = ['/write', '/profile', '/edit'];
  const restrictedIfLogedIn=['/login','/signup']

  useEffect(() => {
      const isRestrictedPage = restrictedLinks.some(link => router.pathname.startsWith(link));
      const isLoginRestrictedPage = restrictedIfLogedIn.some(link => router.pathname.startsWith(link));

      if (!profileData.login && isRestrictedPage) {
          router.push('/login');
      }else if(profileData.login && isLoginRestrictedPage){
          router.push('/');
      }
  }, [profileData.login, router]);

  return (
    <ProfileContext.Provider value={profileData}>
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileProvider;

// export  function getServerSideProps():GetServerSideProps {
//   const [profileDat, setProfileData] = useState<IProfileData>({
//     name: '',
//     email: '',
//     photo: '',
//     userId: '',
//     role: 'reader',
//     login: false,
//   });
// console.log(profileDat)
//   return {
//     props: {
//       profileDat
//     }, // will be passed to the page component as props
//   }
// }