import React, { useState } from "react";
import TicketForm from "./components/TicketForm";
import TicketList from "./components/TicketList";
import {
  Text,
  Box,
  Image,
  Flex,
  Heading,
  Grid,
  Card,
  CardBody,
} from "@chakra-ui/react";
import logo from "./images/myTicket.png";
import "./App.css";

function App() {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);

  // Fonction pour ajouter un ticket
  const handleAddTicket = (ticket) => {
    setTickets([...tickets, ticket]);
  };

  // Fonction pour mettre à jour un ticket
  const handleUpdateTicket = (updatedTicket) => {
    const updatedTickets = tickets.map((ticket) =>
      ticket === selectedTicket ? updatedTicket : ticket
    );
    setTickets(updatedTickets);
    setSelectedTicket(null);
  };

  // Fonction pour éditer un ticket
  const handleEditTicket = (ticket) => {
    setSelectedTicket(ticket);
  };

  // Fonction pour supprimer un ticket
  const handleDeleteTicket = (ticketToDelete) => {
    const updatedTickets = tickets.filter(
      (ticket) => ticket !== ticketToDelete
    );
    setTickets(updatedTickets);
  };

  // Fonction pour calculer le total par mois
  const calculateTotalByMonth = (month) => {
    return tickets.reduce((total, ticket) => {
      const ticketMonth = new Date(ticket.date).getMonth();
      if (ticketMonth === month) {
        return total + parseFloat(ticket.montant);
      }
      return total;
    }, 0);
  };

  // Fonction pour calculer le total général
  const calculateTotalGeneral = () => {
    return tickets.reduce((total, ticket) => {
      return total + parseFloat(ticket.montant);
    }, 0);
  };

  const months = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];

  return (
    <>
      <Flex
        backgroundColor="#E5D3C6"
        padding={4}
        width="100%"
        align="center"
        justify="center"
      >
        <Box>
          <Image src={logo} className="logo-nav" alt="logo" />
        </Box>
      </Flex>
      <Box
        backgroundColor="#fff"
        padding={4}
        width="100%"
        align="center"
        justify="center"
        mb={30}
      >
        <Text className="title" mb={5}>
          Créer un ticket de caisse
        </Text>
        <TicketForm
          onAddTicket={handleAddTicket}
          onUpdateTicket={handleUpdateTicket}
          selectedTicket={selectedTicket}
        />
      </Box>
      <TicketList
        tickets={tickets}
        onEdit={handleEditTicket}
        onDelete={handleDeleteTicket}
      />

      <Box>
        <Box padding={8} width="100%" align="center" justify="center">
          <Heading
            as="h2"
            size="md"
            mb={4}
            fontFamily={"Madimi one"}
            fontSize="24px"
            fontWeight={"medium"}
          >
            Mon total de dépense par mois{" "}
          </Heading>
          <Text>Total général : {calculateTotalGeneral()} €</Text>
        </Box>
        <Grid
          templateColumns={{
            sm: "repeat(1, 1fr)",
            md: "repeat(2, 1fr)",
            lg: "repeat(4, 1fr)",
          }}
          gap={4}
          pr={12}
          pl={12}
          pb={12}
        >
          {months.map((month, index) => (
            <Card key={index} maxW="sm">
              <CardBody>
                <Text width="100%" align="center" justify="center">{month}</Text>

                <Text width="100%" align="center" justify="center" fontSize={"2xl"}>{calculateTotalByMonth(index)} €</Text>
              </CardBody>
            </Card>
          ))}
        </Grid>
      </Box>
    </>
  );
}

export default App;
