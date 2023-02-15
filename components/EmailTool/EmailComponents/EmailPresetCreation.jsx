import React, { useState } from 'react';
import { createEmailPresetReference } from '../firebase';
import DashboardRequiredFormInput from '../DashboardRequiredFormInput';

const EmailPresetCreation = ({ emailList, requestEmailPresetList }) => {
  const [emailPresetName, setEmailPresetName] = useState('');
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');

  const emailCreate = async (e) => {
    e.preventDefault();

    const emailData = {
      emailPresetName,
      emailSubject,
      emailBody,
    };

    await createEmailPresetReference(emailData)
      .then((data) => {
        emailList.push(data);
        setEmailPresetName('');
        setEmailSubject('');
        setEmailBody('');
        requestEmailPresetList();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <div className="mb-6 h-min p-2 w-full md:w-[49%] lg:w-[32%]">
      <p className="text-lg p-2 select-none">Email Preset Creation</p>
      <form
        className="flex relative flex-col flex-wrap mt-2 mx-2 gap-4"
        onSubmit={emailCreate}
      >
        <DashboardRequiredFormInput
          type="name"
          value={emailPresetName}
          placeholder="Preset Name"
          label="Preset Name"
          setValue={setEmailPresetName}
          width="w-48"
        />
        <DashboardRequiredFormInput
          type="name"
          value={emailSubject}
          placeholder="Email Subject"
          label="Email Subject"
          setValue={setEmailSubject}
          width="w-48"
        />
        <textarea
          className="min-h-[5rem] max-h-[8rem] p-2 rounded-md shadow-blur focus:outline focus:outline-2 focus:outline-color3"
          type="text"
          name="message"
          maxLength={1000}
          value={emailBody}
          onChange={(e) => setEmailBody(e.target.value)}
          placeholder="Email Body"
        />
        <button
          type="submit"
          className="w-32 h-10 mb-2 bg-color3 text-color4 rounded-md p-1 text-md transition-all hover:shadow-navigation"
        >
          Create Preset
        </button>
      </form>
    </div>
  );
};

export default EmailPresetCreation;
