import { useState } from "react";
import { useSelector } from "react-redux";
import { User } from "./redux/types";

import Footer from "./comps/Footer";
import Header from "./comps/Header";
import MainTable from "./comps/MainTable";
import ModalForm from "./comps/ModalForm";

function App() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [filterAbsense, setFilter] = useState("none");
  const [searchFilter, setSearch] = useState("");

  const users = useSelector((state: any) => state.users);
  const [selectedUser, setSelectedUser] = useState<User>();

  const userById = (id: string) => {
    return users.find((user: User) => user.id === id);
  };

  return (
    <>
      <Header
        users={users}
        onAdd={() => setModalOpen(true)}
        onSearch={(filter) => setSearch(filter)}
      />
      <Footer onFilter={(filter) => setFilter(filter)} />

      {isModalOpen && (
        <ModalForm
          user={selectedUser}
          isOpen={isModalOpen}
          onClose={() => {
            setModalOpen(false), setSelectedUser(undefined);
          }}
        />
      )}
      <MainTable
        users={users}
        onUserClick={(id) => {
          setModalOpen(true);
          setSelectedUser(userById(id));
        }}
        filter={filterAbsense}
        search={searchFilter}
      />

      <div
        className={`fixed top-0 left-0 w-[100vw] h-[100vh] bg-[#00000030] absolute z-10 ${!isModalOpen && "hidden"}`}
      ></div>
    </>
  );
}

export default App;
