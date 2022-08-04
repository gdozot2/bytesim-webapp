import {
  Button,
  Flex,
  Heading,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import * as React from "react";
import { useDispatch } from "react-redux";
import {
  Zone,
  ZoneType,
} from "../../app/types/types";
import { StockVideoFormat, VideoFormEntries } from "../../app/types/videoTypes";
import { zoneUpdated } from "../../features/zones/zonesSlice";

interface ZoneParamsProps {
  zone: Zone;
}
export default function ZoneParams({ zone }: ZoneParamsProps) {
  const [value, setValue] = React.useState<ZoneType | undefined>(undefined);
  const [step, setStep] = React.useState<"TypeForm" | "ZoneForm">(
    zone.zoneType ? "ZoneForm" : "TypeForm"
  );
  const dispatch = useDispatch();

  React.useEffect(() => {
    setStep(zone.zoneType ? "ZoneForm" : "TypeForm");
  }, [zone.zoneType, setStep]);
  return (
    <Flex direction={"column"}>
      {step === "ZoneForm" && value ? (
        <>
          <ZoneParamsForm zone={zone} />
        </>
      ) : (
        <>
          <ZoneTypeForm value={value} setValue={setValue} />
          <Button
            onClick={() => {
              console.log(value);
              console.log(zone.zoneType);
              if (value !== zone.zoneType) { dispatch(zoneUpdated({ id: zone.id, zoneType: value, params: undefined })); }
            }}
            isDisabled={!value}
          >
            Next
          </Button>
        </>
      )}
    </Flex>
  );
}
interface ZoneTypeFormProps {
  value: ZoneType | undefined;
  setValue: React.Dispatch<React.SetStateAction<ZoneType | undefined>>;
}
function ZoneTypeForm({ value, setValue }: ZoneTypeFormProps) {
  return (
    <RadioGroup value={value}>
      <Stack>
        {(Object.keys(ZoneType) as Array<keyof typeof ZoneType>).map((z) => (
          <Radio
            colorScheme={"brand"}
            key={z}
            value={z}
            onChange={() => setValue(z as ZoneType)}
          >
            {ZoneType[z]}
          </Radio>
        ))}
      </Stack>
    </RadioGroup>
  );
}
interface ZoneParamsFormProps {
  zone: Zone;
}
function ZoneParamsForm({ zone }: ZoneParamsFormProps) {
  const notImplementedYet = <Flex>Oops! Sorry, {zone.zoneType} form not implemented yet.</Flex>;
  switch (zone.zoneType) {
    case 'Video':
      return (<VideoForm zone={zone} />);
    case 'Images':
      return (notImplementedYet);
    case 'Text':
      return (notImplementedYet);
    default:
      return (notImplementedYet);
  }
}

// TO DO after POC: make it abstract for all zone types
function VideoForm({ zone }: ZoneParamsFormProps) {
  const dispatch = useDispatch();
  return (
    <Flex direction={"column"}>
      <div>
        {Object.entries(VideoFormEntries).map(([key, value]) => {
          return (
            <div key={key}>
              <Heading size="sm">{key}</Heading>
              <RadioGroup
                value={ zone.params ? Number(zone.params[key as keyof StockVideoFormat]) : undefined }
              >
                <Stack>
                  {Object.values(value).filter(v => typeof v !== "number").map((data, index) => (
                    <Radio
                      colorScheme={"brand"}
                      key={index}
                      value={index}
                      onChange={() => {
                        const newPos = {
                          id: zone.id,
                          params: { ...zone.params, [key]: index }
                        };
                        dispatch(zoneUpdated(newPos));
                      }}
                    >
                      {data}
                    </Radio>
                  ))}
                </Stack>
              </RadioGroup>
            </div>
          );
        })}
      </div>
    </Flex>
  );
}