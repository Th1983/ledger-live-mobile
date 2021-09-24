import * as React from "react";
import Svg, { Path } from "react-native-svg";
type Props = {
  size?: number | string;
  color?: string;
};

function EightCircledThin({
  size = 16,
  color = "currentColor",
}: Props): JSX.Element {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 20.88c4.968 0 8.88-4.032 8.88-8.88 0-4.968-3.912-8.88-8.88-8.88-4.968 0-8.88 3.912-8.88 8.88 0 4.968 3.912 8.88 8.88 8.88zM3.6 12c0-4.704 3.696-8.4 8.4-8.4 4.704 0 8.4 3.696 8.4 8.4 0 4.584-3.696 8.4-8.4 8.4-4.704 0-8.4-3.696-8.4-8.4zm5.28 2.112c0 1.488 1.248 2.592 3.096 2.592h.048c1.848 0 3.096-1.104 3.096-2.592 0-1.032-.624-1.872-1.704-2.256v-.048c.936-.36 1.488-1.104 1.488-2.04 0-1.368-1.176-2.424-2.88-2.424h-.048c-1.704 0-2.88 1.056-2.88 2.424 0 .936.552 1.68 1.488 2.04v.048c-1.08.384-1.704 1.224-1.704 2.256zm.48.024v-.048c0-1.224.912-2.016 2.616-2.016h.048c1.704 0 2.616.792 2.616 2.016v.048c0 1.248-.96 2.088-2.616 2.088h-.048c-1.656 0-2.616-.84-2.616-2.088zm.216-4.344v-.048c0-1.152.888-1.92 2.4-1.92h.048c1.512 0 2.4.768 2.4 1.92v.048c0 1.128-.84 1.848-2.4 1.848h-.048c-1.56 0-2.4-.72-2.4-1.848z"
        fill={color}
      />
    </Svg>
  );
}

export default EightCircledThin;
