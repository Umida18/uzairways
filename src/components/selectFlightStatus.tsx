import React, { useState } from "react";
import { Select } from "antd";

const { Option } = Select;

interface StatusCellProps {
  initialStatus: string;
}

const StatusCell: React.FC<StatusCellProps> = ({ initialStatus }) => {
  const [status, setStatus] = useState(initialStatus);

  const handleChange = (value: string) => {
    setStatus(value);
  };

  const getColor = (s: string) => {
    switch (s) {
      case "ON_TIME":
        return "text-green-400";
      case "DELAYED":
        return "text-yellow-500";
      case "CANCELLED":
        return "text-red-500";
      default:
        return "";
    }
  };

  return (
    <Select
      value={status}
      onChange={handleChange}
      className={`font-bold ${getColor(status)}`}
    >
      <Option value="ON_TIME" className="text-green-400 font-bold">
        ON TIME
      </Option>
      <Option value="DELAYED" className="text-yellow-500 font-bold">
        DELAYED
      </Option>
      <Option value="CANCELLED" className="text-red-500 font-bold">
        CANCELLED
      </Option>
    </Select>
  );
};

export default StatusCell;
