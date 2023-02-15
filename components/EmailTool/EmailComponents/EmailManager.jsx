import React from "react";
import EmailPresetCreation from "./EmailPresetCreation";
import EmailPresetList from "./EmailPresetList";
import EmailList from "./EmailList";
import EmailSender from "./EmailSender";

const EmailManager = ({
  emailPresetList,
  requestEmailPresetList,
  emailList,
  requestEmailList,
  setEmailList,
}) => {
  const [selectedEmailPreset, setSelectedEmailPreset] = React.useState({});
  const [selectedEmailList, setSelectedEmailList] = React.useState([]);

  return (
    <div className="mb-16 shadow-blur rounded-lg backdrop-blur-2xl">
      <div className="h-4 bg-color3 rounded-t-md"></div>
      <div className="flex flex-col flex-wrap md:flex-row md:justify-between">
        <EmailPresetCreation
          emailList={emailPresetList}
          requestEmailPresetList={requestEmailPresetList}
        />
        <EmailPresetList
          emailList={emailPresetList}
          requestEmailPresetList={requestEmailPresetList}
          setSelectedEmailPreset={setSelectedEmailPreset}
        />
        <EmailList
          emailList={emailList}
          requestEmailList={requestEmailList}
          setEmailList={setEmailList}
          selectedEmailList={selectedEmailList}
          setSelectedEmailList={setSelectedEmailList}
        />
        <EmailSender
          selectedEmailList={selectedEmailList}
          selectedEmailPreset={selectedEmailPreset}
          setSelectedEmailList={setSelectedEmailList}
          setSelectedEmailPreset={setSelectedEmailPreset}
        />
      </div>
    </div>
  );
};

export default EmailManager;
