import { Button, Col, Row, Typography } from "antd";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useFlights } from "../../../context/FlightsContext";
import { PriceComponent } from "../../../utils/utils";

interface ITickets {
  arrivalTime?: string;
  bron?: boolean;
  classType: string;
  departureTime?: string;
  flightNumber?: string;
  price?: number;
  ticketId?: string;
  [key: string]: any;
}

const CardPrice = () => {
  const navigate = useNavigate();

  const { flights } = useFlights();

  const [searchParams] = useSearchParams();

  const passengers = searchParams.get("passengers");

  const colors = ["#479fe1", "#F1C40F", "#16a34a", "#8e44ad", "#e74c3c"];

  const uniqueClassTypes = Array.from(
    new Set(flights.map((flight) => flight.classType))
  );

  const getClassTypeColor = (classType: string) => {
    const index = uniqueClassTypes.indexOf(classType);
    return colors[index % colors.length];
  };

  const uniqueFlights = Object.values(
    flights.reduce<Record<string, ITickets>>((acc, flight) => {
      if (!acc[flight.classType]) {
        acc[flight.classType] = flight;
      }
      return acc;
    }, {})
  );
  console.log("uniqueFlights", uniqueFlights);

  return (
    <div className="mt-14">
      <Typography
        style={{
          color: "#828282",
          fontWeight: 700,
          fontSize: "16px",
          marginBlock: 25,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        className="flex items-center gap-1"
      >
        <IoIosInformationCircleOutline style={{ color: "#9ca7b1" }} /> Important
        information
      </Typography>
      {uniqueFlights.length > 0 ? (
        <Row
          gutter={[20, 20]}
          style={{ display: "flex", justifyContent: "center" }}
        >
          {uniqueFlights.map((flight) => (
            <Col xl={6} key={flight.ticketId}>
              <div
                className="hover:shadow-lg"
                style={{
                  background: "#e8f1ff",
                  border: "none",
                  paddingBlock: 10,
                  borderRadius: 8,
                }}
              >
                <Typography
                  style={{
                    background: getClassTypeColor(flight.classType),
                    padding: 5,
                    color: "white",
                    fontSize: 18,
                    fontWeight: 700,
                  }}
                >
                  {flight.classType}
                </Typography>
                <div className="p-3">
                  <Typography
                    style={{ color: "#479fe1", fontWeight: 700, fontSize: 24 }}
                  >
                    <PriceComponent price={String(flight.price)} />
                  </Typography>
                  <Button
                    onClick={() =>
                      navigate(
                        `/buyTicket?passengers=${passengers}&classType=${flight.classType}`
                      )
                    }
                    className="w-full"
                    style={{
                      color: "#2885cb",
                      fontSize: "16px",
                      padding: 20,
                      marginTop: 30,
                    }}
                  >
                    Go to issue
                  </Button>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      ) : (
        <Typography
          style={{ textAlign: "center", fontSize: "18px", color: "#828282" }}
        >
          No flights available. Please try a new search.
        </Typography>
      )}
    </div>
  );
};

export default CardPrice;
