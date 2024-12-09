"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";

import { Button, Col, DatePicker, Form, Row, notification } from "antd";
import { IUser } from "@/type/type";
import { useEffect, useState } from "react";
import api from "./api";
import dayjs from "dayjs";

export function ProfileSettings() {
  const [form] = Form.useForm();
  const [_, setUser] = useState<IUser>();

  useEffect(() => {
    const fetchUser = async () => {
      const userId = localStorage.getItem("userId");
      try {
        const res = await api.get(`/user/find-by-id/${userId}`);
        const userData = res.data;

        form.setFieldsValue({
          ...userData,
          birthDate: userData.birthDate ? dayjs(userData.birthDate) : null,
        });
        console.log("userData", userData);

        setUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, [form]);

  const handleProfileSettings = async (values: any) => {
    const birthDate = new Date(values.birthDate);

    // Mahalliy vaqtni to'g'ri formatlash
    const formattedBirthDate = new Date(
      birthDate.getFullYear(),
      birthDate.getMonth(),
      birthDate.getDate()
    )
      .toISOString()
      .split("T")[0];

    const userId = localStorage.getItem("userId");
    // const passw = user?.password === values.password;
    const res = await api.put(`/user/update/${userId}`, {
      ...values,
      birthDate: formattedBirthDate,
    });
    console.log("res", res);
    notification.success({
      message: "Success",
      description: "Profile updated successfully",
    });
  };

  return (
    <div className="space-y-6">
      {/* <Card>
        <CardHeader>
          <CardTitle>Account</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">
                Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                defaultValue="akbarova42@gmail.com"
                className="bg-gray-50"
              />
            </div>
          </div>
        </CardContent>
      </Card> */}

      <Card>
        <CardHeader>
          <CardTitle>Personal information</CardTitle>
        </CardHeader>
        <CardContent>
          <Form layout="vertical" form={form} onFinish={handleProfileSettings}>
            <Row gutter={16}>
              <Col xl={12} lg={12} md={24} sm={24} xs={24}>
                <Form.Item label="username" name={"username"}>
                  <Input />
                </Form.Item>
              </Col>
              <Col xl={12} lg={12} md={24} sm={24} xs={24}>
                <Form.Item label="surname" name={"surname"}>
                  <Input />
                </Form.Item>
              </Col>
              <Col xl={12} lg={12} md={24} sm={24} xs={24}>
                <Form.Item label="email" name={"email"}>
                  <Input />
                </Form.Item>
              </Col>

              <Col xl={12} lg={12} md={24} sm={24} xs={24}>
                <Form.Item
                  style={{ minWidth: "100%", minHeight: "100%" }}
                  label="birthDate"
                  name={"birthDate"}
                >
                  <DatePicker style={{ minWidth: "100%", minHeight: "100%" }} />
                </Form.Item>
              </Col>
              <Col xl={12} lg={12} md={24} sm={24} xs={24}>
                <Form.Item
                  style={{ minWidth: "100%" }}
                  label="phoneNumber"
                  name={"phoneNumber"}
                >
                  <Input style={{ minWidth: "100%" }} />
                </Form.Item>
              </Col>
              <Col xl={12} lg={12} md={24} sm={24} xs={24}>
                <Form.Item label="passportSeries" name={"passportSeries"}>
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Button
              className="bg-[#2395DE] text-white hover:text-white hover:bg-[#2086c5] border-0"
              htmlType="submit"
            >
              Save
            </Button>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
