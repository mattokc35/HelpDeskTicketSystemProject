import React, { useState, useRef, useEffect } from "react";
import {
  ModalBackdrop,
  ModalContent,
  TextAreaModal,
  InputField,
  Button,
} from "./styledComponents/StyledComponents";

interface EmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
}

const EmailModal: React.FC<EmailModalProps> = ({ isOpen, onClose, email }) => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [validationError, setValidationError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleSubjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubject(e.target.value);
    setValidationError("");
    setSubmitSuccess(false);
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    setValidationError("");
    setSubmitSuccess(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (subject.trim() === "") {
      setValidationError("Please enter a subject.");
      return;
    }

    if (message.trim() === "") {
      setValidationError("Please enter a message.");
      return;
    }

    console.log(`Would normally send email here with body: \n`);
    console.log("Email:", email);
    console.log("Subject:", subject);
    console.log("Message:", message);
    setSubmitSuccess(true);
    setSubject("");
    setMessage("");
  };

  return (
    <>
      {isOpen && (
        <ModalBackdrop>
          <ModalContent ref={modalRef}>
            <h2>Send Message</h2>
            <form onSubmit={handleSubmit}>
              <InputField
                type="text"
                placeholder="Email"
                value={email}
                disabled
              />
              <InputField
                type="text"
                placeholder="Subject"
                value={subject}
                onChange={handleSubjectChange}
              />
              <TextAreaModal
                placeholder="Message"
                value={message}
                onChange={handleMessageChange}
              />
              {validationError && (
                <p style={{ color: "red" }}>{validationError}</p>
              )}
              {submitSuccess && (
                <p style={{ color: "green" }}>
                  Contact Email Sent Successfully!
                </p>
              )}
              <Button type="submit">Send</Button>
            </form>
          </ModalContent>
        </ModalBackdrop>
      )}
    </>
  );
};

export default EmailModal;
