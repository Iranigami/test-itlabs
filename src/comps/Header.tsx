import { User } from "../redux/types";
import { ChangeEvent, useRef, useState } from "react";

import logo from "../assets/logo.svg";

type Props = {
  users: Array<User>;
  onAdd: () => void;
  onSearch: (filter: string) => void;
};

export default function Header({ onAdd, onSearch, users }: Props) {
  const present = users.filter((user: User) => user.status === true).length;
  const abscent = users.filter((user: User) => user.status === false).length;
  const [searchQuery, setSearchQuery] = useState("");
  const timeoutId = useRef<number | null>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }

    timeoutId.current = window.setTimeout(() => {
      onSearch(query);
    }, 350);
  };

  return (
    <div className="w-full h-[123px] fixed top-0 left-0 flex pt-[24px] px-[50px] pb-[10px] justify-between font-sans bg-linear-to-t from-[#FFFFFF00] from-5% to-[#FFFFFF] to-10%  z-10">
      <div className="flex items-end">
        <img src={logo} alt="logo" className="" />
        <input
          type="text"
          placeholder="Поиск по имени"
          value={searchQuery}
          onChange={handleChange}
          className="w-[394px] h-[52px] rounded-[3px/4px] shadow-[0_1px_4px_0_#00000029] px-[19px] items-center ml-[32.11px] text-[#000000]"
        />
        <button
          className="w-[273px] h-[52px] bg-[#4CAF50] rounded-[10px/6px]
            text-white text-[24px] font-roboto shadow-[0_3px_3px_0_#00000029] ml-[40px] hover:bg-[#3C9F40]"
          onClick={() => onAdd()}
        >
          Добавить
        </button>
      </div>
      <div className="justify-right text-right text-[30px] font-bold text-[#4E3000]">
        <div className="">Посетители</div>
        <div>
          <span className="text-[#80BB00]"> {present} </span> /{" "}
          <span className="text-[#EC5937]"> {abscent} </span>
        </div>
      </div>
    </div>
  );
}
