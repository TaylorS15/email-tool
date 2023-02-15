import React, { useState, useRef } from 'react';
import { Tooltip } from 'react-tippy';
import { updateClientReference, deleteClientReference } from '../../firebase';
import ExitIcon from '../../imgs/exit.png';
import 'react-tippy/dist/tippy.css';

const InformationBox = ({ clientData, requestClientList }) => {
  const form = useRef();
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [editedcontactName, setEditedcontactName] = useState(
    clientData.info.contactName,
  );
  const [originalcontactName, setOriginalcontactName] = useState(
    clientData.info.contactName,
  );
  const [editedcontactEmail, setEditedcontactEmail] = useState(
    clientData.info.contactEmail,
  );
  const [originalcontactEmail, setOriginalcontactEmail] = useState(
    clientData.info.contactEmail,
  );
  const [editedcontactPhone, setEditedcontactPhone] = useState(
    clientData.info.contactPhone,
  );
  const [originalcontactPhone, setOriginalcontactPhone] = useState(
    clientData.info.contactPhone,
  );
  const [editedbusinessInvoice, setEditedbusinessInvoice] = useState(
    clientData.info.businessInvoice,
  );
  const [originalbusinessInvoice, setOriginalbusinessInvoice] = useState(
    clientData.info.businessInvoice,
  );
  const [editedWebsiteLink, setEditedWebsiteLink] = useState(
    clientData.info.websiteLink,
  );
  const [originalWebsiteLink, setOriginalWebsiteLink] = useState(
    clientData.info.websiteLink,
  );
  const [editedContractStartDate, setEditedContractStart] = useState(
    clientData.info.contractStartDate,
  );
  const [originalContractStartDate, setOriginalContractStart] = useState(
    clientData.info.contractStartDate,
  );
  const [editedContractEndDate, setEditedContractEnd] = useState(
    clientData.info.contractEndDate,
  );
  const [originalContractEndDate, setOriginalContractEnd] = useState(
    clientData.info.contractEndDate,
  );
  const [editedContractLink, setEditedContractLink] = useState(
    clientData.info.contractLink,
  );
  const [originalContractLink, setOriginalContractLink] = useState(
    clientData.info.contractLink,
  );
  const [editedBusinessAddress, setEditedBusinessAddress] = useState(
    clientData.info.businessAddress,
  );
  const [originalBusinessAddress, setOriginalBusinessAddress] = useState(
    clientData.info.businessAddress,
  );

  const editedData = {
    editedBusinessAddress,
    editedcontactName,
    editedcontactEmail,
    editedcontactPhone,
    editedbusinessInvoice,
    editedWebsiteLink,
    editedContractLink,
    editedContractStartDate,
    editedContractEndDate,
  };

  const handleEditInfo = (e) => {
    e.preventDefault();

    updateClientReference(clientData, editedData)
      .then((response) => {
        setIsEditing(false);

        setOriginalcontactName(response.editedcontactName);
        setOriginalcontactEmail(response.editedcontactEmail);
        setOriginalcontactPhone(response.editedcontactPhone);
        setOriginalbusinessInvoice(response.editedbusinessInvoice);
        setOriginalWebsiteLink(response.editedWebsiteLink);
        setOriginalContractStart(response.editedContractStartDate);
        setOriginalContractEnd(response.editedContractEndDate);
        setOriginalContractLink(response.editedContractLink);
        setOriginalBusinessAddress(response.editedBusinessAddress);

        setEditedcontactName(response.editedcontactName);
        setEditedcontactEmail(response.editedcontactEmail);
        setEditedcontactPhone(response.editedcontactPhone);
        setEditedbusinessInvoice(response.editedbusinessInvoice);
        setEditedWebsiteLink(response.editedWebsiteLink);
        setEditedContractStart(response.editedContractStartDate);
        setEditedContractEnd(response.editedContractEndDate);
        setEditedContractLink(response.editedContractLink);
        setEditedBusinessAddress(response.editedBusinessAddress);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onCancelEdit = () => {
    setIsEditing(false);
    setEditedcontactName(originalcontactName);
    setEditedcontactEmail(originalcontactEmail);
    setEditedcontactPhone(originalcontactPhone);
    setEditedbusinessInvoice(originalbusinessInvoice);
    setEditedWebsiteLink(originalWebsiteLink);
    setEditedContractStart(originalContractStartDate);
    setEditedContractEnd(originalContractEndDate);
    setEditedContractLink(originalContractLink);
    setEditedBusinessAddress(originalBusinessAddress);
  };

  const handleDelete = () => {
    deleteClientReference(clientData)
      .then((response) => {
        setIsEditing(false);
        requestClientList();
      })
      .catch((err) => console.log(err));
  };

  if (!isEditing) {
    return (
      <article className="flex flex-col relative gap-4 p-2 w-full md:max-w-[47%] lg:max-w-1/3">
        <div className="flex justify-between">
          <p>Information: </p>
          <button
            className="w-16 h-8 rounded-md bg-color3 transition-all hover:shadow-navigation"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
        </div>

        <div className="flex flex-row justify-between max-w-full">
          <p>Business Address</p>
          <p>{editedBusinessAddress}</p>
        </div>
        <div className="flex flex-row justify-between max-w-full">
          <p>Contact Name</p>
          <p>{editedcontactName}</p>
        </div>
        <div className="flex flex-row justify-between max-w-full">
          <p>Contact Email</p>
          <p>{editedcontactEmail}</p>
        </div>
        <div className="flex flex-row justify-between max-w-full">
          <p>Contact Phone Number</p>
          <p>{editedcontactPhone}</p>
        </div>
        <div className="flex flex-row justify-between max-w-full">
          <p>Invoice</p>
          <p>{editedbusinessInvoice}</p>
        </div>
        <div className="flex flex-row justify-between max-w-full">
          <p>Website Link</p>
          <p>{editedWebsiteLink}</p>
        </div>
        <div className="flex flex-row justify-between max-w-full">
          <p>Contract Sign Date</p>
          <p>{editedContractStartDate}</p>
        </div>
        <div className="flex flex-row justify-between max-w-full">
          <p>Contract End Date</p>
          <p>{editedContractEndDate}</p>
        </div>
        <div className="flex flex-row justify-between max-w-full">
          <p>Contract PDF</p>
          <p>{editedContractLink}</p>
        </div>
      </article>
    );
  } else {
    return (
      <form
        ref={form}
        onSubmit={handleEditInfo}
        className="flex flex-col gap-4 p-2 w-full md:max-w-[47%] lg:max-w-[33%]"
      >
        <div className="flex justify-between">
          <p>Information: </p>
          <div className="flex">
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
        </div>

        <div className="flex flex-row justify-between max-w-full">
          <p>Business Address</p>
          <input
            type="text"
            className="w-36 h-8 shadow-blur focus:outline focus:outline-2 focus:outline-color3 rounded-md p-1"
            placeholder={originalBusinessAddress}
            required
            value={editedBusinessAddress}
            onChange={(e) => setEditedBusinessAddress(e.target.value)}
          />
        </div>
        <div className="flex flex-row justify-between max-w-full">
          <p>Contact Name</p>
          <input
            type="text"
            className="w-36 h-8 rounded-md p-1 shadow-blur focus:outline focus:outline-2 focus:outline-color3"
            placeholder={originalcontactName}
            required
            value={editedcontactName}
            onChange={(e) => setEditedcontactName(e.target.value)}
          />
        </div>
        <div className="flex flex-row justify-between max-w-full">
          <p>Contact Email</p>
          <input
            type="text"
            className="w-36 h-8 shadow-blur focus:outline focus:outline-2 focus:outline-color3 rounded-md p-1"
            placeholder={originalcontactEmail}
            required
            value={editedcontactEmail}
            onChange={(e) => setEditedcontactEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-row justify-between max-w-full">
          <p>Contact Phone Number</p>
          <input
            type="number"
            className="w-36 h-8 shadow-blur focus:outline focus:outline-2 focus:outline-color3 rounded-md p-1"
            placeholder={originalcontactPhone}
            value={editedcontactPhone}
            onChange={(e) => setEditedcontactPhone(e.target.value)}
          />
        </div>
        <div className="flex flex-row justify-between max-w-full">
          <p>Invoice</p>
          <input
            type="number"
            className="w-36 h-8 shadow-blur focus:outline focus:outline-2 focus:outline-color3 rounded-md p-1"
            placeholder={originalbusinessInvoice}
            value={editedbusinessInvoice}
            onChange={(e) => setEditedbusinessInvoice(e.target.value)}
          />
        </div>
        <div className="flex flex-row justify-between max-w-full">
          <p>Website Link</p>
          <input
            type="url"
            className="w-36 h-8 shadow-blur focus:outline focus:outline-2 focus:outline-color3 rounded-md p-1"
            placeholder={originalWebsiteLink}
            value={editedWebsiteLink}
            onChange={(e) => setEditedWebsiteLink(e.target.value)}
          />
        </div>
        <div className="flex flex-row justify-between max-w-full">
          <p>Contract Sign Date</p>
          <input
            type="date"
            className="w-36 h-8 shadow-blur focus:outline focus:outline-2 focus:outline-color3 rounded-md p-1"
            placeholder={originalContractStartDate}
            value={editedContractStartDate}
            onChange={(e) => setEditedContractStart(e.target.value)}
          />
        </div>
        <div className="flex flex-row justify-between max-w-full">
          <p>Contract End Date</p>
          <input
            type="date"
            className="w-36 h-8 shadow-blur focus:outline focus:outline-2 focus:outline-color3 rounded-md p-1"
            placeholder={originalContractEndDate}
            value={editedContractEndDate}
            onChange={(e) => setEditedContractEnd(e.target.value)}
          />
        </div>
        <div className="flex flex-row justify-between max-w-full">
          <p>Contract PDF</p>
          <input
            type="url"
            className="w-36 h-8 shadow-blur focus:outline focus:outline-2 focus:outline-color3 rounded-md p-1"
            placeholder={originalContractLink}
            value={editedContractLink}
            onChange={(e) => setEditedContractLink(e.target.value)}
          />
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
    );
  }
};

export default InformationBox;
