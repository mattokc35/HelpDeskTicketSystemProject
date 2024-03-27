import React, { useState } from "react";
import {
  AdminPanelContainer,
  PaginationButton,
  PaginationContainer,
  PaginationItem,
} from "../components/styledComponents/StyledComponents";
import Ticket from "../components/Ticket";
import { TicketInterface } from "../components/Ticket";
import EmailModal from "../components/EmailModal";

interface AdminPanelProps {
  tickets: TicketInterface[];
}

const AdminPanel: React.FC<AdminPanelProps> = ({ tickets }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<TicketInterface | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [ticketsPerPage] = useState(5);

  const openModal = (ticket: TicketInterface) => {
    setSelectedTicket(ticket);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedTicket(null);
    setIsModalOpen(false);
  };

  // show tickets from newest to oldest
  const reversedTickets = [...tickets].reverse();

  // pagination
  const indexOfLastTicket = currentPage * ticketsPerPage;
  const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
  const currentTickets = reversedTickets.slice(
    indexOfFirstTicket,
    indexOfLastTicket
  );

  // change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <React.Fragment>
      <AdminPanelContainer>
        <h2>Admin Panel</h2>
        {currentTickets.length === 0 ? (
          <p>No tickets to display</p>
        ) : (
          currentTickets.map((ticket) => (
            <div key={ticket._id}>
              <Ticket {...ticket} onContact={() => openModal(ticket)} />
            </div>
          ))
        )}
      </AdminPanelContainer>
      {reversedTickets.length > ticketsPerPage && (
        <PaginationContainer>
          {Array.from({
            length: Math.ceil(reversedTickets.length / ticketsPerPage),
          }).map((_, index) => (
            <PaginationItem
              key={index}
              className={currentPage === index + 1 ? "active" : ""}
            >
              <PaginationButton
                onClick={() => paginate(index + 1)}
                isActive={currentPage === index + 1}
              >
                {index + 1}
              </PaginationButton>
            </PaginationItem>
          ))}
        </PaginationContainer>
      )}
      <EmailModal
        isOpen={isModalOpen}
        onClose={closeModal}
        email={selectedTicket?.email || ""}
      />
    </React.Fragment>
  );
};

export default AdminPanel;
