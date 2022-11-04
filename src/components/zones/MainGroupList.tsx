import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Heading,
  Text,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../app/hooks";
import { TreeZoneEl, Zone } from "../../app/types/types";
import { highlightFigmaZone } from "../../features/figma/utils";
import AccordionChevron from "../layout/AccordionChevron";
import AccordionCustomTitle from "../layout/AccordionCustomTitle";
import { ZoneListButton } from "./ZoneListButton";
import ZoneParams from "./ZoneParams";

import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { colorTheme } from "../../theme";
import { zoneToggleHidden } from "../../features/zones/newZonesSlice";

export default function MainGroupList() {
  const zonesSlices = useAppSelector((store) => store.zonesSlice);

  const zones = zonesSlices?.zones.filter((z) => z.createdFrom === "figma");
  const tree = zonesSlices.tree;

  return (
    <AccordionItem isDisabled={false} pb={2}>
      <AccordionButton _hover={{ backgroundColor: "brand.100" }} pl={2}>
        <AccordionChevron isExpanded={false} />
        <Box flex="1" textAlign="left">
          <AccordionCustomTitle label={"Main group"} icon="importedGroup" />
        </Box>
      </AccordionButton>

      {tree && unfoldTree(tree, zones)}
    </AccordionItem>
  );
}
const unfoldTree = (tree: TreeZoneEl[], zones: Zone[]) => {
  return tree.map((t) => {
    const parentZone = zones.find((z) => z.id === t.id);
    if (parentZone?.hidden) {
      return <HiddenZone key={`${parentZone.id}_hidden`} z={parentZone} />;
    }
    return (
      <AccordionZones
        key={t.id}
        zones={zones.filter((z) => z.elementId === t.id)}
      >
        {t?.children?.length !== 0 && unfoldTree(t.children!, zones)}
      </AccordionZones>
    );
  });
};

const HiddenZone = ({ z }: { z: Zone }) => {
  const dispatch = useDispatch();

  return (
    <Box
      css={{
        filter: "opacity(0.3)",
      }}
      onMouseEnter={() => highlightFigmaZone(z.elementId)}
      onMouseLeave={() => highlightFigmaZone(z.elementId, false)}
    >
      <ZoneListButton
        zone={z}
        isExpanded={false}
        hiddenMode={true}
        buttonDelete={
          <Button
            variant={"ghost"}
            onClick={() => dispatch(zoneToggleHidden(z.id))}
            title="Delete zone"
            _hover={{}}
            isDisabled={false}
          >
            <ViewIcon css={{ margin: "3px" }} fill="black" />
          </Button>
        }
      />
    </Box>
  );
};
const AccordionZones = ({
  zones,
  children = null,
}: {
  zones: Zone[];
  children?: any;
}) => {
  const dispatch = useDispatch();

  return (
    <AccordionPanel
      p={0}
      pl={4}
      pr={0}
      overflow="auto"
      css={{
        "&::-webkit-scrollbar": {
          display: "none",
        },
        scrollbarWidth: "none",
      }}
    >
      <Accordion allowToggle>
        {zones?.map((z) => {
          if (z.hidden) return <HiddenZone key={z.id + "_hidden"} z={z} />;
          return (
            <AccordionItem
              _hover={{ border: `1px solid ${colorTheme[100]}` }}
              border={`1px solid transparent`}
              key={z.id + "_hidden"}
            >
              {({ isExpanded }) => (
                <Box
                  onMouseEnter={() => highlightFigmaZone(z.elementId)}
                  onMouseLeave={() => highlightFigmaZone(z.elementId, false)}
                >
                  <ZoneListButton
                    zone={z}
                    buttonDelete={
                      <Button
                        variant={"ghost"}
                        onClick={() => dispatch(zoneToggleHidden(z.id))}
                        title="Hide zone and its children"
                        isDisabled={false}
                      >
                        <ViewOffIcon css={{ margin: "3px" }} fill="black" />
                      </Button>
                    }
                    isExpanded={isExpanded}
                    //setOpen={() => toggleAccordion(i)}
                  />
                  <AccordionPanel p={0} bg={"brand.50"}>
                    <Box p={2} pl={12}>
                      <Heading size={"xs"}>Type</Heading>
                      <Text fontSize={"xs"}>Specific settings on the page</Text>
                    </Box>
                    <ZoneParams zone={z} />
                  </AccordionPanel>
                  {children}
                </Box>
              )}
            </AccordionItem>
          );
        })}
      </Accordion>
    </AccordionPanel>
  );
};
