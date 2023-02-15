import React, { useState } from "react";
import EmailInputForm from "./EmailInputForm";
import "react-tippy/dist/tippy.css";
import EmailListComponent from "./EmailListComponent";
import { Tooltip } from "react-tippy";

const EmailList = ({
  emailList,
  setEmailList,
  requestEmailList,
  selectedEmailList,
  setSelectedEmailList,
}) => {
  const [listSelected, setListSelected] = useState(false);

  const handleListSelected = (e) => {
    if (e.target.checked) {
      setListSelected(true);
      setSelectedEmailList(emailList);
    } else {
      setListSelected(false);
      setSelectedEmailList([]);
    }
  };

  return (
    <div className="p-2 w-full md:w-[49%] lg:w-[32%]">
      <div className="flex gap-2">
        <Tooltip className="p-2 w-5 my-auto" title="Select all" size="small">
          <input
            className="w-5 h-5 cursor-pointer"
            type="checkbox"
            checked={listSelected}
            onChange={handleListSelected}
          />
        </Tooltip>
        <p className="p-2 text-lg">Email List</p>
      </div>

      <div className="mb-6 flex flex-col max-h-[12rem] overflow-y-auto">
        {!emailList || !emailList.length ? (
          <p className="px-4">Email list is empty</p>
        ) : (
          emailList.map((email, index) => {
            return (
              <EmailListComponent
                key={index}
                email={email}
                index={index}
                selectedEmailList={selectedEmailList}
                setSelectedEmailList={setSelectedEmailList}
                setEmailList={setEmailList}
                listSelected={listSelected}
              />
            );
          })
        )}
      </div>
      <EmailInputForm requestEmailList={requestEmailList} />
    </div>
  );
};

export default EmailList;
