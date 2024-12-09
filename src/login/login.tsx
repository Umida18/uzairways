import {
  Button,
  Col,
  DatePicker,
  Dropdown,
  Form,
  Input,
  Layout,
  MenuProps,
  Row,
  Typography,
  message,
  notification,
} from "antd";
import { useEffect, useMemo, useState } from "react";
import "./login.scss";
import { useLocation, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { login, register } from "../api/auth";
import { handleApiError } from "@/utils/apiErrorHandler";

const { Header, Content } = Layout;

const LoginPage = () => {
  const [isRegisterForm, setIsRegisterForm] = useState<boolean>(false);
  const navigate = useNavigate();
  const [loginForm] = Form.useForm();
  const [registerForm] = Form.useForm();
  const location = useLocation();

  const items: MenuProps["items"] = useMemo(
    () => [
      {
        label: "Русский",
        key: "1",
      },
      {
        label: "English",
        key: "2",
      },
    ],
    []
  );

  useEffect(() => {
    setIsRegisterForm(location.pathname === "/register");
  }, [location]);

  const switchForm = (isRegister: boolean) => {
    navigate(isRegister ? "/register" : "/login");
  };

  const emailPattern = /^[a-zA-z0-9.]+@gmail\.com$/;
  const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

  const onFinishFailed = (errorInfo: any) => {
    console.log("Form errors: ", errorInfo);
  };
  const handleLogin = async (values: {
    username: string;
    password: string;
  }) => {
    try {
      const response = await login({
        username: values.username,
        password: values.password,
      });

      const token = response.token || response.data?.token;
      if (!token) {
        throw new Error("Token not found in response.");
      }
      console.log("Login response:", response);

      localStorage.setItem("token", token);
      // localStorage.setItem("userId", userId);
      notification.success({
        message: "Login successfully!",
      });

      navigate("/");
    } catch (error: any) {
      handleApiError(error, navigate);
    }
  };

  const handleRegister = async (values: {
    username: string;
    surname: string;
    password: string;
    email: string;
    birthDate: string;
    phoneNumber: string;
    address: string;
    passportSeries: string;
  }) => {
    console.log("Registration values:", values);
    try {
      const response = await register({
        ...values,
        role: "USER",
        balance: 0,
        birthDate: dayjs(values.birthDate).format("YYYY-MM-DD"),
      });
      console.log("Registration response:", response);

      message.success("Registration successful!");
      navigate("/login");
    } catch (error: any) {
      handleApiError(error, navigate);
    }
  };

  return (
    <div className="flex flex-col text-white min-h-screen !justify-between bg-[url(https://percab.uzairways.com/assets/bg_banner-2c69d0de.jpg)] bg-fixed bg-cover pb-5">
      <Header className="bg-transparent px-10 py-6 h-[100%]">
        <Row className="flex justify-between">
          <Col>
            <img
              src="https://percab.uzairways.com/assets/logo-fcb75195.svg"
              alt=""
            />
          </Col>
          <Col>
            <Dropdown menu={{ items }} trigger={["click"]}>
              <Button className="bg-white" type="text">
                O'zbek tili
              </Button>
            </Dropdown>
          </Col>
        </Row>
      </Header>
      <Content className="px-10 py-6">
        <Row className="flex justify-between">
          <Col xl={12} className=" flex flex-col justify-center items-start">
            <Typography className="text-5xl font-bold text-white mb-5">
              Login or Register
            </Typography>
            <Typography className="text-white my-6 text-xl">
              What are the benefits of registering with «Uzbekistan Airways» JSC
              ?
            </Typography>
            <ol className="custom-list p-4">
              <li className="mb-6 text-lg text-white">
                Registration of additional services for a comfortable flight
              </li>
              <li className="mb-6 text-lg text-white">
                Possibility of online check-in for a flight, without queues
              </li>
              <li className="mb-6 text-lg text-white">
                Ability to choose a comfortable seat on the plane
              </li>
              <li className="mb-6 text-lg text-white">
                View ticket purchase history with detailed information
              </li>
            </ol>
          </Col>
          <Col xl={12} className="flex justify-end items-center w-[100%]">
            <div className="bg-white w-[480px] py-10 px-8 rounded-lg">
              <div
                //   css={formStyle}
                className="w-[100%]"
              >
                <div className="flex">
                  <Typography
                    style={{
                      color: "black",
                      fontWeight: 700,
                      fontSize: "29px",
                      marginBottom: "30px",
                    }}
                  >
                    Login
                  </Typography>
                </div>
                {!isRegisterForm && (
                  <Form
                    onFinish={handleLogin}
                    onFinishFailed={onFinishFailed}
                    form={loginForm}
                    layout="vertical"
                  >
                    <Form.Item
                      name="username"
                      label="Username"
                      rules={[
                        { required: true, message: "Please input your email!" },
                      ]}
                    >
                      {/* <Typography
                          style={{ fontSize: "18px", marginBottom: "10px" }}
                        >
                          Email
                        </Typography> */}
                      <Input style={{ borderRadius: "10px", height: "45px" }} />
                    </Form.Item>
                    <Form.Item
                      name="password"
                      label="Password"
                      rules={[
                        {
                          required: true,
                          message: "Please input your password!",
                        },
                        {
                          pattern: passwordPattern,
                          message:
                            "Password must be at least 6 characters, letters and numbers!",
                        },
                      ]}
                    >
                      {/* <Typography
                          style={{ fontSize: "18px", marginBottom: "10px" }}
                        >
                          Password
                        </Typography> */}
                      <Input style={{ borderRadius: "10px", height: "45px" }} />
                    </Form.Item>

                    {/* <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          minWidth: "100%",
                          marginBottom: "10px",
                        }}
                      >
                        <Checkbox style={{ fontSize: "1.25rem" }}>
                          Remember me
                        </Checkbox>
                        <Link
                          style={{
                            color: "#16a34a",
                            fontWeight: 600,
                            fontSize: "1.25rem",
                          }}
                          to="ggg"
                        >
                          Forgot password
                        </Link>
                      </div> */}
                    <Form.Item>
                      <Button
                        style={{
                          backgroundColor: "#16a34a",

                          width: "100%",
                          height: "52px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          color: "white",
                          borderRadius: "10px",
                          border: "0",
                          marginBlock: "10px",
                          fontWeight: 600,
                          fontSize: "1.25rem",
                        }}
                        block
                        htmlType="submit"
                        // disabled={!isButtonActive}
                      >
                        Login
                      </Button>
                      <Button
                        onClick={() => switchForm(true)}
                        style={{
                          backgroundColor: "transparent",
                          width: "100%",
                          height: "52px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          color: "#16a34a",
                          fontSize: "1.25rem",
                          borderRadius: "10px",
                          border: "2px solid #16a34a",
                          fontWeight: 600,
                        }}
                      >
                        Don't have an account? Register
                      </Button>
                    </Form.Item>
                  </Form>
                )}
                {isRegisterForm && (
                  <Form
                    form={registerForm}
                    onFinish={handleRegister}
                    layout="vertical"
                  >
                    <Form.Item
                      label="Username"
                      name="username"
                      rules={[
                        {
                          required: true,
                          message: "Please input your last name!",
                        },
                        {
                          min: 2,
                          message: "Last name must be at least 2 characters",
                        },
                      ]}
                    >
                      {/* <Typography
                          style={{ fontSize: "18px", marginBottom: "10px" }}
                        >
                          First name
                        </Typography> */}
                      <Input style={{ borderRadius: "10px", height: "45px" }} />
                    </Form.Item>
                    <Form.Item
                      label="Surname"
                      name="surname"
                      rules={[
                        {
                          required: true,
                          message: "Please input your birth date!",
                        },
                        {
                          min: 2,
                          message: "Last name must be at least 2 characters",
                        },
                      ]}
                    >
                      {/* <Typography
                          style={{ fontSize: "18px", marginBottom: "10px" }}
                        >
                          Last name
                        </Typography> */}
                      <Input style={{ borderRadius: "10px", height: "45px" }} />
                    </Form.Item>
                    <Form.Item
                      name="email"
                      label="Email"
                      rules={[
                        { required: true, message: "Please input your email!" },
                        {
                          pattern: emailPattern,
                          message: "Invalid email format!",
                        },
                      ]}
                    >
                      {/* <Typography
                          style={{ fontSize: "18px", marginBottom: "10px" }}
                        >
                          Email
                        </Typography> */}
                      <Input style={{ borderRadius: "10px", height: "45px" }} />
                    </Form.Item>
                    <Form.Item
                      name="password"
                      label="Password"
                      rules={[
                        {
                          required: true,
                          message: "Please input your password!",
                        },
                        {
                          pattern: passwordPattern,
                          message: "Invalid password format!",
                        },
                      ]}
                    >
                      <Input.Password
                        style={{ borderRadius: "10px", height: "45px" }}
                      />
                    </Form.Item>

                    <Form.Item
                      label="Birth date"
                      name="birthDate"
                      rules={[
                        {
                          required: true,
                          message: "Please input your birth date!",
                        },
                      ]}
                    >
                      <DatePicker
                        style={{ width: "100%" }}
                        placeholder="Birth Date"
                      />
                    </Form.Item>
                    <Form.Item label="Phone Number" name="phoneNumber">
                      {/* <Typography
                          style={{ fontSize: "18px", marginBottom: "10px" }}
                        >
                          phoneNumber
                        </Typography> */}
                      <Input style={{ borderRadius: "10px", height: "45px" }} />
                    </Form.Item>
                    <Form.Item label="Passport Series" name="passportSeries">
                      {/* <Typography
                          style={{ fontSize: "18px", marginBottom: "10px" }}
                        >
                          passportSeries
                        </Typography> */}
                      <Input style={{ borderRadius: "10px", height: "45px" }} />
                    </Form.Item>

                    <Form.Item label="Address" name="address">
                      {/* <Typography
                          style={{ fontSize: "18px", marginBottom: "10px" }}
                        >
                          address
                        </Typography> */}
                      <Input style={{ borderRadius: "10px", height: "45px" }} />
                    </Form.Item>
                    <Button
                      onClick={() => switchForm(true)}
                      style={{
                        backgroundColor: "#16a34a",
                        width: "100%",
                        height: "52px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        color: "white",
                        fontSize: "1.25rem",
                        borderRadius: "10px",
                        border: "0",
                        marginBlock: "10px",
                        fontWeight: 600,
                      }}
                      htmlType="submit"
                    >
                      Sign up
                    </Button>
                    <Button
                      onClick={() => switchForm(false)}
                      style={{
                        backgroundColor: "transparent",
                        width: "100%",
                        height: "52px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        color: "#16a34a",
                        fontSize: "1.25rem",
                        borderRadius: "10px",
                        border: "2px solid #16a34a",
                        fontWeight: 600,
                      }}
                    >
                      Already have an account? Login
                    </Button>
                  </Form>
                )}
                {/* </Form> */}
              </div>
            </div>
          </Col>
        </Row>
      </Content>
    </div>
  );
};

export default LoginPage;
