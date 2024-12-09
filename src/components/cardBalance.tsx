import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";
import api from "./api";
import { Col, Form, InputNumber, Row, notification } from "antd";
import { IUser } from "@/type/type";

export default function BuyTicketsCard() {
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
        description: `Successfully sent ${values.balance} USD to ${user.username}.`,
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
    <Card className="w-full  lg:!my-0 my-5">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-[#2885cb]">
          Check your balance
        </CardTitle>
        {/* <CardDescription>Check your balance and add funds</CardDescription> */}
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between p-4 bg-[#f5f8fa] rounded-lg">
          <div className="flex items-center space-x-4">
            <Wallet className="h-6 w-6 text-[#479fe1]" />
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Current Balance
              </p>
              <p className="text-2xl font-bold text-[#479fe1]">
                $ {user?.balance}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="flex space-x-2 w-full">
          {/* <Input
            type="number"
            placeholder="Amount to add"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="flex-grow"
          />
          <Button onClick={handleAddFunds}>Add Funds</Button> */}
          <Form
            style={{ minWidth: "100%" }}
            form={form}
            onFinish={handleSendMoney}
            layout="horizontal"
          >
            <Row gutter={[10, 10]}>
              <Col xl={24} sm={24} style={{ height: "36px", minWidth: "full" }}>
                <Form.Item
                  name="balance"
                  rules={[
                    { required: true, message: "Please enter an amount" },
                    {
                      type: "number",
                      min: 1,
                      message: "Amount must be greater than 0",
                    },
                  ]}
                >
                  <InputNumber
                    placeholder="Enter amount"
                    style={{ width: "100%", height: "36px" }}
                  />
                </Form.Item>
              </Col>
              <Col xl={24} sm={24}>
                <Form.Item>
                  <Button
                    style={{
                      width: "100%",
                      height: "36px",
                      backgroundColor: "#479fe1",
                    }}
                    type="submit"
                    className="w-full"
                  >
                    Send Money
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      </CardFooter>
    </Card>
  );
}
