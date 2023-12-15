import React, { createContext, useContext, useRef, useState } from "react";

const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  // Edit Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedItem, setEditedItem] = useState(null);
  // Delete Modal
  const [show, setShow] = useState(false);
  const [deletedItem, setDeletedItem] = useState(null);

  const inputRef = useRef(null);
  const setFocus = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const openModal = (user) => {
    setIsModalOpen(true);
    setEditedItem(user);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setEditedItem(null);
  };
  const openDeleteModal = (user) => {
    setShow(true);
    setDeletedItem(user);
  };
  const closeDeleteModal = () => {
    setShow(false);
    setDeletedItem(null);
  };

  const handleSortUsers = (event) => {
    const sortedValue = event.target.value;
    const sordetData = [...users];
    const sordetUsers = sordetData.sort((a, b) => {
      if (sortedValue === "A-Z") {
        return a.fullName.localeCompare(b.fullName);
      } else if (sortedValue === "Z-A") {
        return b.fullName.localeCompare(a.fullName);
      } else if (sortedValue === "Low-to-High") {
        return a.age - b.age;
      } else {
        return b.age - a.age;
      }
    });
    setUsers(sordetUsers);
  };



  const contextValue = {
    inputRef,
    setFocus,
    isModalOpen,
    setIsModalOpen,
    editedItem,
    setEditedItem,
    openModal,
    closeModal,
    openDeleteModal,
    deletedItem,
    show,
    setShow,
    closeDeleteModal,
    users,
    setUsers,
    handleSortUsers,
  };
  const Component = GlobalContext.Provider;

  return <Component value={contextValue}>{children}</Component>;
};

const useGlobalContext = () => useContext(GlobalContext);
export { GlobalContextProvider, useGlobalContext };
