import { useState } from "react";
import {
  ModalBackdrop,
  ModalContent,
  TextAreaModal,
  InputField,
  CloseButton,
} from "./styledComponents/StyledComponents";
interface SendMessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
}

const SendMessageModal: React.FC<SendMessageModalProps> = ({
  isOpen,
  onClose,
  email,
}) => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubject(e.target.value);
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(`Would normally send email here with body: \n`);
    console.log("Email:", email);
    console.log("Subject:", subject);
    console.log("Message:", message);
    window.alert("Contact Email Sent Successfully!");
    setSubject("");
    setMessage("");
    onClose();
  };

  return (
    <>
      {isOpen && (
        <ModalBackdrop>
          <ModalContent>
            <CloseButton onClick={onClose}>Close</CloseButton>
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
              <button type="submit">Send</button>
            </form>
          </ModalContent>
        </ModalBackdrop>
      )}
    </>
  );
};

export default SendMessageModal;
