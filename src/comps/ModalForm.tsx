import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { addUser, editUser } from "../redux/actions";
import { User } from "../redux/types";

import close from "../assets/close.svg";

type Props = {
  user?: User;
  isOpen: boolean;
  onClose: () => void;
};

export default function ModalForm({ user, isOpen, onClose }: Props) {
  const [name, setName] = useState(user?.name || "");
  const [company, setCompany] = useState(user?.company || "");
  const [group, setGroup] = useState(user?.group || "");
  const [status, setStatus] = useState(!!user?.status);
  const dispatch = useDispatch();
  const isEditMode = !!user;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isEditMode) {
      dispatch(
        editUser({
          id: user!.id,
          name,
          company,
          group,
          status,
        }),
      );
    } else {
      dispatch(
        addUser({
          id: uuidv4(),
          name,
          company,
          group,
          status,
        }),
      );
    }
    onClose();
  };

  if (!isOpen) return null;
  return (
    <div className="w-[1461px] h-[581px] rounded-[30px] bg-white fixed z-100 top-0 bottom-0 left-0 right-0 absolute mx-auto my-auto p-[20px] justify-center items-center">
      <button
        className="absolute right-[20px] cursor-pointer"
        onClick={() => {
          onClose();
        }}
      >
        <img src={close} alt="close" />
      </button>
      <form
        className="text-[#4E3000] text-[32px] justify-center items-center font-semibold mt-[66px] ml-[400px]"
        onSubmit={handleSubmit}
      >
        <div className="justify-between w-[775px] flex pb-[40px] pl-[40px]">
          <label htmlFor="name">ФИО</label>
          <input
            type="text"
            id="name"
            value={name}
            className="w-[502px] h-[52px] rounded-[3px/4px] shadow-[0_1px_4px_0_#00000029] px-[19px] items-center ml-[32.11px] text-[#000000] font-normal"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="justify-between w-[775px] flex pb-[40px] pl-[40px]">
          <label htmlFor="company">Компания</label>
          <input
            type="text"
            id="company"
            value={company}
            className="w-[502px] h-[52px] rounded-[3px/4px] shadow-[0_1px_4px_0_#00000029] px-[19px] items-center ml-[32.11px] text-[#000000] font-normal"
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>
        <div className="justify-between w-[775px] flex pb-[40px] pl-[40px]">
          <label htmlFor="group">Группа</label>
          <select
            id="group"
            value={group}
            onChange={(e) => setGroup(e.target.value)}
            className="w-[502px] h-[52px] rounded-[3px/4px] shadow-[0_1px_4px_0_#00000029] px-[19px] items-center ml-[32.11px] text-[#000000] font-normal"
          >
            <option value="">Выбрать</option>
            <option value="Прохожий">Прохожий</option>
            <option value="Клиент">Клиент</option>
            <option value="Партнер">Партнёр</option>
          </select>
        </div>
        <div className="justify-between w-[775px] flex pb-[40px] pl-[40px] items-center">
          <label htmlFor="status">Присутствие</label>
          <div className="w-[34px] h-[34px] mr-[468px] rounded-[4px] border-[2px] border-[#757575] items-center ml-[32.11px] text-[#555555] relative items-center justify-center flex">
            <input
              type="checkbox"
              id="status"
              checked={status}
              onChange={() => setStatus(!status)}
              className="w-[34px] h-[34px] appearance-none cursor-pointer absolute z-10"
            />
            {status && <div className="z-0"> ✔ </div>}
          </div>
        </div>

        <button
          className={`w-[273px] h-[52px] bg-[#4CAF50] rounded-[10px/6px]
          text-white text-[24px] font-roboto shadow-[0_3px_3px_0_#00000029] ml-[40px] hover:bg-[#3C9F40] disabled:bg-[#454545] disabled:cursor-not-allowed`}
          disabled={!name || !company || !group}
          title={!name || !company || !group ? "Заполните все поля" : undefined}
          onClick={() => {}}
        >
          {isEditMode ? "Сохранить" : "Добавить"}
        </button>
        <button
          className="w-[273px] h-[52px] bg-[#737373] rounded-[10px/6px]
          text-white text-[24px] font-roboto shadow-[0_3px_3px_0_#00000029] ml-[40px] hover:bg-[#636363]"
          onClick={() => onClose()}
        >
          Закрыть
        </button>
      </form>
    </div>
  );
}
