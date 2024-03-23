import {
  TicketContainer,
  TicketInfo,
  TicketTitle,
  TicketDetails,
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
  onContact: () => void;
}

const Ticket: React.FC<TicketInterface> = ({
  _id,
  name,
  email,
  description,
  status,
  onContact,
}) => {
  const handleSaveStatus = async (newStatus: TicketStatusEnum) => {
    try {
      await updateTicketStatus(_id, newStatus);
      console.log("Ticket status updated successfully!");
      window.alert("Ticket status updated successfully!");
    } catch (error) {
      console.error("Error updating ticket status:", error);
    }
  };

  return (
    <TicketContainer>
      <TicketInfo>
        <TicketDetails>
          <TicketTitle>{name}</TicketTitle>
          <p>{email}</p>
          <p>{description}</p>
        </TicketDetails>
        <TicketStatusSelect
          initialStatus={status}
          onUpdateStatus={handleSaveStatus}
        />
      </TicketInfo>
      <button onClick={onContact}>Contact</button>{" "}
    </TicketContainer>
  );
};

export default Ticket;
