import { Ticket, Award, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Typography } from "antd";
import api from "./api";
import { useEffect, useState } from "react";
import { IUser } from "@/type/type";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const navigation = [
  // { id: "booking", name: "Booking", icon: Gift },
  // { id: "services", name: "Additional services", icon: Box },
  // { id: "orders", name: "Orders History", icon: Package },
  { id: "tickets", name: "Tickets", icon: Ticket },
  { id: "balance", name: "Balance", icon: Award },
  { id: "profile", name: "Profile settings", icon: Settings },
];

export function Sidebar({ activeSection, setActiveSection }: SidebarProps) {
  const [user, setUser] = useState<IUser>();
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    const fetchUser = async () => {
      const res = await api.get(`/user/find-by-id/${userId}`);

      setUser(res.data);
    };
    fetchUser();
  }, [user]);

  const logout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Card className="w-64 bg-white rounded-lg shadow-xl p-6 h-[100%]">
      <div className="flex items-start gap-3 mb-8 flex-col">
        {/* <div className="flex items-center ">
          <img
            src="https://percab.uzairways.com/assets/blue_flag-61a4f26f.svg"
            alt="UzAirPlus"
            className="h-6"
          />
          <Typography style={{ color: "#2395DE", fontWeight: 700 }}>
            UzAirPlus{" "}
          </Typography>
        </div> */}
        <div className="flex items-center gap-2">
          <Typography style={{}}>Balance:</Typography>

          <span className="text-xl font-bold">$ {user?.balance}</span>
        </div>
      </div>
      <nav className="flex flex-col justify-between h-[40vh]">
        <div>
          {navigation.map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              className={`w-full justify-start ${
                activeSection === item.id
                  ? "bg-[#2395DE] text-white hover:text-white hover:bg-[#2086c5]"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              onClick={() => setActiveSection(item.id)}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </Button>
          ))}
        </div>
        <Button
          onClick={logout}
          variant="ghost"
          className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700"
        >
          <LogOut className="mr-3 h-5 w-5" />
          Logout
        </Button>
      </nav>
    </Card>
  );
}
