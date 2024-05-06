import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";

function Contacts() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/emergency-contacts/get-emergency-contacts"
        );
        setContacts(response.data); // Assuming the response data is an array of contact objects
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };

    fetchContacts();
  }, []);

  return (
    <>
    <header>
      <Navbar/>
    </header>
      <div className="flex flex-col items-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 min-h-screen min-w-screen mt-16">
        <h2 className="items-center flex justify-center text-xl font-bold">
          Contacts
        </h2>

        <ul className="flex ">
          {contacts.map((contact) => (
            <li key={contact._id} className="bg-slate-300 mt-10 w-64">
              <strong>Name:</strong> {contact.name}
              <br />
              <strong>Phone Number:</strong> {contact.phoneNumber}
              <br />
              <strong>Email:</strong> {contact.email}
              <br />
              <strong>Description:</strong> {contact.description}
              <br />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Contacts;
