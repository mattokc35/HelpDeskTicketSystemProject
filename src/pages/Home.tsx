import React, { useState, ChangeEvent, FormEvent } from "react";
import {
  Container,
  FormContainer,
  Input,
  TextArea,
  Button,
} from "../components/styledComponents/StyledComponents";
import { createTicket } from "../network/NetworkRequests";

interface HomePageProps {
  onTicketCreated: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onTicketCreated }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      name.trim() === "" ||
      email.trim() === "" ||
      description.trim() === ""
    ) {
      setValidationError("Please fill out all fields.");
      return;
    }

    setIsSubmitting(true);

    createTicket(name, email, description)
      .then(() => {
        console.log("Ticket created successfully!");
        setValidationError("");
        setName("");
        setEmail("");
        setDescription("");
        setSubmitSuccess(true);
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
    setSubmitSuccess(false);
    setValidationError("");
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setSubmitSuccess(false);
    setValidationError("");
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
    setSubmitSuccess(false);
    setValidationError("");
  };

  return (
    <Container>
      <FormContainer>
        <h3>Help Desk Support System</h3>
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
          {validationError && <p style={{ color: "red" }}>{validationError}</p>}
          {submitSuccess && (
            <p style={{ color: "green" }}>Ticket submitted successfully!</p>
          )}{" "}
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Ticket"}
          </Button>
        </form>
      </FormContainer>
    </Container>
  );
};

export default HomePage;
