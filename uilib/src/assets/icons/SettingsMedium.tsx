import * as React from "react";
import Svg, { Path } from "react-native-svg";
type Props = {
  size?: number | string;
  color?: string;
};

function SettingsMedium({
  size = 16,
  color = "currentColor",
}: Props): JSX.Element {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M14.712 22.2l.264-3.144a8.27 8.27 0 001.752-.984l2.88 1.344 2.616-4.56-2.544-1.728a8.898 8.898 0 000-2.256l2.544-1.728-2.616-4.536-2.832 1.32a7.287 7.287 0 00-1.8-.984L14.712 1.8H9.288l-.264 3.144a7.999 7.999 0 00-1.776.984l-2.832-1.32-2.64 4.512 2.592 1.776c-.048.36-.072.72-.072 1.104 0 .384.024.744.072 1.104L1.776 14.88l2.64 4.512 2.832-1.32c.552.408 1.128.72 1.776.984l.264 3.144h5.424zm-10.44-6.792l2.256-1.56c-.24-.648-.312-1.152-.312-1.848 0-.696.072-1.2.312-1.848l-2.256-1.56.936-1.608 2.4 1.128c.936-.984 1.896-1.56 3.24-1.824l.216-2.688h1.872l.216 2.688c1.392.288 2.328.816 3.264 1.8l2.376-1.104.936 1.632-2.184 1.488c.216.72.288 1.224.288 1.896 0 .672-.072 1.176-.288 1.896l2.184 1.488-.936 1.632-2.4-1.128c-.912.96-1.872 1.512-3.24 1.848l-.216 2.664h-1.872l-.216-2.688c-1.344-.264-2.304-.84-3.24-1.824l-2.4 1.128-.936-1.608zM8.4 12c0 1.992 1.608 3.6 3.6 3.6s3.6-1.608 3.6-3.6-1.608-3.6-3.6-3.6A3.595 3.595 0 008.4 12zm1.68 0c0-1.056.864-1.92 1.92-1.92s1.92.864 1.92 1.92-.864 1.92-1.92 1.92A1.926 1.926 0 0110.08 12z"
        fill={color}
      />
    </Svg>
  );
}

export default SettingsMedium;
