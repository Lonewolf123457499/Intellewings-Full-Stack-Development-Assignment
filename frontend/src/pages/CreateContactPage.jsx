import React from "react";
import ContactForm from "./ContactForm";
import { createContact } from "../api"; // Function to create a contact

const CreateContactPage = () => {
  const handleCreateContact = async (newContact) => {
    await createContact(newContact); // Call API to create the contact
    console.log("New contact created:", newContact);
  };

  return (
    <div>
      <h2>Create New Contact</h2>
      <ContactForm onSubmit={handleCreateContact} />
    </div>
  );
};

export default CreateContactPage;
