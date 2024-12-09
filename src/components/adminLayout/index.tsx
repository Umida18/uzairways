import { useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Layout as LayoutAntd,
  Menu,
  message,
  Modal,
  Typography,
} from "antd";
import { Link, useLocation } from "react-router-dom";
import api from "../api";
import { User } from "../../types";
const { Title } = Typography;
const { Header, Sider, Content } = LayoutAntd;
import moment from "moment";

export const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const path = location.pathname.split("/admin/")[1];
  console.log("path", path);
  const [selectedKey, setSelectedKey] = useState<string>(path);
  let title = path.charAt(0).toUpperCase() + path.slice(1);
  const handleClick = (e: any) => {
    setSelectedKey(e.key);
  };
  console.log(title);

  const [me, setMe] = useState<User | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isEditMode, setEditMode] = useState(false);
  const [form] = Form.useForm();
  const userId = localStorage.getItem("userId");
  console.log(userId); // User IDni konsolga chiqarish

  useEffect(() => {
    FetchMe();
  }, []);

  const FetchMe = async () => {
    try {
      const response = await api.get(`/user/find-by-id/${userId}`);
      setMe(response.data);
      // setModalOpen(true);
    } catch (error) {
      message.error("Failed to fetch admins");
    }
  };
  console.log("me", me);

  // Ma'lumotlarni PUT qilish
  const updateMe = async (id: string, updatedUser: User) => {
    try {
      await api.put(`/user/update/${id}`, updatedUser);
      setMe(updatedUser);
      setEditMode(false);
      Modal.success({ content: "User data updated successfully!" });
    } catch (error) {
      console.error("Error updating user data:", error);
      Modal.error({ content: "Failed to update user data." });
    }
  };

  // Modalni yopish
  const handleClose = () => {
    setModalOpen(false);
    setEditMode(false);
  };

  // Form ma'lumotlarini yuborish
  const handleFormSubmit = async () => {
    try {
      const updatedFields = await form.validateFields();
      if (me) {
        const finalUser: User = {
          ...me,
          ...updatedFields,
          birthday: updatedFields.birthday.format("YYYY-MM-DD"),
        };
        updateMe(finalUser.id, finalUser);
      }
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  return (
    <LayoutAntd className="bg-white">
      <Sider
        className="   w-[280px] p-5 "
        collapsed={collapsed}
        style={{
          width: 500,
          background: "rgb(5,62,139)",
          // borderTopLeftRadius: "10px",
          // borderBottomLeftRadius: "10px",
          // borderTopRightRadius: "150px",
          // borderBottomRightRadius: "10px",
        }}
      >
        <div className="demo-logo-vertical" />

        <div className="ps-2 mb-4 mt-5">
          {" "}
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
              color: "white",
            }}
          />
        </div>
        <Menu
          style={{ background: "rgb(5,62,139)", color: "white" }}
          mode="inline"
          selectedKeys={[selectedKey]}
          onClick={handleClick}
          items={[
            {
              key: "/admin/users",
              icon: <UserOutlined style={{ color: "black" }} />,
              label: (
                <Link to="users" style={{ color: "black" }}>
                  Users
                </Link>
              ),
            },
            {
              key: "/admin/tickets",
              icon: <UserOutlined style={{ color: "black" }} />,
              label: (
                <Link to="tickets" style={{ color: "black" }}>
                  Tickets
                </Link>
              ),
            },

            {
              key: "/admin/flights",
              icon: <UploadOutlined style={{ color: "black" }} />,
              label: (
                <Link to="flights" style={{ color: "black" }}>
                  Flights
                </Link>
              ),
            },
            {
              key: "/admin/airplanes",
              icon: <UploadOutlined style={{ color: "black" }} />,
              label: (
                <Link to="airplanes" style={{ color: "black" }}>
                  Airplanes
                </Link>
              ),
            },
          ]}
        />
      </Sider>
      <LayoutAntd className="bg-white">
        <Header
          className="flex px-12 flex-row justify-between items-center mb-0 bg-white"
          style={{
            margin: "24px 16px",
            marginBottom: "0px",
          }}
        >
          <Title>{title}</Title>

          <div
            className="flex flex-row  items-center gap-3 cursor-pointer"
            onClick={() => setModalOpen(true)}
          >
            <div className="flex flex-col ">
              <Title level={5}>
                <button>{`${me?.username} `}</button>
              </Title>
              <Title
                className="text-gray-500 p-0 m-0 text-end"
                style={{ fontSize: "10px", margin: "0" }}
              >
                {me?.role}
              </Title>
            </div>
            <img
              src="https://banner2.cleanpng.com/20180622/tqt/aazen4lhc.webp"
              alt=""
              className="w-10 h-10 rounded-full"
            />
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: "750px",
            background: "rgb(240, 242, 245)",
            borderRadius: "30px",
          }}
        >
          {children}
        </Content>
      </LayoutAntd>
      {me && (
        <Modal
          title={isEditMode ? "Edit My Info" : "My Info"}
          visible={isModalOpen}
          onCancel={handleClose}
          footer={
            isEditMode ? (
              <>
                <Button onClick={() => setEditMode(false)}>Cancel</Button>
                <Button type="primary" onClick={handleFormSubmit}>
                  Save Changes
                </Button>
              </>
            ) : (
              <div className="flex gap-2 justify-items-end">
                <Button type="primary" onClick={() => setEditMode(true)}>
                  Edit
                </Button>
                <Button color="danger" variant="solid">
                  <Link to="/">Exit</Link>
                </Button>
              </div>
            )
          }
        >
          {isEditMode ? (
            <Form
              form={form}
              initialValues={{
                username: me.username,
                surname: me.surname,
                email: me.email,
                birthday: moment(me.birthDate),
                phoneNumber: me.phoneNumber,
                balance: me.balance,
                address: me.address,
                passportSeries: me.passportSeries,
              }}
              layout="vertical"
            >
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Surname"
                name="surname"
                rules={[
                  { required: true, message: "Please input your surname!" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    type: "email",
                    message: "Please input a valid email!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Birthday"
                name="birthday"
                rules={[
                  { required: true, message: "Please select your birthday!" },
                ]}
              >
                <DatePicker />
              </Form.Item>
              <Form.Item label="Phone Number" name="phoneNumber">
                <Input />
              </Form.Item>

              <Form.Item label="Address" name="address">
                <Input />
              </Form.Item>
              <Form.Item label="Passport Series" name="passportSeries">
                <Input />
              </Form.Item>
            </Form>
          ) : (
            <div>
              <p>
                <b>Username:</b> {me.username}
              </p>
              <p>
                <b>Surname:</b> {me.surname}
              </p>
              <p>
                <b>Email:</b> {me.email}
              </p>
              <p>
                <b>Birthday:</b> {me.birthDate}
              </p>
              <p>
                <b>Phone Number:</b> {me.phoneNumber}
              </p>

              <p>
                <b>Address:</b> {me.address}
              </p>
              <p>
                <b>Balance:</b> {me.balance}
              </p>
              <p>
                <b>Passport Series:</b> {me.passportSeries}
              </p>
            </div>
          )}
        </Modal>
      )}
    </LayoutAntd>
  );
};

// import React, { useState } from 'react';
// import {
//   MenuFoldOutlined,
//   MenuUnfoldOutlined,
//   UploadOutlined,
//   UserOutlined,
//   VideoCameraOutlined,
// } from '@ant-design/icons';
// import { Button, Layout, Menu, theme } from 'antd';

// const { Header, Sider, Content } = Layout;

// const App: React.FC = () => {
//   const [collapsed, setCollapsed] = useState(false);
//   const {
//     token: { colorBgContainer, borderRadiusLG },
//   } = theme.useToken();

//   return (
//     <Layout>
//       <Sider trigger={null} collapsible collapsed={collapsed}>
//         <div className="demo-logo-vertical" />
//         <Menu
//           theme="dark"
//           mode="inline"
//           defaultSelectedKeys={['1']}
//           items={[
//             {
//               key: '1',
//               icon: <UserOutlined />,
//               label: 'nav 1',
//             },
//             {
//               key: '2',
//               icon: <VideoCameraOutlined />,
//               label: 'nav 2',
//             },
//             {
//               key: '3',
//               icon: <UploadOutlined />,
//               label: 'nav 3',
//             },
//           ]}
//         />
//       </Sider>
//       <Layout>
//         <Header style={{ padding: 0, background: colorBgContainer }}>
//           <Button
//             type="text"
//             icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
//             onClick={() => setCollapsed(!collapsed)}
//             style={{
//               fontSize: '16px',
//               width: 64,
//               height: 64,
//             }}
//           />
//         </Header>
//         <Content
//           style={{
//             margin: '24px 16px',
//             padding: 24,
//             minHeight: 280,
//             background: colorBgContainer,
//             borderRadius: borderRadiusLG,
//           }}
//         >
//           Content
//         </Content>
//       </Layout>
//     </Layout>
//   );
// };

// export default App;
