import React, { useState } from "react";
import {
  TicketContainer,
  TicketInfo,
  TicketTitle,
  TicketDetails,
  Button,
} from "./styledComponents/StyledComponents";
import TicketStatusSelect from "./TicketStatusSelect";
import { updateTicketStatus } from "../network/NetworkRequests";

export enum TicketStatusEnum {
  NEW = "new",
  IN_PROGRESS = "in progress",
  RESOLVED = "resolved",
}

export interface TicketInterface {
  _id: string;
  name: string;
  email: string;
  description: string;
  status: TicketStatusEnum;
  submissionDate: Date;
  onContact: () => void;
}

const Ticket: React.FC<TicketInterface> = ({
  _id,
  name,
  email,
  description,
  status,
  submissionDate,
  onContact,
}) => {
  const [successMessage, setSuccessMessage] = useState<string>("");

  const handleSaveStatus = async (newStatus: TicketStatusEnum) => {
    try {
      await updateTicketStatus(_id, newStatus);
      setSuccessMessage("Ticket status updated successfully!");
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      console.error("Error updating ticket status:", error);
    }
  };

  return (
    <TicketContainer>
      <TicketInfo>
        <TicketDetails>
          <TicketTitle>{`Name: ${name}`}</TicketTitle>
          <p>{`Ticket ID: ${_id}`}</p>
          <p>{`Email: ${email}`}</p>
          <p>{`Description: ${description}`}</p>
          <p>{`Submission Date: ${new Date(
            submissionDate
          ).toLocaleString()}`}</p>
        </TicketDetails>
        <TicketStatusSelect
          initialStatus={status}
          onUpdateStatus={handleSaveStatus}
        />
      </TicketInfo>
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      <Button onClick={onContact}>Contact</Button>{" "}
    </TicketContainer>
  );
};

export default Ticket;
