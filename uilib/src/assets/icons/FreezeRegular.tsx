import * as React from "react";
import Svg, { Path } from "react-native-svg";
type Props = {
  size?: number | string;
  color?: string;
};

function FreezeRegular({
  size = 16,
  color = "currentColor",
}: Props): JSX.Element {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M11.304 21.36h1.392l-.048-3.048 1.728 1.752.912-.912-2.592-2.592-.048-3.024 5.16 5.184.912-.912-5.184-5.16 3.024.048 2.592 2.592.912-.912-1.752-1.728 3.048.048v-1.392l-3.048.048 1.752-1.728-.912-.912-2.592 2.592-3.024.048 5.184-5.16-.912-.912-5.16 5.184.048-3.024 2.592-2.592-.912-.912-1.728 1.752.048-3.048h-1.392l.048 3.048-1.728-1.752-.912.912 2.592 2.592.048 3.024-5.16-5.184-.912.912 5.184 5.16-3.024-.048-2.592-2.592-.912.912 1.752 1.728-3.048-.048v1.392l3.048-.048-1.752 1.728.912.912 2.592-2.592 3.024-.048-5.184 5.16.912.912 5.16-5.184-.048 3.024-2.592 2.592.912.912 1.728-1.752-.048 3.048z"
        fill={color}
      />
    </Svg>
  );
}

export default FreezeRegular;
