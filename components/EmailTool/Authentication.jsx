import React, { useState, useRef, useContext } from 'react';
import { auth, signInUser, signOutUser } from './firebase';
import { UserContext } from './Admin.jsx';

const Authentication = () => {
  const form = useRef();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState(false);

  const { user, setUser } = useContext(UserContext);

  const login = async (e) => {
    e.preventDefault();
    if (user === null) {
      await signInUser(auth, email, password)
        .then((userCredential) => {
          setFormError(false);
          setUser(userCredential.user.uid);
        })
        .catch((error) => {
          setFormError(true);
          console.log(error.code, error.message);
        });
    } else {
      console.log('Already signed in.');
    }
  };

  const signOut = async () => {
    if (user !== null) {
      await signOutUser(auth)
        .then(() => {
          setUser(null);
        })
        .catch((error) => console.log('Error signing out: ', error));
    } else {
      console.log('Already signed out.');
    }
  };

  return (
    <div className="mb-12">
      {user === null ? (
        <form
          className="mt-12 mb-12 flex flex-col gap-6"
          ref={form}
          onSubmit={login}
        >
          <div className="flex flex-col gap-2">
            <p className="text-xl mb-2">Sign In:</p>
            <input
              type="email"
              className="w-72 text-xl rounded-md p-2 shadow-blur focus:outline focus:outline-2 focus:outline-color3"
              placeholder="Email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="w-72 text-xl rounded-md p-2 shadow-blur focus:outline focus:outline-2 focus:outline-color3"
              placeholder="Password"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {formError ? (
            <div className="flex flex-row gap-4">
              <button
                type="submit"
                className="w-32 h-12 bg-color3 rounded-md p-2 text-lg transition-all hover:shadow-navigation"
              >
                Sign In
              </button>
              <div className="w-36 h-12 pt-3 text-color2 bg-lightred rounded-md text-center transition-opacity">
                ❌ Error, try again.
              </div>
            </div>
          ) : (
            <button
              type="submit"
              className="w-32 h-12 bg-color3 rounded-md p-2 text-lg transition-all hover:shadow-navigation"
            >
              Sign In
            </button>
          )}
        </form>
      ) : (
        <button
          onClick={() => signOut()}
          className="mt-12 w-28 h-10 bg-color3 rounded-md text-md transition-all hover:shadow-navigation"
        >
          Sign Out
        </button>
      )}
    </div>
  );
};

export default Authentication;
