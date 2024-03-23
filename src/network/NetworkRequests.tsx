import { TicketInterface, TicketStatusEnum } from "../components/Ticket";

export async function fetchTickets(): Promise<TicketInterface[]> {
  try {
    const response = await fetch("your-backend-url-here/tickets");
    if (!response.ok) {
      throw new Error("Failed to fetch tickets");
    }
    const data = await response.json();
    return data.map((ticket: any) => ({
      _id: ticket._id,
      name: ticket.name,
      email: ticket.email,
      description: ticket.description,
      status: ticket.status as TicketStatusEnum,
    }));
  } catch (error) {
    console.error("Error fetching tickets:", error);
    throw error;
  }
}

export async function createTicket(
  name: string,
  email: string,
  description: string
) {
  try {
    const response = await fetch("your-backend-url-here/tickets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        description,
        status: "new",
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to create ticket");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating ticket:", error);
    throw error;
  }
}

export async function updateTicketStatus(
  ticketId: string,
  newStatus: TicketStatusEnum
) {
  try {
    const response = await fetch(
      `your-backend-url-here/tickets/${ticketId}/status`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: newStatus,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update ticket status");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating ticket status:", error);
    throw error;
  }
}
