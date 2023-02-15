import React from "react";
import EmailDocument from "./EmailDocument";

const EmailPresetList = ({
  emailList,
  requestEmailPresetList,
  setSelectedEmailPreset,
}) => {
  return (
    <div className="p-2 mb-16 max-h-[64rem] overflow-y-auto w-full md:w-[49%] lg:w-[32%]">
      <div className="flex flex-row text-md">
        <p className="text-lg p-2">Email Presets</p>
      </div>
      {!emailList || !emailList.length ? (
        <p className="px-4">No email presets.</p>
      ) : (
        emailList.map((email) => {
          return (
            <EmailDocument
              key={email.emailPresetName}
              emailData={email}
              requestEmailPresetList={requestEmailPresetList}
              setSelectedEmailPreset={setSelectedEmailPreset}
            />
          );
        })
      )}
    </div>
  );
};

export default EmailPresetList;
