import { Fragment, HTMLProps } from "react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Clock3Icon, CogIcon } from "lucide-react";
import Link from "next/link";

interface Props extends HTMLProps<HTMLElement> {
  changeTimer: (minutes: number) => void;
  timerOptions: { work: number; short: number; large: number };
}
const TimerMenu = ({ changeTimer, timerOptions }: Props) => {
  const { work, short, large } = timerOptions;
  const configMenu = [
    { label: "Timer", href: "/timer/config" },
    { label: "Choose Typography", href: "#" },
    { label: "Choose Background", href: "#" },
  ];
  const timerMenu = [
    { label: `Time Work (${work} Min)`, value: work },
    { label: `Time Short (${short} Min)`, value: short },
    { label: `Time Large (${large} Min)`, value: large },
  ];
  return (
    <Fragment>
      <div className="flex flex-col justify-center items-center pb-8">
        <Menubar className="justify-center w-24">
          <MenubarMenu>
            <MenubarTrigger>
              {" "}
              <Clock3Icon />{" "}
            </MenubarTrigger>
            <MenubarContent>
              {timerMenu.map((option, i) => (
                <MenubarItem key={i} onClick={() => changeTimer(option.value)}>
                  {" "}
                  {option.label}
                </MenubarItem>
              ))}
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>
              {" "}
              <CogIcon />{" "}
            </MenubarTrigger>
            <MenubarContent>
              {configMenu.map((option, i) => (
                <Link key={i} href={option.href}>
                  <MenubarItem>{option.label}</MenubarItem>
                </Link>
              ))}
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>
    </Fragment>
  );
};

export default TimerMenu;
