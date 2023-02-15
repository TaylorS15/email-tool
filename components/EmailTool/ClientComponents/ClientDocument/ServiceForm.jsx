import React, { useState, useRef } from 'react';
import { addServiceField } from '../../firebase';
import { Tooltip } from 'react-tippy';

const ServiceForm = ({ clientData, serviceList, setServiceList }) => {
  const form = useRef();
  const [serviceName, setServiceName] = useState('');
  const [servicePrice, setServicePrice] = useState(0);
  const [serviceNotes, setServiceNotes] = useState('');
  const [serviceDate, setServiceDate] = useState('');

  const handleServicePush = async (e) => {
    e.preventDefault();

    const serviceData = {
      serviceName,
      servicePrice,
      serviceNotes,
      serviceDate,
    };

    const existingService = serviceList.find(
      (service) => service.serviceName === serviceData.serviceName,
    );

    if (existingService) {
      console.log('Service already exists');
    } else {
      await addServiceField(clientData, serviceData)
        .then((result) => {
          setServiceList([...serviceList, result]);
          setServiceName('');
          setServicePrice(0);
          setServiceNotes('');
          setServiceDate('');
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="m-2 flex flex-col gap-4 md:ml-auto lg:max-w-[49%]">
      <p className="text-lg">Add a service:</p>
      <form
        ref={form}
        onSubmit={handleServicePush}
        className="flex flex-row gap-4"
      >
        <input
          type="text"
          className={`w-full my-auto h-8 text-md rounded-md p-1 shadow-blur focus:outline focus:outline-2 focus:outline-color3`}
          placeholder="Service"
          required
          value={serviceName}
          onChange={(e) => setServiceName(e.target.value)}
        />
        <label className="my-auto -mr-2 text-lg">$</label>
        <input
          type="number"
          className={`w-24 my-auto h-8 text-md rounded-md p-1 shadow-blur focus:outline focus:outline-2 focus:outline-color3`}
          placeholder="$"
          required
          value={servicePrice}
          onChange={(e) => setServicePrice(e.target.value)}
        />
        <Tooltip title="Add Service" size="small">
          <button
            type="submit"
            className="w-8 my-auto h-8 text-color4 rounded-full text-md duration-100 transition-all hover:bg-color3"
          >
            +
          </button>
        </Tooltip>
      </form>
      <textarea
        className="min-h-[5rem] max-h-[12rem] p-2 rounded-md shadow-blur focus:outline focus:outline-2 focus:outline-color3"
        type="text"
        name="message"
        maxLength={280}
        value={serviceNotes}
        onChange={(e) => setServiceNotes(e.target.value)}
        placeholder="Notes (optional)"
      />
      <div className="flex">
        <p className="my-auto">Date Sold (optional): </p>
        <input
          className="ml-2 rounded-md h-8 shadow-blur focus:outline focus:outline-2 focus:outline-color3"
          type="date"
          onChange={(e) => setServiceDate(e.target.value)}
        />
      </div>
    </div>
  );
};

export default ServiceForm;
