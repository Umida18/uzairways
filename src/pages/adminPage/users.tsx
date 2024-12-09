import { useEffect, useState } from "react";
import { Table, message } from "antd";

import { User } from "../../types";
import api from "../../components/api";

export function Users() {
  const [admins, setAdmins] = useState<User[]>([]);

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const response = await api.get("/user/all-user");
      setAdmins(response.data);
    } catch (error) {
      message.error("Failed to fetch admins");
    }
  };

  const columns = [
    {
      title: "FULLNAME",
      dataIndex: "id",
      key: "id",
      render: (value: any) => {
        const n = admins.find((admin) => admin.id == value);
        return n ? <p>{n.username + " " + n.surname}</p> : "-";
      },
    },

    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },

    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "birthday",
      dataIndex: "birthDate",
      key: "birthDate",
    },
    {
      title: "phoneNumber",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "balance",
      dataIndex: "balance",
      key: "balance",
    },
    {
      title: "address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "passportSeries",
      dataIndex: "passportSeries",
      key: "passportSeries",
    },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white rounded-lg shadow p-6">
        <Table columns={columns} dataSource={admins} />
      </div>
    </div>
  );
}
