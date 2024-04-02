import React from "react";
import {
  Box,
  Heading,
  Text,
  Button,
  Grid,
  Divider,
  Card,
  CardBody,
  CardFooter,
  ButtonGroup,
  Image,
} from "@chakra-ui/react";

function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Les mois commencent à 0, donc +1
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

function TicketList({ tickets, onEdit, onDelete }) {
  return (
    <Box
      backgroundColor="#E5D3C6"
      padding={8}
      width="100%"
      align="center"
      justify="center"
    >
      <Heading as="h2" size="md" mb={4} fontFamily={"Madimi one"} fontSize="24px" fontWeight={"medium"}>
        Mes tickets
      </Heading>
      {tickets.length === 0 ? (
        <Text>Vous n'avez pas de ticket de caisse.</Text>
      ) : (
        <Grid
          templateColumns={{
            sm: "repeat(1, 1fr)",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          }}
          gap={4}
        >
          {tickets.map((ticket, index) => (
            <Card key={index} maxW="sm">
              <CardBody>
                <Image
                  src="https://i.imgur.com/9DnnAps.jpg"
                  alt="ticket de caisse avec rouleaux"
                  borderRadius="lg"
                  mb={5}
                />

                <Heading size="md">{ticket.intitule}</Heading>
                <Text>Ticket du  {formatDate(ticket.date)}</Text>
                <Text color="blue.600" fontSize="2xl">
                  {ticket.montant} €
                </Text>
              </CardBody>
              <Box width="80%" mx="auto" backgroundColor="#cecece">
                {" "}
                <Divider />
              </Box>
              <CardFooter justifyContent="center">
                <ButtonGroup spacing="2">
                  <Button
                    colorScheme="blue"
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit(ticket)}
                  >
                    Modifier
                  </Button>
                  <Button
                    colorScheme="red"
                    variant="outline"
                    size="sm"
                    onClick={() => onDelete(ticket)}
                  >
                    Supprimer
                  </Button>
                </ButtonGroup>
              </CardFooter>
            </Card>
          ))}
        </Grid>
      )}
    </Box>
  );
}

export default TicketList;
