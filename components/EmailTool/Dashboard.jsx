import React, { useState, useEffect } from 'react';
import { getEmailPresetList, getClientList, getEmailList } from './firebase';
import { NavLink, Route, Routes } from 'react-router-dom';
import ClientManager from './ClientComponents/ClientManager';
import EmailManager from './EmailComponents/EmailManager';

const Dashboard = () => {
  const [clientManagerIsActive, setClientManagerIsActive] = useState(false);
  const [emailManagerIsActive, setEmailManagerIsActive] = useState(true);

  const [clientList, setClientList] = useState(null);
  const [emailPresetList, setEmailPresetList] = useState(null);
  const [emailList, setEmailList] = useState(null);

  const requestEmailList = async () => {
    await getEmailList()
      .then((data) => {
        let values = Object.values(data);
        setEmailList(values);
      })
      .catch((error) => {
        console.log(error.code, error.message);
      });
  };

  const requestClientList = async () => {
    await getClientList()
      .then((data) => {
        setClientList(Object.values(data));
      })
      .catch((error) => {
        console.log(error.code, error.message);
      });
  };

  const requestEmailPresetList = async () => {
    await getEmailPresetList()
      .then((data) => {
        setEmailPresetList(Object.values(data));
      })
      .catch((error) => {
        console.log(error.code, error.message);
      });
  };

  useEffect(() => {
    requestClientList();
    requestEmailPresetList();
    requestEmailList();
  }, [setClientList, setEmailPresetList, setEmailList]);

  return (
    <div>
      <p className="text-2xl mb-6">QWD Management Tool</p>
      <nav className="flex flex-row justify-between mx-2 w-[23rem]">
        <NavLink
          className={`${
            clientManagerIsActive ? 'bg-color3 hover:bg-color3' : ''
          } w-full h-12 py-[.875rem] px-[2.5rem] rounded-t-md transition-all hover:bg-lightcolor3`}
          to="/clientmanager"
          onClick={() => {
            setClientManagerIsActive(true);
            setEmailManagerIsActive(false);
          }}
        >
          Client Manager
        </NavLink>

        <NavLink
          className={`${
            emailManagerIsActive ? 'bg-color3 hover:bg-color3' : ''
          } w-full h-12 py-[.875rem] px-[2.5rem] rounded-t-md  hover:bg-lightcolor3`}
          to="/emailmanager"
          onClick={() => {
            setClientManagerIsActive(false);
            setEmailManagerIsActive(true);
          }}
        >
          Email Manager
        </NavLink>
      </nav>

      <Routes>
        <Route
          path="clientmanager"
          element={
            <ClientManager
              clientList={clientList}
              requestClientList={requestClientList}
              requestEmailList={requestEmailList}
            />
          }
        />
        <Route
          path="emailmanager"
          element={
            <EmailManager
              emailPresetList={emailPresetList}
              requestEmailPresetList={requestEmailPresetList}
              emailList={emailList}
              requestEmailList={requestEmailList}
              setEmailList={setEmailList}
            />
          }
        />
        <Route
          path="*"
          element={
            <EmailManager
              emailPresetList={emailPresetList}
              requestEmailPresetList={requestEmailPresetList}
              emailList={emailList}
              requestEmailList={requestEmailList}
              setEmailList={setEmailList}
            />
          }
        />
      </Routes>

      <p className="text-gray">QWD Client Manager v1.0.0</p>
    </div>
  );
};

export default Dashboard;
