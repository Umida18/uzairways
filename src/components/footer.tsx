import { Layout } from "antd";

const { Footer } = Layout;

export function FooterMain() {
  return (
    <Footer className="bg-[#479fe1] px-12">
      <div className=" text-center">
        <p className="text-gray-100">
          &copy; {new Date().getFullYear()} Uzbekistan Airways. All rights
          reserved.
        </p>
      </div>
    </Footer>
  );
}
