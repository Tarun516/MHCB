import React, { useState, useEffect } from "react";
import axios from "axios";

function Contacts() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/v1/emergency-contacts/get-emergency-contacts");
        setContacts(response.data); // Assuming the response data is an array of contact objects
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };

    fetchContacts();
  }, []);

  return (
    <>
      <div>
        <h2>Contacts</h2>
        <ul>
          {contacts.map((contact) => (
            <li key={contact._id}>
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
