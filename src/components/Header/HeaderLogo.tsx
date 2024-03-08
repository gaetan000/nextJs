import Image from "next/image";
import logo from "../../assets/logo-monochrome.svg";

export default function HeaderLogo() {
  return (
    <div className="text-slate-500 flex items-center">
      <Image src={logo} height={32} width={150} alt="" />
    </div>
  );
}
