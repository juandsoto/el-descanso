import Box from "@mui/material/Box";
import MUISpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction, {
  SpeedDialActionProps,
} from "@mui/material/SpeedDialAction";

interface Action extends SpeedDialActionProps {
  key: string;
  onClick: () => void;
}

interface SpeedDialProps {
  actions: Action[];
}

function SpeedDial(props: SpeedDialProps) {
  return (
    <Box sx={{ transform: "translateZ(0px)" }}>
      <Box sx={{ position: "relative" }}>
        <MUISpeedDial
          ariaLabel="SpeedDial playground example"
          icon={<SpeedDialIcon />}
          direction="left"
        >
          {props.actions.map(action => (
            <SpeedDialAction {...action} tooltipTitle={action.key} />
          ))}
        </MUISpeedDial>
      </Box>
    </Box>
  );
}

export default SpeedDial;
