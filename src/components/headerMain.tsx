import { ChevronDown, Plane, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button, Layout } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { handleApiError } from "@/utils/apiErrorHandler";
import api from "./api";
import { useState } from "react";

const { Header } = Layout;

const HeaderMain = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleCapinet = async () => {
    const userId = localStorage.getItem("userId");
    try {
      await api.get(`/user/find-by-id/${userId}`);
      navigate("/dashboardPage");
    } catch (error) {
      handleApiError(error, navigate);
    }
  };

  return (
    <Header className="bg-[#479fe1] shadow-md h-full">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Plane className="h-8 w-8 text-white" />
            <span className="text-2xl font-bold text-white">
              Uzbekistan Airways
            </span>
          </Link>
          <nav className="hidden md:flex space-x-8">
            <Link
              to="/question"
              className="text-white flex font-semibold text-lg justify-center items-center  h-[32px] hover:text-primary"
            >
              Questions and answers
            </Link>
            <Link
              to="/about"
              className="text-white flex justify-center  font-semibold text-lg items-center h-[32px] hover:text-primary"
            >
              About Us
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  // variant="outlined"
                  className="text-white hover:text-primary   font-semibold text-lg"
                >
                  Admin <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Link to="/admin/users">Admin Panel</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/superAdmin/admins">Super Admin</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              onClick={handleCapinet}
              variant="outlined"
              className="text-white  font-semibold text-lg bg-transparent border-white border-2 border-primary hover:bg-primary hover:text-white"
            >
              <User className="mr-2 h-4 w-4" /> Cabinet
            </Button>
          </nav>
          <div className="md:hidden">
            <Button variant="outlined" onClick={() => setIsOpen(!isOpen)}>
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </Button>
          </div>
        </div>
        {isOpen && (
          <div className="mt-4 md:hidden">
            <Link
              to="/flights"
              className="block py-2 text-white hover:text-primary"
            >
              Questions and answers
            </Link>
            <Link
              to="/about"
              className="block py-2 text-white hover:text-primary"
            >
              About Us
            </Link>
            <Link
              to="/admin"
              className="block py-2 text-white hover:text-primary"
            >
              Admin Panel
            </Link>
            <Link
              to="/super-admin"
              className="block py-2 text-white hover:text-primary"
            >
              Super Admin
            </Link>
            <Link
              to="/cabinet"
              className="block py-2 text-white hover:text-primary"
            >
              Cabinet
            </Link>
          </div>
        )}
      </div>
    </Header>
  );
};

export default HeaderMain;
