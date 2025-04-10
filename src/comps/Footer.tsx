import { useState } from "react";

type Props = {
  onFilter: (filter: string) => void;
};

export default function Footer({ onFilter }: Props) {
  const [currentFilter, setCurrentFilter] = useState("none");
  const handleClickOnFilter = (filter: string) => {
    setCurrentFilter(filter);
    onFilter(filter);
  };

  return (
    <div className="w-full h-[89px] bg-linear-to-b from-[#FFFFFF00] from-5% to-[#FFFFFF] to-30% text-[#4E3000] fixed bottom-0 left-0 flex mt-[24px] px-[50px] font-sans justify-right text-right items-center gap-[43px]">
      <span className="text-[30px] font-bold"> Фильтровать по: </span>
      <button
        className={`text-[25px] font-normal px-[19px] py-[6px] ml-[30px] ${currentFilter === "absent" && "bg-[#C4C4C4] rounded-[20px] text-white"}`}
        onClick={() => handleClickOnFilter("absent")}
      >
        Отсутствующим
      </button>
      <button
        className={`text-[25px] font-normal px-[19px] py-[6px] ${currentFilter === "present" && "bg-[#C4C4C4] rounded-[20px] text-white"}`}
        onClick={() => handleClickOnFilter("present")}
      >
        Присутствующим
      </button>
      <button
        className={`text-[25px] font-normal px-[19px] py-[6px] ${currentFilter === "none" && "bg-[#C4C4C4] rounded-[20px] text-white"}`}
        onClick={() => handleClickOnFilter("none")}
      >
        Без фильтра
      </button>
    </div>
  );
}
