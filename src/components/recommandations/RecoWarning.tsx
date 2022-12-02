import {
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Center,
  Flex,
  Link,
  Text,
} from "@chakra-ui/react";
import { ReactComponent as WarningIcon } from "../../assets/Warning.svg";
import AccordionChevron from "../layout/AccordionChevron";
import * as React from "react";
import { ZoneMissingParams } from "../../app/types/types";
import { useDispatch } from "react-redux";
import { zoneActivate } from "../../features/zones/zonesSlice";

interface RecoWarningProps {
  isHidden: boolean;
  isToggled: boolean;
  uncompleteZoneNames: Array<ZoneMissingParams>;
  toggleErrorPannel: () => void;
}
export default function RecoWarning({
  isHidden,
  isToggled,
  uncompleteZoneNames,
  toggleErrorPannel,
}: RecoWarningProps) {
  const dispatch = useDispatch();

  function toggleZone(zoneId: string): void {
    dispatch(zoneActivate(zoneId));
  }

  function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <AccordionItem hidden={isHidden}>
      <h2>
        <AccordionButton
          _hover={{ backgroundColor: "brand.100" }}
          pl={4}
          onClick={() => {
            toggleErrorPannel();
          }}
        >
          <Flex>
            <Center>
              <AccordionChevron isWarning={true} isExpanded={isToggled} color="#C53030" />
              <Box>
                <Text
                  pl={2}
                  mr={2}
                  align="left"
                  fontSize="xs"
                  color={"#C53030"}
                >
                  You have uncompleted zones that are not taken into account in
                  the calculation.
                </Text>
              </Box>
              <Box pt={1}>
                <WarningIcon />
              </Box>
            </Center>
          </Flex>
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4} height={"full"}>
        {Object.values(uncompleteZoneNames).map((zone) => (
          <Box p={4} key={zone.zoneId}>
            <Text fontSize="xs" color={"#C53030"}>
              <Link
                onClick={() => {
                  toggleZone(zone.zoneId);
                }}
                title="Open zone in parameters panel"
              >
                <Text as="u">
                  <Text as="b">{zone.zoneName}</Text>
                </Text>
              </Link>{" "}
              - {zone.zoneType}
              {zone.zoneType !== "undefined" && (
                <Text mt={1}>
                  Missing parameters:
                  <br />
                  {zone.zoneMissingParams.map((param, index) => (
                    <span key={param}>
                      {index === 0 ? `${capitalizeFirstLetter(param)}` : ``}
                      {index !== 0 &&
                      index !== zone.zoneMissingParams.length - 1
                        ? `, ${capitalizeFirstLetter(param)}`
                        : ``}
                      {zone.zoneMissingParams.length > 1 &&
                      index === zone.zoneMissingParams.length - 1
                        ? ` & ${capitalizeFirstLetter(param)}`
                        : ``}
                    </span>
                  ))}
                </Text>
              )}
            </Text>
          </Box>
        ))}
      </AccordionPanel>
    </AccordionItem>
  );
}
