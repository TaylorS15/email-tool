import React, { createContext, useEffect, Suspense } from 'react';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import Authentication from './Authentication';
import Loading from '../Loading';
const Dashboard = React.lazy(() => import('./Dashboard'));

export const UserContext = createContext({
  user: null,
  setUser: () => null,
});

const Admin = () => {
  const [user, setUser] = React.useState(null);
  const value = { user, setUser };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user.uid);
      } else {
        setUser(null);
      }
    });
  }, []);

  return (
    <div className="relative flex flex-col text-color5">
      <article className="mt-32 mx-6 md:mt-48 md:px-[15%] md:mx-0 xl:px-[20%] md:relative">
        <p className="w-64 text-4xl md:w-auto">Administration Panel</p>
        <UserContext.Provider value={value}>
          <Authentication />
          {user !== null ? (
            <Suspense fallback={<Loading />}>
              <Dashboard />
            </Suspense>
          ) : null}
        </UserContext.Provider>
      </article>
    </div>
  );
};

export default Admin;
