import React, { useState, useRef } from 'react';
import { updateServiceField, deleteServiceField } from '../../firebase';
import { Tooltip } from 'react-tippy';
import CheckmarkImage from '../../imgs/checkmark.svg';
import ExitIcon from '../../imgs/exit.png';
import ArrowIcon from '../../imgs/arrow2.svg';
import 'react-tippy/dist/tippy.css';

const ServiceBox = ({ clientData, service, setServiceList }) => {
  const form = useRef();
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [editedName, setEditedName] = useState(service.serviceName);
  const [originalName, setOriginalName] = useState(service.serviceName);
  const [editedPrice, setEditedPrice] = useState(service.servicePrice);
  const [originalPrice, setOriginalPrice] = useState(service.servicePrice);
  const [editedNotes, setEditedNotes] = useState(service.serviceNotes);
  const [originalNotes, setOriginalNotes] = useState(service.serviceNotes);
  const [editedDate, setEditedDate] = useState(service.serviceDate);
  const [originalDate, setOriginalDate] = useState(service.serviceDate);

  const editedData = {
    editedName,
    editedPrice,
    editedNotes,
    editedDate,
  };

  const originalData = {
    originalName,
    originalPrice,
    originalNotes,
    originalDate,
  };

  const handleEditService = (e) => {
    e.preventDefault();

    updateServiceField(clientData, editedData, originalData)
      .then((res) => {
        setIsEditing(false);
        setEditedName(res.editedName);
        setEditedPrice(res.editedPrice);
        setEditedNotes(res.editedNotes);
        setEditedDate(res.editedDate);
        setOriginalName(res.editedName);
        setOriginalPrice(res.editedPrice);
        setOriginalNotes(res.editedNotes);
        setOriginalDate(res.editedDate);
      })
      .catch((err) => {
        console.log('err', err);
      });
  };

  const handleDeleteService = async () => {
    try {
      await deleteServiceField(clientData, originalData);
      setServiceList((prev) =>
        prev.filter((s) => s.serviceName !== originalName),
      );
      setIsDeleting(false);
    } catch (err) {
      console.log('err', err);
    }
  };

  const onCancelEdit = () => {
    setIsEditing(false);
    setEditedName(originalName);
    setEditedPrice(originalPrice);
    setEditedNotes(originalNotes);
    setEditedDate(originalDate);
  };

  return (
    <div className="p-2 my-2 rounded-md transition-all duration-150 hover:bg-lightcolor3">
      {isEditing ? (
        <form ref={form} onSubmit={handleEditService}>
          <div className="flex flex-row justify-between gap-4 ">
            <div className="flex flex-row gap-2">
              <Tooltip title="Confirm Changes" size="small">
                <button
                  className="w-6 h-6 rounded-full transition-all hover:bg-lightgreen"
                  type="submit"
                >
                  <img
                    className="w-4 m-auto"
                    src={CheckmarkImage}
                    alt="cancel changes"
                  />
                </button>
              </Tooltip>
              <Tooltip title="Cancel" size="small">
                <button
                  className="w-6 h-6 rounded-full transition-all hover:bg-color3"
                  onClick={() => onCancelEdit()}
                >
                  <img
                    className="w-3 m-auto"
                    src={ExitIcon}
                    alt="cancel changes"
                  />
                </button>
              </Tooltip>
              <input
                type="text"
                className="text-lg w-36 h-8 shadow-blur focus:outline focus:outline-2 focus:outline-color3 rounded-md p-1"
                placeholder={originalName}
                required
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
              />
            </div>
            <input
              type="number"
              className="w-24 my-auto h-8 shadow-blur focus:outline focus:outline-2 focus:outline-color3 text-md rounded-md p-1"
              placeholder="$"
              required
              value={editedPrice}
              onChange={(e) => setEditedPrice(e.target.value)}
            />
          </div>
          <div className="flex flex-row justify-between">
            <textarea
              className="min-h-[5rem] max-h-[12rem] p-1 m-1 mt-3 text-md rounded-md shadow-blur focus:outline focus:outline-2 focus:outline-color3 max-w-[60%] w-full"
              value={editedNotes === '' ? 'No Details' : editedNotes}
              type="text"
              name="message"
              maxLength={280}
              placeholder={editedNotes === '' ? 'No Details' : editedNotes}
              onChange={(e) => setEditedNotes(e.target.value)}
            />
            <div className="flex flex-col">
              <input
                className="mt-3 shadow-blur focus:outline focus:outline-2 focus:outline-color3 rounded-md h-8"
                type="date"
                value={
                  editedDate === ''
                    ? clientData.info.contractStartDate
                    : editedDate
                }
                onChange={(e) => setEditedDate(e.target.value)}
              />
              {isDeleting ? (
                <div className="flex flex-col ml-auto mt-auto">
                  <button
                    type="button"
                    className="w-20 h-6 rounded-full transition-all hover:bg-lightred"
                    onClick={() => handleDeleteService()}
                  >
                    Confirm
                  </button>
                  <button
                    className="w-20 h-6 transition-all hover:bg-color3 hover:rounded-full"
                    onClick={() => setIsDeleting(false)}
                    type="reset"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  className="ml-auto mt-auto w-20 h-6 transition-all hover:bg-color3 hover:rounded-full"
                  onClick={() => setIsDeleting(true)}
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        </form>
      ) : (
        <div>
          <div className="flex flex-row justify-between gap-4">
            <div className="flex flex-row gap-2">
              <Tooltip title="Edit" size="small" position="bottom">
                <button
                  id="delete-button"
                  className="w-6 h-6 rounded-full transition-all hover:bg-color3"
                  onClick={() => setIsEditing(true)}
                  data-tooltip-content="Delete"
                >
                  <img
                    className="w-5 m-auto"
                    src={ArrowIcon}
                    alt="cancel changes"
                  />
                </button>
              </Tooltip>
              <p className="text-lg">{editedName}</p>
            </div>
            <p>${editedPrice}</p>
          </div>

          <div className="flex flex-row justify-between">
            <p className="h-auto max-w-[60%]">
              {editedNotes === '' ? 'No Details' : editedNotes}
            </p>
            <p>
              {editedDate === ''
                ? clientData.info.contractStartDate
                : editedDate}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceBox;
