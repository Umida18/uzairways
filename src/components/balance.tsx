"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button, Form, InputNumber, notification } from "antd";
import { IUser } from "@/type/type";
import api from "./api";

export function Balance() {
  const [form] = Form.useForm();
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userId = localStorage.getItem("userId");
      try {
        const res = await api.get(`/user/find-by-id/${userId}`);
        setUser(res.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        notification.error({
          message: "Error",
          description: "Failed to fetch user data. Please try again.",
        });
      }
    };
    fetchUser();
  }, [user]);

  const handleSendMoney = async (values: IUser) => {
    const userId = localStorage.getItem("userId");
    if (!user || !userId) return;

    const newBalance = values.balance;

    try {
      console.log("Request Payload:", { ...user, balance: newBalance });

      const response = await api.post(
        `/user/add-balance?userId=${userId}&balance=${newBalance}`
      );

      console.log("API Response:", response.data);

      // if (response.data) {
      setUser(response.data);
      form.resetFields();
      notification.success({
        message: "Success",
        description: `Successfully sent $${values.balance} to ${user.username}.`,
      });
      // }
    } catch (error) {
      console.error("Error sending money:", error);
      notification.error({
        message: "Error",
        description: "Failed to send money. Please try again.",
      });
    }
  };

  return (
    <Card className="border-sky-100">
      <CardHeader className="border-b border-sky-100">
        <CardTitle className="text-sky-900">Balance</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold mb-6 mt-5">
          Current Balance: {user?.balance} $
        </p>
        <Form form={form} onFinish={handleSendMoney} layout="vertical">
          <Form.Item
            name="balance"
            label="Amount to Send"
            rules={[
              { required: true, message: "Please enter an amount" },
              {
                type: "number",
                min: 1,
                message: "Amount must be greater than 0",
              },
            ]}
          >
            <InputNumber placeholder="Enter amount" style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              Send Money
            </Button>
          </Form.Item>
        </Form>
      </CardContent>
    </Card>
  );
}
