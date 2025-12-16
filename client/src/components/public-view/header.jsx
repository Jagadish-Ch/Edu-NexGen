import { websiteName } from "@/config";
import { GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";

const PublicViewHeader = ({ guestAccountAccess = true }) => {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center justify-between border-b text-white sticky top-0 w-full bg-slate-900">
        <Link to={"/"} className="flex items-center justify-center dark:hover:text-yellow-600">
          <GraduationCap className="h-8 w-8 mr-4" />
          {/* <span className="font-extrabold text-xl">LEARN</span>
          <Plus strokeWidth={4} /> */}
          <span className="font-extrabold text-xl">{websiteName}</span>
          
        </Link>
        <Link to={"/guest-login"}>
        {guestAccountAccess && <button className="font-extrabold text-xl text-black hover:text-yellow-700 p-1 rounded-md">Guest Login</button>}
        </Link>
    </header>
  )
}

export default PublicViewHeader;
