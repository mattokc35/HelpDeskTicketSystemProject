import React, { useState, ChangeEvent, FormEvent } from "react";
import {
  Container,
  FormContainer,
  Input,
  TextArea,
  Button,
} from "./styledComponents/StyledComponents";
import { createTicket } from "../network/NetworkRequests";

interface HomePageProps {
  onTicketCreated: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onTicketCreated }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isFormValid = () => {
    return (
      name.trim() !== "" && email.trim() !== "" && description.trim() !== ""
    );
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isFormValid()) {
      return;
    }

    setIsSubmitting(true);

    createTicket(name, email, description)
      .then(() => {
        console.log("Ticket created successfully!");
        window.alert("Ticket created successfully!");
        setName("");
        setEmail("");
        setDescription("");
        onTicketCreated();
      })
      .catch((error) => {
        console.error("Failed to create ticket:", error);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  return (
    <Container>
      <FormContainer>
        <h2>Help Desk Support System</h2>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Name"
            value={name}
            onChange={handleNameChange}
          />
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
          />
          <TextArea
            placeholder="Description"
            value={description}
            onChange={handleDescriptionChange}
          />
          <p>
            Please fill out each field and then hit "submit" to raise a support
            ticket!
          </p>
          <Button type="submit" disabled={!isFormValid() || isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Ticket"}
          </Button>
        </form>
      </FormContainer>
    </Container>
  );
};

export default HomePage;
