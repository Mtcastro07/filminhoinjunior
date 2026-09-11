import { InstagramIcon } from "../../public/icons";
import { FacebookIcon } from "../../public/icons";
import { XIcon } from "../../public/icons";

export default function Footer() {
  return (
    <>
      <footer className=" h-19 w-full  flex items-center justify-end bg-[#9697F8] gap-[31.5px] pr-29">
        <FacebookIcon />
        <XIcon />
        <InstagramIcon />
      </footer>
    </>
  );
}
