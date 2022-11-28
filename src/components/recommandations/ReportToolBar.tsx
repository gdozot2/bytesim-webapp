import { ChevronDownIcon, ChevronRightIcon } from "@chakra-ui/icons";
import {
  Flex,
  Heading,
  Tooltip,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Box,
} from "@chakra-ui/react";
import { useState } from "react";
import { FilterType } from "./RecoReport";

type ReportToolBarProps = {
  onChangeFilter: (filter: FilterType) => void;
  currentFilter: FilterType;
};

export default function ReportToolbar({
  onChangeFilter,
  currentFilter,
}: ReportToolBarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <Flex align={"center"} p={2} justifyContent="space-between">
      <Tooltip
        label="Recommandations are based on what data you provided for your drawn zones."
        hasArrow
      >
        <Heading mr={1} size="sm">
          Recommandations
        </Heading>
      </Tooltip>
      <Menu
        onOpen={() => setIsMenuOpen(true)}
        onClose={() => setIsMenuOpen(false)}
      >
        <MenuButton as={Box}>
          <Flex alignItems="center" justifyContent="flex-end" minW={220}>
            {isMenuOpen ? <ChevronDownIcon /> : <ChevronRightIcon />}
            <Text fontSize="sm">{`Sort by : ${currentFilter}`}</Text>
          </Flex>
        </MenuButton>
        <MenuList>
          {(Object.keys(FilterType) as Array<keyof typeof FilterType>).map(
            (key) => (
              <MenuItem
                key={key}
                onClick={() => onChangeFilter(FilterType[key])}
              >
                {FilterType[key]}
              </MenuItem>
            )
          )}
        </MenuList>
      </Menu>
    </Flex>
  );
}
