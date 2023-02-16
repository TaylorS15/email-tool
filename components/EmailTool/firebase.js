// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  browserSessionPersistence,
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  setDoc,
  deleteField,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'API_KEY',
  authDomain: 'AUTH_DOMAIN',
  projectId: 'PROJECT_ID',
  storageBucket: 'STORAGE_BUCKET',
  messagingSenderId: 'MESSAGING_SENDER_ID',
  appId: 'APP_ID',
  measurementId: 'MEASUREMENT_ID',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const auth = getAuth(app);
setPersistence(auth, browserSessionPersistence);

export const signInUser = signInWithEmailAndPassword;
export const signOutUser = signOut;

/*
  Client Functions
*/
export const createClientReference = async (client) => {
  const clientRef = doc(db, 'qwd', 'clientList');

  //Automatically add contact email to seperate emailList document
  const emailRef = doc(db, 'qwd', 'emailList');
  const emailWithUnderscores = client.info.contactEmail.replace(/\./g, '_');

  try {
    await setDoc(
      clientRef,
      {
        [client.info.businessName]: {
          info: {
            businessName: client.info.businessName,
            businessAddress: client.info.businessAddress,
            contactEmail: client.info.contactEmail,
            contactName: client.info.contactName,
            contactPhone: client.info.contactPhone,
            businessInvoice: client.info.businessInvoice,
            contractStartDate: client.info.contractStartDate,
            contractEndDate: client.info.contractEndDate,
            contractLink: client.info.contractLink,
            websiteLink: client.info.websiteLink,
          },
          services: {},
        },
      },
      { merge: true },
    );

    await setDoc(
      emailRef,
      { [emailWithUnderscores]: client.info.contactEmail },
      { merge: true },
    );
    return client;
  } catch (error) {
    console.error('Error adding document: ', error);
  }
};

export const updateClientReference = async (client, edited) => {
  const clientRef = doc(db, 'qwd', 'clientList');

  try {
    await updateDoc(
      clientRef,
      {
        [client.info.businessName]: {
          info: {
            businessName: client.info.businessName,
            businessAddress: edited.editedBusinessAddress,
            contactEmail: edited.editedcontactEmail,
            contactName: edited.editedcontactName,
            contactPhone: edited.editedcontactPhone,
            businessInvoice: edited.editedbusinessInvoice,
            contractStartDate: edited.editedContractStartDate,
            contractEndDate: edited.editedContractEndDate,
            contractLink: edited.editedContractLink,
            websiteLink: edited.editedWebsiteLink,
          },
        },
      },
      { merge: true },
    );
    return edited;
  } catch (error) {
    console.error('Error adding document: ', error);
    return false;
  }
};

export const deleteClientReference = async (client) => {
  const clientRef = doc(db, 'qwd', 'clientList');

  try {
    await updateDoc(clientRef, {
      [client.info.businessName]: deleteField(),
    });
    return client;
  } catch (error) {
    console.error('Error adding document: ', error);
    return false;
  }
};

export const getClientList = async () => {
  const clientRef = doc(db, 'qwd', 'clientList');
  const clientDoc = await getDoc(clientRef);

  try {
    if (clientDoc.data()) {
      return clientDoc.data();
    } else {
      return [];
    }
  } catch (error) {
    console.log('error', error);
    return false;
  }
};

/*
  Service Functions
*/
export const addServiceField = async (client, service) => {
  const docRef = doc(db, 'qwd', 'clientList');

  try {
    await setDoc(
      docRef,
      {
        [client.info.businessName]: {
          services: {
            [service.serviceName]: {
              serviceName: service.serviceName,
              servicePrice: service.servicePrice,
              serviceNotes: service.serviceNotes,
              serviceDate: service.serviceDate,
            },
          },
        },
      },
      { merge: true },
    );
    return service;
  } catch (error) {
    console.log('error', error);
    return false;
  }
};

export const updateServiceField = async (client, edited, original) => {
  const docRef = doc(db, 'qwd', 'clientList');

  try {
    await updateDoc(docRef, {
      [`services.${original.originalName}`]: deleteField(),
    });
    await setDoc(
      docRef,
      {
        [client.info.businessName]: {
          services: {
            [edited.editedName]: {
              serviceName: edited.editedName,
              servicePrice: edited.editedPrice,
              serviceNotes: edited.editedNotes,
              serviceDate: edited.editedDate,
            },
          },
        },
      },
      { merge: true },
    );
    return edited;
  } catch (error) {
    console.log('error', error);
    return false;
  }
};

export const deleteServiceField = async (client, original) => {
  const docRef = doc(db, 'qwd', 'clientList');

  try {
    await updateDoc(docRef, {
      [`${client.info.businessName}.services.${original.originalName}`]:
        deleteField(),
    });

    return original;
  } catch (error) {
    console.log('error', error);
    return false;
  }
};

/*
  Email Preset Functions
*/
export const createEmailPresetReference = async (preset) => {
  const presetRef = doc(db, 'qwd', 'emailPresetList');

  try {
    await setDoc(
      presetRef,
      {
        [preset.emailPresetName]: {
          emailPresetName: preset.emailPresetName,
          emailSubject: preset.emailSubject,
          emailBody: preset.emailBody,
        },
      },
      { merge: true },
    );
    return preset;
  } catch (error) {
    console.error('Error adding document: ', error);
  }
};

export const updateEmailPresetReference = async (preset, edited) => {
  const presetRef = doc(db, 'qwd', 'emailPresetList');

  try {
    await updateDoc(
      presetRef,
      {
        [preset.emailPresetName]: {
          emailPresetName: preset.emailPresetName,
          emailSubject: edited.editedEmailSubject,
          emailBody: edited.editedEmailBody,
        },
      },
      { merge: true },
    );
    return edited;
  } catch (error) {
    console.error('Error adding document: ', error);
    return false;
  }
};

export const deleteEmailPresetReference = async (preset) => {
  const emailPresetRef = doc(db, 'qwd', 'emailPresetList');

  try {
    await updateDoc(emailPresetRef, {
      [preset.emailPresetName]: deleteField(),
    });
  } catch (error) {
    console.error('Error adding document: ', error);
  }
};

export const getEmailPresetList = async () => {
  const emailPresetListRef = doc(db, 'qwd', 'emailPresetList');
  const emailPresetListDoc = await getDoc(emailPresetListRef);

  try {
    if (emailPresetListDoc.data()) {
      return emailPresetListDoc.data();
    } else {
      return [];
    }
  } catch (error) {
    console.log('error', error);
    return false;
  }
};

/*
  Email List Functions
*/
export const addEmail = async (email) => {
  const docRef = doc(db, 'qwd', 'emailList');
  const emailWithUnderscores = email.replace(/\./g, '_');

  try {
    await setDoc(docRef, { [emailWithUnderscores]: email }, { merge: true });
    return email;
  } catch (error) {
    console.log('error', error);
    return false;
  }
};

export const deleteEmail = async (email) => {
  const docRef = doc(db, 'qwd', 'emailList');
  const emailWithUnderscores = email.replace(/\./g, '_');

  try {
    await updateDoc(docRef, {
      [emailWithUnderscores]: deleteField(),
    });
    return email;
  } catch (error) {
    console.log('error', error);
    return false;
  }
};

export const getEmailList = async () => {
  const emailListRef = doc(db, 'qwd', 'emailList');
  const emailListDoc = await getDoc(emailListRef);

  try {
    if (emailListDoc.data()) {
      return emailListDoc.data();
    } else {
      return [];
    }
  } catch (error) {
    console.log('error', error);
    return false;
  }
};
