import {
  ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

interface Flight {
  arrivalTime: string;
  bron: boolean;
  classType: string;
  departureTime: string;
  flightNumber: string;
  price: number;
  ticketId: string;
}

interface FlightsContextProps {
  flights: Flight[];
  setFlights: React.Dispatch<React.SetStateAction<Flight[]>>;
}

const FlightsContext = createContext<FlightsContextProps | undefined>(
  undefined
);

export const FlightsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [flights, setFlights] = useState<Flight[]>(() => {
    const storedFlights = localStorage.getItem("flights");
    return storedFlights ? JSON.parse(storedFlights) : [];
  });

  useEffect(() => {
    localStorage.setItem("flights", JSON.stringify(flights));
  }, [flights]);

  return (
    <FlightsContext.Provider value={{ flights, setFlights }}>
      {children}
    </FlightsContext.Provider>
  );
};

export const useFlights = () => {
  const context = useContext(FlightsContext);
  if (!context) {
    throw new Error("useFlights must be used within a FlightsProvider");
  }
  return context;
};
