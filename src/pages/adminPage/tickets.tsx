import { useEffect, useState } from "react";
import { Table, Button, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

import api from "../../components/api";
import { TicketType } from "@/types";

export function Tickets() {
  const [tickets, setTickets] = useState<TicketType[]>([]);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await api.get("/ticket/get-all");
      setTickets(response.data);
    } catch (error) {
      message.error("Failed to fetch flights");
    }
  };

  const handleDelete = async (id: string) => {
    console.log(id);
    try {
      const response = await api.delete(`/ticket/delete${id}`);
      console.log(response.data);

      message.success("tickets deleted successfully");
      fetchTickets();
    } catch (error) {
      message.error("Failed to delete tickets");
      console.log(error);
    }
  };

  const columns = [
    {
      title: "classType",
      dataIndex: "classType",
      key: "classType",
      render: (ClassType: string, record: TicketType) => {
        console.log(ClassType);

        ClassType =
          record.price == 200
            ? "ECONOMY"
            : record.price == 500
            ? "FIRST"
            : "BUSINESS";

        return <p>{ClassType}</p>;
      },
    },
    {
      title: "departureTime",
      dataIndex: "departureTime",
      key: "departureTime",
    },
    {
      title: "arrivalTime",
      dataIndex: "arrivalTime",
      key: "arrivalTime",
    },
    {
      title: "price",
      dataIndex: "price",
      key: "price",
      render: (value: any) => {
        return value + " $";
      },
    },

    {
      title: "bron",
      dataIndex: "bron",
      key: "bron",
      render: (value: any) => {
        return value ? (
          <p className="text-green-400 font-bold">Bron</p>
        ) : (
          <p className="text-red-500 font-bold">Not Bron</p>
        );
      },
    },

    {
      title: "Action",
      key: "action",
      render: (_: string, record: TicketType) => {
        console.log(record);

        return (
          <span className="space-x-2">
            {!record.bron && (
              <Button
                icon={<DeleteOutlined />}
                onClick={() => handleDelete(record.ticketId)}
                className="text-red-500 hover:text-red-700"
              />
            )}
          </span>
        );
      },
    },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white rounded-lg shadow p-6">
        <Table columns={columns} dataSource={tickets} scroll={{ x: 1000 }} />
      </div>
    </div>
  );
}
