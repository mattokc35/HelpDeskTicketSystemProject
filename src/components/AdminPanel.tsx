import React, { useState } from "react";
import { AdminPanelContainer } from "./styledComponents/StyledComponents";
import Ticket from "./Ticket";
import { TicketInterface } from "./Ticket";
import EmailModal from "./EmailModal";

interface AdminPanelProps {
  tickets: TicketInterface[];
}

const AdminPanel: React.FC<AdminPanelProps> = ({ tickets }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<TicketInterface | null>(
    null
  );

  const openModal = (ticket: TicketInterface) => {
    setSelectedTicket(ticket);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedTicket(null);
    setIsModalOpen(false);
  };

  return (
    <React.Fragment>
      <AdminPanelContainer>
        <h2>Admin Panel</h2>
        {tickets.length === 0 ? (
          <p>Loading...</p>
        ) : (
          tickets.map((ticket) => (
            <div key={ticket._id}>
              <Ticket {...ticket} onContact={() => openModal(ticket)} />
            </div>
          ))
        )}
      </AdminPanelContainer>
      <EmailModal
        isOpen={isModalOpen}
        onClose={closeModal}
        email={selectedTicket?.email || ""}
      />
    </React.Fragment>
  );
};

export default AdminPanel;
