import React, { useState, useRef } from 'react';
import { Tooltip } from 'react-tippy';
import {
  updateEmailPresetReference,
  deleteEmailPresetReference,
} from '../firebase';
import ExitIcon from '../imgs/exit.png';
import ArrowImage from '../imgs/arrow.svg';

const EmailClient = ({
  emailData,
  requestEmailPresetList,
  setSelectedEmailPreset,
}) => {
  const form = useRef();

  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  const [editedEmailSubject, setEditedEmailSubject] = useState(
    emailData.emailSubject,
  );
  const [editedEmailBody, setEditedEmailBody] = useState(emailData.emailBody);
  const [originalEmailSubject, setOriginalEmailSubject] = useState(
    emailData.emailSubject,
  );
  const [originalEmailBody, setOriginalEmailBody] = useState(
    emailData.emailBody,
  );

  const editedData = {
    editedEmailSubject,
    editedEmailBody,
  };

  const handleEditPreset = (e) => {
    e.preventDefault();

    console.log(emailData, editedData);

    updateEmailPresetReference(emailData, editedData)
      .then((data) => {
        setIsEditing(false);

        setOriginalEmailSubject(data.editedEmailSubject);
        setOriginalEmailBody(data.editedEmailBody);
        setEditedEmailBody(data.editedEmailBody);
        setEditedEmailSubject(data.editedEmailSubject);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onCancelEdit = () => {
    setIsEditing(false);
    setEditedEmailSubject(originalEmailSubject);
    setEditedEmailBody(originalEmailBody);
  };

  const handleDelete = () => {
    deleteEmailPresetReference(emailData)
      .then(() => {
        setIsEditing(false);
        requestEmailPresetList();
      })
      .catch((err) => console.log(err));
  };

  const handleSelectPreset = (e) => {
    setIsSelected(true);
    setTimeout(() => {
      setIsSelected(false);
    }, 300);
    setSelectedEmailPreset(null);
    setSelectedEmailPreset(emailData);
  };

  return (
    <div className="flex relative flex-col">
      <article className="flex flex-row">
        <button
          className="w-16 h-8 my-auto rounded-md bg-color3 transition-all hover:shadow-navigation"
          onClick={handleSelectPreset}
        >
          Select
        </button>
        <div className="gap-4 inline-flex p-2">
          <img
            className={`${
              isOpen ? 'rotate-0' : '-rotate-90'
            } w-3 cursor-pointer transition-all`}
            src={ArrowImage}
            alt="arrow"
            onClick={() => setIsOpen(!isOpen)}
          />
        </div>
        <div
          className={`${
            isSelected ? 'bg-lightgreen' : ''
          } flex p-2 pl-2 w-full rounded-md justify-between cursor-pointer select-none transition-all duration-150 hover:bg-lightcolor3`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <p>{emailData.emailPresetName}</p>
        </div>
      </article>

      {isOpen ? (
        <div className="mb-6">
          {isEditing ? (
            <form
              ref={form}
              className="p-2 flex flex-col gap-4 max-w-[36rem]"
              onSubmit={handleEditPreset}
            >
              <div>
                <p>Email Subject:</p>
                <input
                  type="text"
                  className="w-full rounded-md p-1 mt-2 shadow-blur focus:outline focus:outline-2 focus:outline-color3"
                  placeholder={originalEmailSubject}
                  required
                  value={editedEmailSubject}
                  onChange={(e) => setEditedEmailSubject(e.target.value)}
                />
              </div>
              <div>
                <p>Email Body:</p>
                <textarea
                  className="w-full h-20 min-h-[5rem] max-h-[8rem] mt-2 rounded-md p-1 shadow-blur focus:outline focus:outline-2 focus:outline-color3"
                  placeholder={originalEmailBody}
                  required
                  value={editedEmailBody}
                  onChange={(e) => setEditedEmailBody(e.target.value)}
                />
              </div>
              <div>
                <Tooltip title="Cancel" size="small" position="bottom">
                  <button
                    type="button"
                    className="w-8 h-8 rounded-full transition-all hover:bg-color3"
                    onClick={() => onCancelEdit()}
                  >
                    <img
                      className="w-4 m-auto"
                      src={ExitIcon}
                      alt="cancel changes"
                    />
                  </button>
                </Tooltip>
                <button
                  type="submit"
                  className="w-16 h-8 ml-4 rounded-md bg-color3 transition-all hover:shadow-navigation"
                >
                  Save
                </button>
              </div>
              {isDeleting ? (
                <div className="flex flex-row justify-between">
                  <button
                    type="button"
                    className="w-24 h-8 mb-2 bg-color3 text-color5 rounded-md p-1 text-md transition-all hover:shadow-navigation"
                    onClick={() => setIsDeleting(false)}
                  >
                    Cancel
                  </button>
                  <Tooltip
                    title="Confirm deletion? All data will be permanently lost."
                    size="small"
                    position="bottom"
                  >
                    <button
                      type="button"
                      className="w-24 h-8 mb-2 bg-gray text-color5 rounded-md p-1 text-md transition-all hover:bg-lightred hover:shadow-navigation"
                      onClick={() => handleDelete()}
                    >
                      Confirm
                    </button>
                  </Tooltip>
                </div>
              ) : (
                <button
                  type="button"
                  className="w-24 h-8 mb-2 bg-color3 text-color5 rounded-md p-1 text-md transition-all hover:shadow-navigation"
                  onClick={() => setIsDeleting(true)}
                >
                  Delete
                </button>
              )}
            </form>
          ) : (
            <div className="p-2 flex flex-col gap-4 max-w-[36rem]">
              <div>
                <p>Email Subject:</p>
                <p className="p-1 rounded-md mt-2 bg-white outline outline-2 outline-color3">
                  {originalEmailSubject}
                </p>
              </div>
              <div>
                <p>Email Body:</p>
                <p className="p-1 rounded-md mt-2 bg-white outline outline-2 outline-color3">
                  {originalEmailBody}
                </p>
              </div>
              <button
                type="button"
                className="w-16 h-8 rounded-md bg-color3 transition-all hover:shadow-navigation"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </button>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default EmailClient;
