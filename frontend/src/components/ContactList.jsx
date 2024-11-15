import React, { useState } from "react";
import { fetchContacts, updateContact } from "../api"; // Importing API functions

const ContactList = ({ contacts, onDelete, onUpdate }) => {
  const [editingContactId, setEditingContactId] = useState(null);
  const [editedContact, setEditedContact] = useState({});
  const [loading, setLoading] = useState(false); // For handling loading state

  // Handle the Edit button click, enabling editable mode
  const handleEdit = (contactId) => {
    setEditingContactId(contactId);
    const contactToEdit = contacts.find((contact) => contact.id === contactId);
    setEditedContact({ ...contactToEdit });
  };

  // Handle input changes when editing
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedContact((prev) => ({ ...prev, [name]: value }));
  };

  // Handle saving the changes
  const handleSave = async () => {
    setLoading(true); // Show loading while the update is being made

    try {
      await updateContact(editedContact.id, editedContact); // Update the contact in the database

      // After the update, reload the contacts from the server to reflect the changes
      const updatedContacts = await fetchContacts();
      onUpdate(updatedContacts.data.contacts); // Pass the updated contacts to the parent component

      setEditingContactId(null); // Exit editing mode
      setEditedContact({}); // Clear the edited contact data
    } catch (error) {
      console.error("Error updating contact:", error);
    } finally {
      setLoading(false); // Hide loading after the update is complete
    }
  };

  // Handle canceling the edit
  const handleCancel = () => {
    setEditingContactId(null); // Exit editing mode
    setEditedContact({}); // Clear the edited contact data
  };

  return (
    <div className="overflow-x-auto px-4 shadow-2xl rounded-lg bg-slate-300 bg-opacity-40 backdrop-blur-md p-4 m-10">
      <table className="min-w-full text-sm rounded-lg py-4">
        <thead>
          <tr className="bg-green-300 text-gray-800 rounded-lg shadow-xl">
            <th className="px-6 py-3 text-left font-semibold">Full Name</th>
            <th className="px-6 py-3 text-left font-semibold">Email</th>
            <th className="px-6 py-3 text-left font-semibold">Primary Phone</th>
            <th className="px-6 py-3 text-left font-semibold">
              Secondary Phone
            </th>
            <th className="px-6 py-3 text-left font-semibold">Address</th>
            <th className="px-6 py-3 text-center font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr
              key={contact.id}
              className="border-t border-gray-300 hover:bg-gray-100 text-gray-700 font-medium"
            >
              <td className="px-6 py-3">
                {editingContactId === contact.id ? (
                  <input
                    type="text"
                    name="first_name"
                    value={editedContact.first_name || ""}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                  />
                ) : (
                  `${contact.first_name} ${contact.last_name}`
                )}
              </td>
              <td className="px-6 py-3">
                {editingContactId === contact.id ? (
                  <input
                    type="email"
                    name="email"
                    value={editedContact.email || ""}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                  />
                ) : (
                  contact.email
                )}
              </td>
              <td className="px-6 py-3">
                {editingContactId === contact.id ? (
                  <input
                    type="text"
                    name="phone_1"
                    value={editedContact.phone_1 || ""}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                  />
                ) : (
                  contact.phone_1
                )}
              </td>
              <td className="px-6 py-3">
                {editingContactId === contact.id ? (
                  <input
                    type="text"
                    name="phone_2"
                    value={editedContact.phone_2 || ""}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                  />
                ) : (
                  contact.phone_2
                )}
              </td>
              <td className="px-6 py-3">
                {editingContactId === contact.id ? (
                  <input
                    type="text"
                    name="address"
                    value={editedContact.address || ""}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                  />
                ) : (
                  contact.address
                )}
              </td>
              <td className="px-6 py-3 text-center">
                {editingContactId === contact.id ? (
                  <div className="flex justify-center space-x-4">
                    <button
                      onClick={handleSave}
                      className="px-4 py-2 bg-green-500 text-white rounded-md"
                      disabled={loading}
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="px-4 py-2 bg-red-500 text-white rounded-md"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="flex justify-center space-x-4">
                    <button
                      onClick={() => handleEdit(contact.id)}
                      className="px-4 py-2 bg-yellow-500 text-white rounded-md"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(contact.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-md"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactList;
