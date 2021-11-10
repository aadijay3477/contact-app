import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { uuid } from "uuidv4";
import './App.css';
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
// import { ContactCard } from "./ContactCard";

function App() {
  const LOCAL_STORAGE_KEY="contacts";
  const [contacts, setContacts]=useState([]);

  const addContactHandler=(contact)=>{
    console.log(contact);
    setContacts([...contacts, {id: uuid(), ...contact}]);
  }

  const removeContactHandler =(id)=> {
    const newContactList =contacts.filter((contact)=>{
      return contact.id !== id;
    })
    setContacts(newContactList)
  }

  useEffect(()=>{
    const retrieveContacts =JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if(retrieveContacts)setContacts(retrieveContacts)
  },[])

  useEffect(()=>{
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  },[contacts])

  return (
    <div className="ui container">
    <Header />
    <Router>
    <Routes>
    <Route path="/" element={<ContactList contacts ={contacts} getContactId={removeContactHandler} />} />
    <Route path="/add" element={<AddContact addContactHandler={addContactHandler}/>} />
    </Routes>
    </Router>
    </div>
  );
}

export default App;