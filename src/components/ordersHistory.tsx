import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const orders = [
  { id: 1, date: "2023-06-01", description: "Concert Ticket", amount: 50 },
  { id: 2, date: "2023-06-15", description: "Movie Ticket", amount: 15 },
  { id: 3, date: "2023-07-01", description: "Sports Event", amount: 75 },
];

export function OrdersHistory() {
  return (
    <Card className="border-sky-100">
      <CardHeader className="border-b border-sky-100">
        <CardTitle className="text-sky-900">Orders History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-sky-50">
              <TableHead className="text-sky-900">Date</TableHead>
              <TableHead className="text-sky-900">Description</TableHead>
              <TableHead className="text-sky-900">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id} className="hover:bg-sky-50">
                <TableCell>{order.date}</TableCell>
                <TableCell>{order.description}</TableCell>
                <TableCell>${order.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
