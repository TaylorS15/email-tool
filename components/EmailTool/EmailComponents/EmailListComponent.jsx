import React, { useState } from 'react';
import { Tooltip } from 'react-tippy';
import { deleteEmail } from '../firebase';
import ExitButton from '../imgs/exit.png';
import CheckmarkImage from '../imgs/checkmark.svg';
import 'react-tippy/dist/tippy.css';

const EmailListComponent = ({
  email,
  index,
  setEmailList,
  selectedEmailList,
  setSelectedEmailList,
  listSelected,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleDeletion = async () => {
    try {
      await deleteEmail(email);
      setEmailList((prev) => prev.filter((item) => item !== email));
    } catch (err) {
      console.log(err);
    }
  };

  const handleSelectEmail = (e) => {
    if (e.target.checked) {
      setIsChecked(e.target.checked);
      setSelectedEmailList([...selectedEmailList, email]);
    } else {
      setIsChecked(e.target.checked);
      setSelectedEmailList(selectedEmailList.filter((e) => e !== email));
    }
  };

  return (
    <div
      className={`${
        index % 2 === 0 ? 'bg-lightgray' : ''
      } rounded-md flex gap-3 h-12 min-h-[3rem] hover:bg-lightcolor3`}
    >
      <input
        type="checkbox"
        className="w-4 ml-2 my-auto cursor-pointer"
        checked={isChecked || listSelected}
        onChange={handleSelectEmail}
      />
      {isDeleting ? (
        <div className="flex gap-3">
          <Tooltip className="my-auto" title="Cancel" size="small">
            <button
              type="button"
              className="w-6 h-6 rounded-full transition-all hover:bg-color3"
              onClick={() => setIsDeleting(false)}
            >
              <img
                className="w-3 m-auto"
                src={ExitButton}
                alt="cancel deletion"
              />
            </button>
          </Tooltip>
          <Tooltip className="my-auto" title="Confirm Deletion" size="small">
            <button
              type="button"
              className="w-6 h-6 rounded-full transition-all hover:bg-lightred"
              onClick={() => handleDeletion()}
            >
              <img
                className="w-3 m-auto"
                src={CheckmarkImage}
                alt="confirm deletion"
              />
            </button>
          </Tooltip>
        </div>
      ) : (
        <Tooltip className="my-auto" title="Delete" size="small">
          <button
            type="button"
            className="w-6 h-6 rounded-full transition-all hover:bg-color3"
            onClick={() => setIsDeleting(true)}
          >
            <img className="w-3 m-auto" src={ExitButton} alt="delete email" />
          </button>
        </Tooltip>
      )}

      <p key={email} className="my-auto">
        {email}
      </p>
    </div>
  );
};

export default EmailListComponent;
