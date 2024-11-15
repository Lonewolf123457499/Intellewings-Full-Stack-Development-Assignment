// import React, { useState, useEffect } from "react";
// import ContactForm from "../components/ContactForm";
// import ContactList from "../components/ContactList";
// import SearchBar from "../components/SearchBar";
// import { fetchContacts, deleteContact } from "../api";

// const Home = () => {
//   const [contacts, setContacts] = useState([]);
//   const [isFormVisible, setFormVisible] = useState(false);
//   const [pagination, setPagination] = useState({
//     page: 1,
//     limit: 10,
//     totalPages: 1,
//     totalContacts: 0,
//   });

//   useEffect(() => {
//     loadContacts(pagination.page);
//   }, [pagination.page]);

//   const loadContacts = async (page) => {
//     try {
//       const response = await fetchContacts();
//       setContacts(response.data.contacts); // Assuming response.data contains the array of contacts
//       console.log(response.data.contacts);
//       setPagination((prev) => ({
//         ...prev,
//         totalContacts: response.data.contacts.length,
//         totalPages: Math.ceil(response.data.contacts.length / prev.limit),
//       }));
//     } catch (error) {
//       console.error("Error fetching contacts:", error);
//     }
//   };

//   const handleDeleteContact = async (id) => {
//     try {
//       await deleteContact(id); // Assuming deleteContact is an API function to delete a contact by ID
//       setContacts(contacts.filter((contact) => contact.id !== id)); // Update contacts list locally
//       setPagination((prev) => ({
//         ...prev,
//         totalContacts: prev.totalContacts - 1,
//         totalPages: Math.ceil((prev.totalContacts - 1) / prev.limit),
//       }));
//     } catch (error) {
//       console.error("Error deleting contact:", error);
//     }
//   };

//   const handlePageChange = (newPage) => {
//     if (newPage >= 1 && newPage <= pagination.totalPages) {
//       setPagination((prev) => ({ ...prev, page: newPage }));
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col bg-white">
//       <header className="p-6 text-center">
//         <div className=" mt-4">
//           <h1 className="text-4xl font-bold text-green-500 ">Contact Book</h1>
//         </div>
//       </header>
//       <main className="flex-grow container mx-auto py-8 ">
//         <div className="flex justify-between items-center m-2 p-4 mx-12 shadow-2xl bg-slate-200 rounded-md ">
//           <SearchBar onSearch={() => {}} />
//           <button
//             onClick={() => setFormVisible(!isFormVisible)}
//             className="flex items-center px-4 py-2 bg-green-500 text-white rounded-md"
//           >
//             {isFormVisible ? "Cancel" : "Add Contact"}
//           </button>
//         </div>
//         {isFormVisible && (
//           <ContactForm onSubmit={() => loadContacts(pagination.page)} />
//         )}
//         <ContactList
//           contacts={contacts.slice(
//             (pagination.page - 1) * pagination.limit,
//             pagination.page * pagination.limit
//           )}
//           onDelete={handleDeleteContact} // Pass handleDeleteContact to ContactList
//           onEdit={() => {}}
//         />
//         <div className="flex justify-center mt-6 space-x-4">
//           <button
//             onClick={() => handlePageChange(pagination.page - 1)}
//             className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50"
//             disabled={pagination.page <= 1}
//           >
//             Previous
//           </button>
//           <span className="self-center text-lg">
//             Page {pagination.page} of {pagination.totalPages}
//           </span>
//           <button
//             onClick={() => handlePageChange(pagination.page + 1)}
//             className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50"
//             disabled={pagination.page >= pagination.totalPages}
//           >
//             Next
//           </button>
//         </div>
//       </main>
//       <footer className="py-6 text-center text-gray-400 bg-gray-50 w-full">
//         © 2024 Contact Book - All Rights Reserved
//       </footer>
//     </div>
//   );
// };

// export default Home;


import React, { useState, useEffect } from "react";
import ContactForm from "../components/ContactForm";
import ContactList from "../components/ContactList";
import SearchBar from "../components/SearchBar";
import { fetchContacts, deleteContact } from "../api";

const Home = () => {
  const [contacts, setContacts] = useState([]);
  const [isFormVisible, setFormVisible] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalPages: 1,
    totalContacts: 0,
  });

  useEffect(() => {
    loadContacts(pagination.page);
  }, [pagination.page]);

  const loadContacts = async (page) => {
    try {
      const response = await fetchContacts();
      setContacts(response.data.contacts); // Assuming response.data contains the array of contacts
      console.log(response.data.contacts);
      setPagination((prev) => ({
        ...prev,
        totalContacts: response.data.contacts.length,
        totalPages: Math.ceil(response.data.contacts.length / prev.limit),
      }));
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  const handleDeleteContact = async (id) => {
    try {
      await deleteContact(id); // Assuming deleteContact is an API function to delete a contact by ID
      setContacts(contacts.filter((contact) => contact.id !== id)); // Update contacts list locally
      setPagination((prev) => ({
        ...prev,
        totalContacts: prev.totalContacts - 1,
        totalPages: Math.ceil((prev.totalContacts - 1) / prev.limit),
      }));
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  const handleUpdate = (updatedContacts) => {
    setContacts(updatedContacts); // Update the contacts in the state with the new list
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setPagination((prev) => ({ ...prev, page: newPage }));
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="p-6 text-center">
        <div className="mt-4">
          <h1 className="text-4xl font-bold text-green-500">Contact Book</h1>
        </div>
      </header>
      <main className="flex-grow container mx-auto py-8">
        <div className="flex justify-between items-center m-2 p-4 mx-12 shadow-2xl bg-slate-200 rounded-md">
          <SearchBar onSearch={() => {}} />
          <button
            onClick={() => setFormVisible(!isFormVisible)}
            className="flex items-center px-4 py-2 bg-green-500 text-white rounded-md"
          >
            {isFormVisible ? "Cancel" : "Add Contact"}
          </button>
        </div>
        {isFormVisible && (
          <ContactForm onSubmit={() => loadContacts(pagination.page)} />
        )}
        <ContactList
          contacts={contacts.slice(
            (pagination.page - 1) * pagination.limit,
            pagination.page * pagination.limit
          )}
          onDelete={handleDeleteContact}
          onUpdate={handleUpdate} // Pass handleUpdate to ContactList
        />
        <div className="flex justify-center mt-6 space-x-4">
          <button
            onClick={() => handlePageChange(pagination.page - 1)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50"
            disabled={pagination.page <= 1}
          >
            Previous
          </button>
          <span className="self-center text-lg">
            Page {pagination.page} of {pagination.totalPages}
          </span>
          <button
            onClick={() => handlePageChange(pagination.page + 1)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50"
            disabled={pagination.page >= pagination.totalPages}
          >
            Next
          </button>
        </div>
      </main>
      <footer className="py-6 text-center text-gray-400 bg-gray-50 w-full">
        © 2024 Contact Book - All Rights Reserved
      </footer>
    </div>
  );
};

export default Home;
