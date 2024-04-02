import React, { useState, useEffect } from "react";
import {
  Input,
  Button,
  Stack,
  Flex,
  useBreakpointValue,
  NumberInput,
  NumberInputField,
  NumberIncrementStepper,
  NumberDecrementStepper,
  NumberInputStepper,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";

const stackProps = {
  spacing: 4,
};

const formFlexProps = {
  direction: "row",
  justify: "space-between",
  align: "center",
};

function TicketForm({
  onAddTicket,
  onUpdateTicket,
  selectedTicket,
  existingDates = [],
}) {
  const [date, setDate] = useState("");
  const [intitule, setIntitule] = useState("");
  const [montant, setMontant] = useState("");
  const [error, setError] = useState("");
  const [existingDatesState, setExistingDatesState] = useState(existingDates);

  const isFlex = useBreakpointValue({ base: false, md: true });

  useEffect(() => {
    if (selectedTicket) {
      setDate(selectedTicket.date);
      setIntitule(selectedTicket.intitule);
      setMontant(selectedTicket.montant);
    }
  }, [selectedTicket]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedTicket) {
      // Vérifier si la date modifiée existe déjà parmi les autres tickets
      const dateExists = existingDatesState.some(
        (d) => d === date && d !== selectedTicket.date
      );
      if (dateExists) {
        setError("Un ticket avec cette date existe déjà.");
        return;
      }
      onUpdateTicket({ ...selectedTicket, date, intitule, montant });
    } else {
      if (existingDatesState.includes(date)) {
        setError("Un ticket avec cette date existe déjà.");
        return;
      }
      onAddTicket({ date, intitule, montant });
      // Mettre à jour la liste des dates existantes après l'ajout d'un nouveau ticket
      setExistingDatesState([...existingDatesState, date]);
    }
    setDate("");
    setIntitule("");
    setMontant("");
    setError("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl
        pr={isFlex ? 10 : 0}
        pl={isFlex ? 10 : 0}
        isInvalid={!!error}
      >
        {isFlex ? (
          <Flex {...formFlexProps}>
            <FormControl isRequired flex="1" marginRight={2}>
              <FormLabel>Date</FormLabel>
              <Input
                type="date"
                className="input"
                placeholder="Date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                flex="1"
                marginRight={2}
              />
            </FormControl>
            <FormControl isRequired flex="1" marginRight={2}>
              <FormLabel>Intitulé</FormLabel>
              <Input
                type="text"
                className="input"
                value={intitule}
                onChange={(e) => setIntitule(e.target.value)}
              />
            </FormControl>
            <FormControl isRequired flex="1" marginRight={2}>
              <FormLabel>Montant</FormLabel>
              <NumberInput
                value={montant}
                onChange={(valueString) => setMontant(valueString)}
              >
                <NumberInputField className="input" />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
            <Button type="submit" mt={8}>
              {selectedTicket ? "Modifier" : "Ajouter"}
            </Button>
          </Flex>
        ) : (
          <Stack {...stackProps}>
            <Input
              type="date"
              className="input"
              placeholder="Date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <Input
              type="text"
              className="input"
              placeholder="Intitulé"
              value={intitule}
              onChange={(e) => setIntitule(e.target.value)}
            />
            <Input
              type="number"
              className="input"
              placeholder="Montant"
              value={montant}
              onChange={(e) => setMontant(e.target.value)}
            />
            <Button type="submit">
              {selectedTicket ? "Modifier" : "Ajouter"}
            </Button>
          </Stack>
        )}
        <FormErrorMessage>{error}</FormErrorMessage>
      </FormControl>
    </form>
  );
}

export default TicketForm;
