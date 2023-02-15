import React, { useState } from 'react';
import { createClientReference } from '../firebase';
import DashboardRequiredFormInput from '../DashboardRequiredFormInput';
import DashboardFormInput from '../DashboardFormInput';
import ArrowImage from '../imgs/arrow.svg';

const ClientCreation = ({
  clientList,
  requestClientList,
  requestEmailList,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const [businessName, setBusinessName] = useState('');
  const [businessAddress, setBusinessAddress] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [businessInvoice, setBusinessInvoice] = useState('');
  const [websiteLink, setWebsiteLink] = useState('');
  const [contractStartDate, setContractStartDate] = useState('');
  const [contractEndDate, setContractEndDate] = useState('');
  const [contractLink, setContractLink] = useState('');

  const clientCreate = async (e) => {
    e.preventDefault();

    const firestoreClientDoc = {
      info: {
        businessName,
        businessAddress,
        contactEmail,
        contactName,
        contactPhone,
        businessInvoice,
        websiteLink,
        contractStartDate,
        contractEndDate,
        contractLink,
      },
      services: {},
    };

    await createClientReference(firestoreClientDoc)
      .then((result) => {
        clientList.push(result);
        requestClientList();
        requestEmailList();
        setBusinessName('');
        setBusinessAddress('');
        setContactName('');
        setContactEmail('');
        setContactPhone('');
        setBusinessInvoice('');
        setWebsiteLink('');
        setContractStartDate('');
        setContractEndDate('');
        setContractLink('');
        setIsOpen(false);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <div className="mt-6 p-2 md:w-auto md:max-w-[52rem]">
      <article className="flex flex-row text-md">
        <div className={`${isOpen ? '' : ''} gap-4 inline-flex p-2`}>
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
          className="flex p-2 pl-2 w-full text-md rounded-md justify-between cursor-pointer select-none transition-all duration-150 hover:bg-lightcolor3"
          onClick={() => setIsOpen(!isOpen)}
        >
          <p>Add Client</p>
        </div>
      </article>

      {isOpen ? (
        <form
          className="flex relative flex-col flex-wrap md:h-72 mt-2 mx-2 gap-4"
          onSubmit={clientCreate}
        >
          <DashboardRequiredFormInput
            type="name"
            value={businessName}
            placeholder="Business Name"
            label="Business Name"
            setValue={setBusinessName}
            width="w-52"
          />
          <DashboardRequiredFormInput
            type="name"
            value={businessAddress}
            placeholder="Business Address"
            label="Business Address"
            setValue={setBusinessAddress}
            width="w-52"
          />
          <DashboardRequiredFormInput
            type="name"
            value={contactName}
            placeholder="Contact Name"
            label="Contact Name"
            setValue={setContactName}
            width="w-52"
          />
          <DashboardRequiredFormInput
            type="email"
            value={contactEmail}
            placeholder="Contact Email"
            label="Contact Email"
            setValue={setContactEmail}
            width="w-52"
          />
          <DashboardFormInput
            type="url"
            value={websiteLink}
            placeholder="https://"
            label="Website Link"
            setValue={setWebsiteLink}
            width="w-52"
          />
          <DashboardFormInput
            type="url"
            value={contractLink}
            placeholder="https://"
            label="Contract Link"
            setValue={setContractLink}
            width="w-52"
          />
          <DashboardFormInput
            type="tel"
            value={contactPhone}
            placeholder="Phone Number"
            label="Phone Number"
            setValue={setContactPhone}
            width="w-36"
          />
          <DashboardFormInput
            type="link"
            value={businessInvoice}
            placeholder="Business Invoice"
            label="Business Invoice"
            setValue={setBusinessInvoice}
            width="w-36"
          />
          <DashboardFormInput
            type="date"
            value={contractStartDate}
            label="Contract Start Date"
            setValue={setContractStartDate}
            width="w-36"
          />
          <DashboardFormInput
            type="date"
            value={contractEndDate}
            label="Contract End Date"
            setValue={setContractEndDate}
            width="w-36"
          />
          <button
            type="submit"
            className="w-32 h-10 mb-2 bg-color3 text-color4 rounded-md p-1 text-md transition-all hover:shadow-navigation"
          >
            Add Client
          </button>
        </form>
      ) : null}
    </div>
  );
};

export default ClientCreation;
