import React, { useState } from "react";
import ArrowImage from "../../imgs/arrow.svg";
import ServiceBox from "./ServiceBox";
import InformationBox from "./InformationBox";
import ServiceForm from "./ServiceForm";

const ClientDocument = ({ clientData, requestClientList }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [serviceList, setServiceList] = useState(
    Object.values(clientData.services)
  );

  return (
    <div className="px-2 flex relative flex-col">
      <article className="flex flex-row text-md">
        <div className={`${isOpen ? "" : ""} gap-4 inline-flex p-2`}>
          <img
            className={`${
              isOpen ? "rotate-0" : "-rotate-90"
            } w-3 cursor-pointer transition-all`}
            src={ArrowImage}
            alt="arrow"
            onClick={() => setIsOpen(!isOpen)}
          />
        </div>

        <div
          className="flex p-2 pl-2 w-full rounded-md justify-between cursor-pointer select-none transition-all duration-150 hover:bg-lightcolor3"
          onClick={() => setIsOpen(!isOpen)}
        >
          <p>{clientData.info.businessName}</p>
        </div>
      </article>

      {isOpen ? (
        <div className="flex flex-row flex-wrap justify-between">
          <InformationBox
            clientData={clientData}
            requestClientList={requestClientList}
          />

          <article className="flex flex-col gap-2 w-full mb-12 md:max-w-[50%] lg:max-w-[65%]">
            <div
              className="flex flex-row gap-2 p-2 select-none rounded-md cursor-pointer transition-all duration-150 hover:bg-lightcolor3"
              onClick={() => setIsServicesOpen(!isServicesOpen)}
            >
              <img
                className={`${
                  isServicesOpen ? "rotate-0" : "-rotate-90"
                } w-3 cursor-pointer transition-all`}
                src={ArrowImage}
                alt="arrow"
                onClick={() => setIsServicesOpen(!isServicesOpen)}
              />
              <p>Services: </p>
              <p className="ml-auto">
                $
                {serviceList
                  ? serviceList.reduce(
                      (acc, service) => acc + parseFloat(service.servicePrice),
                      0
                    )
                  : 0}
              </p>
            </div>

            {isServicesOpen ? (
              <div className="flex flex-col flex-wrap w-full">
                <div className="mb-6 max-w-[100%] overflow-y-auto max-h-[15rem]">
                  {!serviceList || !serviceList.length ? (
                    <p className="mx-1">Service List is Empty.</p>
                  ) : (
                    serviceList.map((service) => {
                      return (
                        <ServiceBox
                          key={service.serviceName}
                          service={service}
                          clientData={clientData}
                          setServiceList={setServiceList}
                        />
                      );
                    })
                  )}
                </div>

                <ServiceForm
                  clientData={clientData}
                  serviceList={serviceList}
                  setServiceList={setServiceList}
                />
              </div>
            ) : null}
          </article>
        </div>
      ) : null}
    </div>
  );
};

export default ClientDocument;
