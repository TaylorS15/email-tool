import React, { useState } from "react";
import { Tooltip } from "react-tippy";
import emailjs from "@emailjs/browser";
import { MoonLoader } from "react-spinners";

const EmailSender = ({
  selectedEmailPreset,
  selectedEmailList,
  setSelectedEmailPreset,
  setSelectedEmailList,
}) => {
  const [confirmingSend, setConfirmingSend] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailsSent, setEmailsSent] = useState(false);
  const [sendingError, setSendingError] = useState(false);

  const handleSendEmail = () => {
    setConfirmingSend(false);
    setLoading(true);

    if (!selectedEmailPreset || !selectedEmailList.length) {
      setLoading(false);
      setSendingError(true);
      setTimeout(() => {
        setSendingError(false);
      }, 3000);
    } else {
      selectedEmailList.forEach((email) => {
        const templateParams = {
          to_email: email,
          preset_subject: selectedEmailPreset.emailSubject,
          preset_body: selectedEmailPreset.emailBody,
        };

        emailjs
          .send(
            "service_18kut6i",
            "template_zy8zi7k",
            templateParams,
            "JRIASRf_UAV7BhpQz"
          )
          .then((result) => {
            setLoading(false);
            setEmailsSent(true);
            setTimeout(() => {
              setEmailsSent(false);
            }, 3000);
            setSelectedEmailPreset({});
            setSelectedEmailList([]);
            console.log(result.text);
          });
      });
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4 w-full md:w-1/2">
      <p className="text-lg">Send email</p>
      {!selectedEmailPreset.emailPresetName ? (
        <p>No selected email preset.</p>
      ) : (
        <div className="flex justify-between">
          <p>Selected email preset</p>
          <p>{selectedEmailPreset.emailPresetName}</p>
        </div>
      )}

      {!selectedEmailList.length ? (
        <p>Selected email list empty.</p>
      ) : (
        <div className="flex justify-between">
          <p>Selected email list</p>
          <p>{selectedEmailList.length}</p>
        </div>
      )}

      {!confirmingSend ? (
        <div className="flex gap-6 justify-between">
          <button
            type="button"
            className="w-24 h-8 mb-2 bg-color3 text-color5 rounded-md p-1 text-md transition-all hover:shadow-navigation"
            onClick={() => setConfirmingSend(true)}
          >
            Send Email
          </button>
          <MoonLoader
            className=""
            color={"#30343F"}
            loading={loading}
            size={25}
          />
          {emailsSent && (
            <p className="bg-lightgreen h-8 w-48 rounded-md text-center pt-[.22rem]">
              Emails Sent Successfully!
            </p>
          )}
          {sendingError && (
            <p className="bg-lightred h-8 w-48 rounded-md text-center pt-[.22rem]">
              Error Sending Emails!
            </p>
          )}
        </div>
      ) : (
        <div className="flex flex-row justify-between">
          <button
            type="button"
            className="w-24 h-8 mb-2 bg-color3 text-color5 rounded-md p-1 text-md transition-all hover:shadow-navigation"
            onClick={() => setConfirmingSend(false)}
          >
            Cancel
          </button>
          <Tooltip title="Confirm Email Send" size="small">
            <button
              type="button"
              className="w-24 h-8 mb-2 bg-gray text-color5 rounded-md p-1 text-md transition-all hover:bg-lightgreen hover:shadow-navigation"
              onClick={() => handleSendEmail()}
            >
              Confirm
            </button>
          </Tooltip>
        </div>
      )}
    </div>
  );
};

export default EmailSender;
