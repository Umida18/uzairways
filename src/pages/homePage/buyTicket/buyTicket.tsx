import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Col,
  DatePicker,
  Form,
  Layout,
  Row,
  Select,
  Typography,
  notification,
} from "antd";
import api from "@/api/api";
import { useFlights } from "@/context/FlightsContext";
import dayjs from "dayjs";
import HeaderMain from "@/components/headerMain";
import { FooterMain } from "@/components/footer";

const { Text } = Typography;
const { Option } = Select;
const { Content } = Layout;

interface PassengerForm {
  username: string;
  firstName: string;
  birthDate: string;
  citizenship: string;
  serialNumber: string;
  validityPeriod: string;
}

export function BuyTicket() {
  const [searchParams] = useSearchParams();
  const [passengerForms, setPassengerForms] = useState<PassengerForm[]>([]);
  const passengers = Number(searchParams.get("passengers") || "1");
  const classTypeParams = searchParams.get("classType");
  const [form] = Form.useForm();
  const { flights } = useFlights();
  const [selectedTickets, setSelectedTickets] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setPassengerForms(
      Array(passengers)
        .fill(null)
        .map(() => ({
          username: "",
          firstName: "",
          birthDate: "",
          citizenship: "O'zbekiston",
          serialNumber: "",
          validityPeriod: "",
        }))
    );
    selectTickets();
  }, [searchParams, passengers, flights]);

  const selectTickets = () => {
    const selected: string[] = [];

    const availableTickets = flights.filter(
      (ticket) => ticket.classType === classTypeParams && !ticket.bron
    );
    const count = Math.min(passengers, availableTickets.length);
    selected.push(
      ...availableTickets.slice(0, count).map((ticket) => ticket.ticketId)
    );

    if (selected.length < passengers) {
      console.error("Not enough tickets available for all passengers");
      // alert("Chipta yetarli emas! Iltimos, boshqa chipta tanlang.");
      navigate("/");
      setSelectedTickets([]);
    } else {
      setSelectedTickets(selected.slice(0, passengers));
    }
  };

  const handleSubmit = async (values: { passengers: PassengerForm[] }) => {
    if (selectedTickets.length !== passengers) {
      // alert("Yetarli chipta tanlanmagan. Iltimos, qaytadan urinib ko'ring.");
      return;
    }
    const formatDate = (date: any) => {
      return dayjs(date).format("YYYY-MM-DD");
    };

    const userId = localStorage.getItem("userId");

    const bookingData = {
      ticketIds: selectedTickets,
      employees: values.passengers.map((passenger) => ({
        ...passenger,
        birthDate: formatDate(passenger.birthDate),
        validityPeriod: formatDate(passenger.validityPeriod),
      })),
    };

    try {
      const response = await api.post(
        `/booking/create-booking?userId=${userId}`,
        bookingData
      );
      console.log("Booking created:", response);
      // alert("Buyurtma muvaffaqiyatli yaratildi!");
      // Navigate to success page or clear form
      notification.success({
        message: "Success",
        description: `Booking created successfully!`,
      });
      localStorage.removeItem("flights");
      localStorage.removeItem("lastSearchParams");
      navigate("/");
    } catch (error: any) {
      console.error("Error submitting form:", error);

      if (error.reponse && error.response.status === 400) {
        notification.error({
          message: "Error",
          description: `Insufficient balance for the booking`,
        });
      } else {
        notification.error({
          message: "Error",
          description: `Error submitting form. Please try again.`,
        });
      }
    }
  };

  return (
    <Layout className="bg-gray-100 min-h-screen">
      <HeaderMain />
      <Content style={{ padding: "60px" }}>
        <Form
          layout="vertical"
          form={form}
          onFinish={handleSubmit}
          className="space-y-6"
        >
          {passengerForms.map((_, index) => (
            <Col key={index} span={24}>
              <Card className="w-full bg-white border-0 shadow-sm p-5">
                <Text className="block mb-4 text-center text-red-500">
                  Barcha kataklar to&apos;ldirilishi, yozuvlar lotin alfavitida
                  kiritilishi shart
                </Text>
                <Row gutter={16}>
                  <Col xs={24} sm={12} md={6}>
                    <Form.Item
                      name={["passengers", index, "username"]}
                      label="First name"
                      rules={[
                        { required: true, message: "First kiritish shart" },
                      ]}
                    >
                      <Input placeholder="First name" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12} md={6}>
                    <Form.Item
                      name={["passengers", index, "firstName"]}
                      label="Last Name"
                      rules={[
                        {
                          required: true,
                          message: "Last name kiritish shart",
                        },
                      ]}
                    >
                      <Input placeholder="Last name" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12} md={6}>
                    <Form.Item
                      name={["passengers", index, "birthDate"]}
                      label="Tug'ilgan sana"
                      rules={[
                        {
                          required: true,
                          message: "Tug'ilgan sana kiritish shart",
                        },
                      ]}
                    >
                      <DatePicker className="w-full" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12} md={6}>
                    <Form.Item
                      name={["passengers", index, "citizenship"]}
                      label="Citizenship"
                      initialValue="O'zbekiston"
                    >
                      <Select>
                        <Option value="O'zbekiston">O&apos;zbekiston</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12} md={6}>
                    <Form.Item
                      name={["passengers", index, "serialNumber"]}
                      label="Seriyasi/raqami"
                      rules={[
                        {
                          required: true,
                          message: "Seriya/raqam kiritish shart",
                        },
                      ]}
                    >
                      <Input placeholder="Seriya raqam" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12} md={6}>
                    <Form.Item
                      name={["passengers", index, "validityPeriod"]}
                      label="Amal qilish muddati"
                      rules={[
                        {
                          required: true,
                          message: "Amal qilish muddatini kiritish shart",
                        },
                      ]}
                    >
                      <DatePicker className="w-full" />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
            </Col>
          ))}
          <div className="flex justify-end">
            <Button style={{ backgroundColor: "#479fe1" }} type="submit">
              Buyurtma berish
            </Button>
          </div>
        </Form>
      </Content>
      <FooterMain />
    </Layout>
  );
}
