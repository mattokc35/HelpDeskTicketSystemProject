import styled, { css } from "styled-components";

const mobileBreakpoint = "768px";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 75%;
  max-width: 400px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  @media (max-width: ${mobileBreakpoint}) {
    border: none;
    width: 100%;
  }
`;

export const Input = styled.input`
  margin-bottom: 10px;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 3px;
  width: 90%;

  @media (max-width: ${mobileBreakpoint}) {
    padding: 16px;
  }
`;

export const TextArea = styled.textarea`
  margin-bottom: 10px;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 3px;
  width: 90%;

  @media (max-width: ${mobileBreakpoint}) {
    padding: 16px;
  }
`;

export const Button = styled.button`
  margin-top: 10px;
  padding: 12px 18px;
  background-color: ${(props) => (props.disabled ? "#ccc" : "#007bff")};
  color: ${(props) => (props.disabled ? "#888" : "white")};
  border: none;
  border-radius: 3px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};

  @media (max-width: ${mobileBreakpoint}) {
    padding: 16px 24px;
  }
`;

export const AdminPanelContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

export const TicketContainer = styled.div`
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const TicketInfo = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const TicketTitle = styled.h3`
  margin-bottom: 5px;
`;

export const TicketDetails = styled.div`
  flex: 1;
`;

export const TicketStatus = styled.div`
  font-weight: bold;
`;

export const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.div`
  background-color: #444;
  padding: 20px;
  border-radius: 5px;
  width: 80%;
  max-width: 400px;
  text-align: center;
  box-shadow: 0px 10px 8px rgba(0, 0, 0, 0.7);
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
`;

export const InputField = styled.input`
  width: 100%;
  margin-bottom: 10px;
  padding: 3px;
  @media (max-width: ${mobileBreakpoint}) {
    padding: 20px;
    width: 80%;
  }
`;

export const TextAreaModal = styled.textarea`
  width: 100%;
  height: 100px;
  margin-bottom: 10px;
  padding: 3px;
  @media (max-width: ${mobileBreakpoint}) {
    padding: 20px;
    width: 80%;
  }
`;

export const PaginationContainer = styled.ul`
  display: flex;
  justify-content: center;
  list-style: none;
`;

export const PaginationItem = styled.li`
  margin: 0 5px;
`;

export const PaginationButton = styled.button<{ isActive: boolean }>`
  padding: 5px 10px;
  ${(props) =>
    props.isActive &&
    css`
      background-color: #007bff;
      color: white;
    `}
`;
