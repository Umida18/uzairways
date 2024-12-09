import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";

export function Header() {
  return (
    <header className="bg-white shadow-md border-b border-sky-100">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img
            src="https://percab.uzairways.com/assets/blue_logo-f2fb00b4.svg"
            alt=""
          />
          <h2 className="font-semibold text-xl text-gray-800">Welcome, User</h2>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="text-sky-600 hover:text-sky-700"
        >
          <Bell className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}
