import api from "@/api/api";
import { handleApiError } from "@/utils/apiErrorHandler";
import { Card, Col, Row, Spin } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface iCard {
  name: string;
  imageUrl: string;
}

const Tickets = () => {
  const [selectedCity, __] = useState(null);
  const [isHovered, setIsHovered] = useState<number | null>(null);
  const [cities, setCities] = useState<iCard[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const hoverCard = (index: number) => {
    setIsHovered(index);
  };

  const leaveCard = () => {
    setIsHovered(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await api.get("/airport/get-all-airports");
        setCities(res.data);
      } catch (error) {
        console.error("Error fetching airports:", error);
        handleApiError(error, navigate);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await api.get("/airport/get-all-airports");
        setCities(res.data);
      } catch (error) {
        console.error("Error fetching airports:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await api.get("/airport/get-all-airports");
        setCities(res.data);
      } catch (error) {
        console.error("Error fetching airports:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // const getColSpan = (index: number) => {
  //   return index % 6 === 0 ? 12 : 6 && (index + 1) % 6 === 0 ? 12 : 6;
  // };

  const getColSpan = (index: number) =>
    index % 6 === 0 ? 12 : (index + 1) % 6 === 0 ? 12 : 6;

  const filteredCities = selectedCity
    ? cities.filter((item) => item.name === selectedCity)
    : cities;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="bg-white py-8 ">
      <div className=" mx-auto px-16 my-10">
        <Row gutter={[16, 16]}>
          {filteredCities.map((item, index) => (
            <Col key={index} xs={24} sm={12} md={getColSpan(index)}>
              <Card
                key={index}
                className="relative overflow-hidden rounded-lg transition-all duration-500 ease-in-out"
                onMouseEnter={() => hoverCard(index)}
                onMouseLeave={leaveCard}
                style={{
                  borderRadius: "8px",
                  backgroundImage: `url(${item.imageUrl})`,
                  height: "342px",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  border: "none",
                }}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-all duration-500 ease-in-out"
                  style={{
                    backgroundImage: `url(${item.imageUrl})`,
                    filter: `brightness(${
                      isHovered === index ? "70%" : "100%"
                    })`,
                    transform: `scale(${isHovered === index ? "1.05" : "1"})`,
                  }}
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-100 transition-opacity duration-500 ease-in-out"
                  style={{
                    opacity: isHovered === index ? "1" : "0.6",
                  }}
                />

                <div
                  className="absolute bottom-4 left-4 right-4 text-white transition-all duration-500 ease-in-out"
                  style={{
                    transform: `translateY(${
                      isHovered === index ? "-20px" : "0"
                    })`,
                    opacity: isHovered === index ? "1" : "0.9",
                  }}
                >
                  <h2
                    className="text-2xl font-bold mb-1 transition-all duration-500 ease-in-out"
                    style={{
                      transform: `translateY(${
                        isHovered === index ? "-5px" : "0"
                      })`,
                    }}
                  >
                    {item.name}
                  </h2>
                  <p
                    className="mb-2 transition-all duration-500 ease-in-out"
                    style={{ opacity: isHovered === index ? "1" : "0.8" }}
                  >
                    From 200 USD
                  </p>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default Tickets;
