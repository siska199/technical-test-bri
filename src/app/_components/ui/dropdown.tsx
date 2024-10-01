
import { IconChevronToggle } from "@/app/_assets/icons";
import useOnClickOutside from "@/app/_hook/useOnClickOutside";
import { cn } from "@/app/_lib/helper";
import { TOption } from "@/types/ui";
import { useRef, useState } from "react";

export type TOptionDropdown = TOption<string | React.ReactNode> & {
  className?    : string;
  title?        : string;
};
interface TProps {
  label?            : React.ReactNode | string;
  customeButtonTriger? : boolean;
  options           : TOptionDropdown[];
  onClick           : (data: TOptionDropdown) => void;
  customeClass? : {
    containerDropdown?  : string;
    btnDropdown?        : string;
    overlay?            : string;
  };
  isDefaultStyle?       : boolean;
  header?               : React.ReactNode;
  position?             : "left" | "right";
}

const DropdownBase = (props: TProps) => {
  const { options, position, label, customeButtonTriger, onClick: handleOnClick, customeClass, isDefaultStyle = true, header } = props;

  const ref = useRef<HTMLDivElement | null>(null);
  const refBtn = useRef<HTMLDivElement | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0); // start form 0 so first data have activeIndex 1 :)

  useOnClickOutside<HTMLDivElement>({ ref, refExceptions: [refBtn], handler: () => setIsOpen(false) });

  const handleOnClickOption = (data: TOptionDropdown) => {
    handleOnClick(data);
    setActiveIndex(0);
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    e?.stopPropagation();
    e?.preventDefault();

    if (e.key === "Enter") {
      const activeData = options[activeIndex - 1];
      handleOnClickOption(activeData);
    }
    if (e.key === "ArrowDown") {
      setActiveIndex(activeIndex === options?.length ? activeIndex : activeIndex + 1);
    }
    if (e.key === "ArrowUp") {
      setActiveIndex(activeIndex === 1 ? activeIndex : activeIndex - 1);
    }
    return;
  };

  const handleToggleDropdown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e?.stopPropagation();
    e?.preventDefault();
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={cn({
        "relative inline-block text-left w-fit ": true,
        [customeClass?.containerDropdown || ""]: customeClass?.containerDropdown,
      })}
    >
      <div ref={refBtn} onClick={handleToggleDropdown}>
        <button
          type="button"
          onKeyDown={handleKeyDown}
          className={cn({
            "inline-flex w-full justify-center items-center gap-x-2 outline-none": true,
            "rounded-md bg-white px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50": isDefaultStyle,
            [customeClass?.btnDropdown || ""]: customeClass?.btnDropdown,
          })}
        >
            {label}
            {customeButtonTriger??<IconChevronToggle isOpen={isOpen} className="w-[1rem]" />}
        </button>
      </div>

      <div
        ref={ref}
        className={cn({
          "absolute py-2 z-10 mt-2 transition-all overflow-hidden origin-top-right rounded-md bg-white  ring-1 ring-black ring-opacity-5 focus:outline-none": true,
          " h-auto shadow-lg w-fit min-w-[12rem]  opacity-100": isOpen,
          " h-0 shadow-none opacity-0": !isOpen,
          "!py-0": header,
          "right-0": position === "right",
          [customeClass?.overlay || ''] : customeClass?.overlay
        })}
      >
        <div
          className={cn({
            "py-0 hidden": true,
            block: isOpen,
          })}
        >
          {header && (
            <div
              className={cn({
                "mb-2 py-2 flex items-center gap-2 px-4 bg-gray-100": true,
              })}
            >
              {header}
            </div>
          )}
          {options?.map((option, i) => (
            <div key={i}>
              {option?.title && <div className=" px-4 pt-2 text-gray-400">{option?.title?.toLocaleUpperCase()}</div>}
              <div
                key={i}
                onClick={() => handleOnClickOption(option)}
                className={cn({
                  "hover:bg-gray-100 !text-black px-4  block  cursor-pointer": true,
                  "bg-gray-100 ": activeIndex - 1 == i,
                })}
              >
                <div
                  className={cn({
                    "py-2 flex items-center gap-2": true,
                    [option?.className || ""]: option?.className,
                  })}
                >
                  {option?.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DropdownBase;
