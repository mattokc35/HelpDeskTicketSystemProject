import { TicketInterface, TicketStatusEnum } from "../components/Ticket";

const backend_url = "backend-url-here";

export async function request<T>(
  path: string,
  method: string,
  body?: Record<string, any>
): Promise<T> {
  try {
    const url = `${backend_url}${path}`;
    const options: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
    };

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`Failed to ${method} ${path}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error ${method}ing ${path}:`, error);
    throw error;
  }
}

export async function fetchTickets(): Promise<TicketInterface[]> {
  try {
    const data = await request<TicketInterface[]>("tickets", "GET");
    return data.map((ticket) => ({
      ...ticket,
      submissionDate: new Date(ticket.submissionDate),
    }));
  } catch (error) {
    throw error;
  }
}

export async function createTicket(
  name: string,
  email: string,
  description: string
) {
  try {
    return await request<any>("tickets", "POST", {
      name,
      email,
      description,
      status: "new",
    });
  } catch (error) {
    throw error;
  }
}

export async function updateTicketStatus(
  ticketId: string,
  newStatus: TicketStatusEnum
) {
  try {
    return await request<any>(`tickets/${ticketId}/status`, "PUT", {
      status: newStatus,
    });
  } catch (error) {
    throw error;
  }
}
