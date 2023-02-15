import React, { useState } from 'react';
import { addEmail } from '../firebase';
import DashboardRequiredFormInput from '../DashboardRequiredFormInput';

const EmailInputForm = ({ requestEmailList }) => {
  const [email, setEmail] = useState('');

  const addEmailToList = async (e) => {
    e.preventDefault();

    await addEmail(email)
      .then((result) => {
        setEmail('');
        requestEmailList();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <div className="h-min p-2">
      <p className="mb-4 text-lg select-none">Add Email to Email List</p>
      <form className="flex flex-col gap-4" onSubmit={addEmailToList}>
        <DashboardRequiredFormInput
          type="email"
          value={email}
          placeholder="Email"
          label="Email"
          setValue={setEmail}
          width="w-52"
        />
        <div className="flex justify-between">
          <p className="text-xs w-[60%]">
            Business Emails from clients in the Client List tool are
            automatically added.
          </p>
          <button
            type="submit"
            className="w-16 h-8 rounded-md bg-color3 transition-all hover:shadow-navigation"
          >
            Insert
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmailInputForm;
