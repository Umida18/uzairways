import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plane, Calendar, Clock, CheckCircle2 } from "lucide-react";
import api from "./api";

interface Ticket {
  ticketId: string;
  flightNumber: string;
  departureTime: string;
  arrivalTime: string;
  departureAirport: string;
  arrivalAirport: string;

  price: number;
  classType: string;
  bron: boolean;
  from: string;
  to: string;
}

export function Tickets() {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const res = await api.get(
          `/booking/get-tickets-flight-by-userId?userId=${userId}`
        );
        console.log("Res", res);

        setTickets(res.data);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTickets();
  }, []);

  const filterTickets = (tickets: Ticket[]) => {
    const now = new Date();

    const upcomingTickets = tickets.filter(
      (ticket) => new Date(ticket.departureTime) > now
    );

    const pastTickets = tickets.filter(
      (ticket) => new Date(ticket.departureTime) <= now
    );
    console.log("pastTickets", pastTickets);

    return {
      upcoming: upcomingTickets,
      past: pastTickets,
    };
  };

  const { upcoming, past } = filterTickets(tickets);

  const renderFlightTable = (
    flights: Ticket[],
    showStatus: boolean = false
  ) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Flight</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Time</TableHead>
          {showStatus && <TableHead>Status</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {flights.map((flight) => (
          <TableRow key={flight.ticketId}>
            <TableCell>
              <div className="flex items-center space-x-2">
                <Plane className="h-4 w-4 text-blue-500" />
                <span>
                  {flight.departureAirport} - {flight.arrivalAirport}
                </span>
              </div>
              <div className="text-sm text-gray-500">{flight.flightNumber}</div>
            </TableCell>
            <TableCell>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span>
                  {new Date(flight.departureTime).toLocaleDateString()}
                </span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-gray-400" />
                <span>
                  {new Date(flight.departureTime).toLocaleTimeString()}
                </span>
              </div>
            </TableCell>
            {showStatus && (
              <TableCell>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span className="text-green-600">Completed</span>
                </div>
              </TableCell>
            )}
          </TableRow>
        ))}
        {flights.length === 0 && (
          <TableRow>
            <TableCell
              colSpan={showStatus ? 4 : 3}
              className="text-center text-gray-500"
            >
              No flights found
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-center">Loading tickets...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">My Tickets</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upcoming">Upcoming Flights</TabsTrigger>
            <TabsTrigger value="past">Flight History</TabsTrigger>
          </TabsList>
          <TabsContent value="upcoming">
            {renderFlightTable(upcoming)}
          </TabsContent>
          <TabsContent value="past">
            {renderFlightTable(past, true)}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
