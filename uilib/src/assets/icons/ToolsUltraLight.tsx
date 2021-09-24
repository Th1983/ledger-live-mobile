import * as React from "react";
import Svg, { Path } from "react-native-svg";
type Props = {
  size?: number | string;
  color?: string;
};

function ToolsUltraLight({
  size = 16,
  color = "currentColor",
}: Props): JSX.Element {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M4.56 21.504c.528 0 1.032-.192 1.464-.6l9.72-9.696a4.15 4.15 0 001.344.216c2.472 0 4.512-2.04 4.512-4.512 0-.984-.36-2.016-1.032-2.688l-2.952 2.952-.792-.792 2.952-2.952C19.104 2.76 18.072 2.4 17.088 2.4c-2.472 0-4.512 2.04-4.512 4.512 0 .48.072.936.216 1.344L3.12 17.952a2.07 2.07 0 001.44 3.552zM2.136 6.336l5.136 5.136.552-.552-.552-.552 1.536-1.56-.432-.432-1.56 1.56-1.584-1.584 1.56-1.56-.432-.456-1.56 1.56-1.56-1.56 3.096-3.12 4.536 4.536.096-.096a3.81 3.81 0 010-.912L6.336 2.136l-4.2 4.2zM3.312 19.44c0-.336.096-.648.384-.912L13.728 8.472a3.63 3.63 0 01-.336-1.56 3.698 3.698 0 013.696-3.696c.552 0 1.104.12 1.56.36l-2.76 2.784 1.752 1.752 2.784-2.76c.24.456.36 1.008.36 1.56a3.698 3.698 0 01-3.696 3.696 3.63 3.63 0 01-1.56-.336L5.448 20.328c-.264.264-.552.384-.888.384-.696 0-1.248-.576-1.248-1.272zm9.216-2.712l5.136 5.136 4.2-4.2-4.608-4.632a3.81 3.81 0 01-.912 0l-.096.096 4.512 4.536-3.096 3.096-1.56-1.56 1.56-1.536-.456-.456-1.56 1.56-1.584-1.584 1.56-1.56-.432-.432-1.56 1.536-.552-.552-.552.552z"
        fill={color}
      />
    </Svg>
  );
}

export default ToolsUltraLight;
