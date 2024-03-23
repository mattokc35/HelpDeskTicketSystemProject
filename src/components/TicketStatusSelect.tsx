import React, { useState } from "react";
import { TicketStatusEnum } from "./Ticket";

interface TicketStatusSelectProps {
  initialStatus: TicketStatusEnum;
  onUpdateStatus: (newStatus: TicketStatusEnum) => void;
}

const TicketStatusSelect: React.FC<TicketStatusSelectProps> = ({
  initialStatus,
  onUpdateStatus,
}) => {
  const [selectedStatus, setSelectedStatus] =
    useState<TicketStatusEnum>(initialStatus);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(e.target.value as TicketStatusEnum);
  };

  const handleSave = () => {
    onUpdateStatus(selectedStatus);
  };

  return (
    <div>
      <select value={selectedStatus} onChange={handleChange}>
        <option value={TicketStatusEnum.NEW}>New</option>
        <option value={TicketStatusEnum.IN_PROGRESS}>In Progress</option>
        <option value={TicketStatusEnum.RESOLVED}>Resolved</option>
      </select>
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default TicketStatusSelect;
