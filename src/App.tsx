import { useState, useEffect, useMemo } from "react";
import { Button } from "./components/styledComponents/StyledComponents";
import AdminPanel from "./pages/AdminPanel";
import HomePage from "./pages/Home";
import { fetchTickets } from "./network/NetworkRequests";
import { TicketInterface } from "./components/Ticket";

function App() {
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [tickets, setTickets] = useState<TicketInterface[]>([]);

  useEffect(() => {
    fetchTicketsData();
  }, []);

  const fetchTicketsData = async () => {
    try {
      const ticketData = await fetchTickets();
      setTickets(ticketData);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };

  const handleTicketCreated = async () => {
    try {
      const ticketData = await fetchTickets();
      setTickets(ticketData);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };

  const memoizedTickets = useMemo(() => tickets, [tickets]);

  const handleTogglePanel = () => {
    setShowAdminPanel((prevState) => !prevState);
  };

  return (
    <div>
      <Button onClick={handleTogglePanel}>
        {showAdminPanel ? "Show Home Page" : "Show Admin Panel"}
      </Button>
      {showAdminPanel ? (
        <AdminPanel tickets={memoizedTickets} />
      ) : (
        <HomePage onTicketCreated={handleTicketCreated} />
      )}
    </div>
  );
}

export default App;
