import { Card, Col, Layout, Row, Typography } from "antd";
import { IoIosArrowRoundForward } from "react-icons/io";
import { GiAirplaneArrival, GiAirplaneDeparture } from "react-icons/gi";
import CardPrice from "./cardPrice";
import BuyTicketsCard from "../../../components/cardBalance";
import HeaderMain from "@/components/headerMain";
import { FooterMain } from "@/components/footer";
import { formattedDay, formattedTime } from "@/utils/utils";

const { Content } = Layout;

interface SearchParams {
  departureAirport: string;
  arrivalAirport: string;
  departureTime: string;
  passengers: number;
}

interface Flight {
  ticketId: string;
  flightNumber: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
  classType: string;
  bron: boolean;
}

const FlightsPage = () => {
  const getLastSearchParams = (): SearchParams | null => {
    const data = localStorage.getItem("lastSearchParams");
    if (!data) return null;
    try {
      return JSON.parse(data) as SearchParams;
    } catch (error) {
      console.error("Error parsing lastSearchParams from localStorage:", error);
      return null;
    }
  };

  const getFlight = (): Flight | null => {
    const data = localStorage.getItem("flights");
    if (!data) return null;
    try {
      const flights = JSON.parse(data) as Flight[];
      return flights[0] || null; // Return the first flight or null if no flights
    } catch (error) {
      console.error("Error parsing flights from localStorage:", error);
      return null;
    }
  };

  const lastSearchParam = getLastSearchParams();
  const flight = getFlight();

  if (!flight) {
    return <div>No flight data available.</div>;
  }

  return (
    <div className="">
      <HeaderMain />
      <Content
        style={{
          padding: "20px",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div className="w-full">
          <Row gutter={16}>
            <Col xs={24} sm={24} md={24} lg={18} xl={18}>
              <Card className="border-2 border-[#cdddf3] bg-[#f5f8fa] mb-4">
                <div className="flex gap-3 mb-5">
                  <img
                    className="w-[40px] h-[40px]"
                    src="https://booking.uzairways.com/images/logo.svg"
                    alt=""
                  />
                  <span className="border-2 border-[#479fe1] bg-white color-[#479fe1] font-semibold rounded-lg px-3 flex justify-center items-center">
                    {flight.flightNumber}
                  </span>
                  <div className="flex gap-2 !justify-center items-center ">
                    <Typography
                      style={{
                        color: "#479fe1",
                        fontWeight: "bolder",
                        fontSize: "16px",
                      }}
                    >
                      {lastSearchParam?.departureAirport}
                    </Typography>
                    <div className="flex justify-center items-center">
                      <IoIosArrowRoundForward
                        style={{
                          color: "#479fe1",
                          fontWeight: "bolder",
                          fontSize: "24px",
                        }}
                      />
                    </div>
                    <Typography
                      style={{
                        color: "#479fe1",
                        fontWeight: "bolder",
                        fontSize: "16px",
                      }}
                    >
                      {lastSearchParam?.arrivalAirport}
                    </Typography>
                  </div>
                </div>
                <Row gutter={[20, 20]} className="">
                  <Col xl={4}>
                    <Typography
                      style={{
                        color: "#2885cb",
                        fontWeight: 700,
                        fontSize: "26px",
                      }}
                    >
                      {formattedTime(flight.departureTime)}
                    </Typography>
                    <Typography
                      style={{
                        color: "#828282",
                        fontWeight: 700,
                      }}
                    >
                      {formattedDay(flight.departureTime)}
                    </Typography>
                  </Col>
                  <Col xl={16} className="w-[100%] flex ">
                    <div className="w-[120px] flex justify-center items-center mb-9 gap-3">
                      <Typography
                        style={{
                          color: "#479fe1",
                          fontWeight: 600,
                          fontSize: "18px",
                        }}
                      >
                        TAS
                      </Typography>
                      <GiAirplaneDeparture
                        style={{
                          color: "#479fe1",
                          fontWeight: "bold",
                          fontSize: "40px",
                        }}
                      />
                    </div>
                    <div className="flex flex-col w-[100%] gap-4">
                      <Typography
                        className="flex justify-center"
                        style={{
                          color: "#479fe1",
                          fontSize: "18px",
                          fontWeight: 600,
                        }}
                      >
                        Airbus 330
                      </Typography>
                      <span className=" h-[2px] border-2 border-dashed border-[#479fe1]"></span>
                    </div>
                    <div className="w-[120px] flex justify-center items-center mb-9 gap-3">
                      <GiAirplaneArrival
                        style={{
                          color: "#479fe1",
                          fontWeight: "bold",
                          fontSize: "40px",
                        }}
                      />
                      <Typography
                        style={{
                          color: "#479fe1",
                          fontWeight: 600,
                          fontSize: "18px",
                        }}
                      >
                        NUK
                      </Typography>
                    </div>
                  </Col>
                  <Col xl={4}>
                    <Typography
                      style={{
                        color: "#2885cb",
                        fontWeight: 700,
                        fontSize: "26px",
                        display: "flex",
                        justifyContent: "end",
                      }}
                    >
                      {formattedTime(flight.arrivalTime)}
                    </Typography>
                    <Typography
                      style={{
                        color: "#828282",
                        fontWeight: 700,
                        display: "flex",
                        justifyContent: "end",
                        textAlign: "end",
                      }}
                    >
                      {formattedDay(flight.arrivalTime)}
                    </Typography>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col xs={24} sm={24} md={24} lg={6} xl={6}>
              <BuyTicketsCard />
            </Col>
          </Row>
          <CardPrice />
        </div>
      </Content>
      <FooterMain />
    </div>
  );
};

export default FlightsPage;
