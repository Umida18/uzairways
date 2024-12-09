import { useEffect, useMemo, useState } from "react";
import { Table, Button, Space, Drawer, message } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { useForm } from "antd/es/form/Form";

import { AutoForm, FieldType } from "../../components/auto-form";
import { AirplaneType } from "../../types";
import api from "../../components/api";

export function Airplanes() {
  const [form] = useForm();
  const [editingAirplane, setEditingAirplane] = useState<AirplaneType | null>(
    null
  );
  const [airplanes, setAirplanes] = useState<AirplaneType[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    fetchAirplanes();
  }, []);

  const fetchAirplanes = async () => {
    try {
      const response = await api.get("/airplane/get-all");
      setAirplanes(response.data);
    } catch (error) {
      message.error("Failed to fetch airplanes");
    }
  };

  const handleAdd = () => {
    setEditingAirplane(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (airplane: AirplaneType) => {
    setEditingAirplane(airplane);
    form.setFieldsValue(airplane);
    setIsModalVisible(true);
  };

  const handleDelete = async (id: string) => {
    console.log(id);
    try {
      const response = await api.delete(`/airplane/delete${id}`);
      console.log(response.data);

      message.success("airplanes deleted successfully");
      fetchAirplanes();
    } catch (error) {
      message.error("Failed to delete airplanes");
      console.log(error);
    }
  };

  const onFinish = async (values: Record<string, any>) => {
    try {
      if (editingAirplane) {
        await api.put(`/airplane/update-airplane${editingAirplane.id}`, values);
        message.success("airplanes updated successfully");
      } else {
        await api.post("/airplane/create-airplane", {
          ...values,
        });
        message.success("airplanes added successfully");
      }
      setIsModalVisible(false);
      fetchAirplanes();
    } catch (error) {
      message.error("Failed to save airplanes");
    }
  };

  const columns = [
    {
      title: "model",
      dataIndex: "model",
      key: "model",
    },
    {
      title: "manufacturer",
      dataIndex: "manufacturer",
      key: "manufacturer",
    },
    {
      title: "aircraftType",
      dataIndex: "aircraftType",
      key: "aircraftType",
    },

    {
      title: "passengers",
      dataIndex: "aircraftType",
      key: "aircraftType",
      render: (aircraftType: string) => {
        return aircraftType == "JET"
          ? 60
          : aircraftType == "PROPELLER"
          ? 120
          : 0;
      },
    },

    {
      title: "Action",
      key: "action",
      render: (_: string, record: AirplaneType) => {
        console.log(record);

        return (
          <span className="space-x-2">
            <Button
              icon={<EditOutlined />}
              onClick={() => handleEdit(record)}
              className="text-blue-500 hover:text-blue-700"
            />
            <Button
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(record.id)}
              className="text-red-500 hover:text-red-700"
            />
          </span>
        );
      },
    },
  ];
  const aircraftTypeOptions = [
    {
      label: "JET",
      value: "JET",
    },
    {
      label: "PROPELLER",
      value: "PROPELLER",
    },
  ];

  const fields = useMemo(
    () =>
      [
        {
          label: "model",
          name: "model",
          rules: [{ required: true, message: "Пустое поле!" }],
        },
        {
          label: "manufacturer",
          name: "manufacturer",
          rules: [{ required: true, message: "Пустое поле!" }],
        },
        {
          label: "aircraftType",
          name: "aircraftType",
          rules: [{ required: true, message: "Пустое поле!" }],
          type: "select",
          options: aircraftTypeOptions,
        },
      ] as FieldType[],
    [airplanes]
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-end items-center mb-4">
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAdd}
            className="bg-blue-500 hover:bg-blue-700"
          >
            Add New airplanes
          </Button>
        </div>
        <Table columns={columns} dataSource={airplanes} />
      </div>

      <Drawer
        title="airplanes"
        onClose={() => setIsModalVisible(false)}
        open={isModalVisible}
        extra={
          <Space>
            {/* <Button onClick={handleModalCancel}>Cancel</Button> */}
            <Button onClick={() => form.submit()} type="primary">
              Save
            </Button>
          </Space>
        }
        width={700}
        forceRender={true}
      >
        <AutoForm
          fields={fields}
          columnSize={2}
          form={form}
          onFinish={onFinish}
          loading={false}
        />
      </Drawer>
    </div>
  );
}
