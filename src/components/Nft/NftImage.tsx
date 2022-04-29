import React, { useState } from "react";
import { Animated, StyleSheet, View } from "react-native";
import FastImage, {
  FastImageProps,
  OnLoadEvent,
  ResizeMode,
} from "react-native-fast-image";
import { withTheme } from "../../colors";
import ImageNotFoundIcon from "../../icons/ImageNotFound";
import Skeleton from "../Skeleton";

const ImageComponent = ({
  ...props
}: {
  style: Object;
} & FastImageProps) =>
  typeof props?.source === "object" && props?.source?.uri ? (
    <FastImage {...props} />
  ) : (
    <></>
  );

const NotFound = ({
  colors,
  onLayout,
}: {
  colors: { [key: string]: string };
  onLayout: () => void;
}) => {
  const [iconWidth, setIconWidth] = useState(40);

  return (
    <View
      style={[
        styles.notFoundView,
        {
          backgroundColor: colors.skeletonBg,
        },
      ]}
      onLayout={e => {
        setIconWidth(Math.min(e.nativeEvent.layout.width * 0.4, 40));
        onLayout?.();
      }}
    >
      <ImageNotFoundIcon width={iconWidth} height={iconWidth} />
    </View>
  );
};

type Props = {
  style?: Object;
  status: string;
  src: string;
  resizeMode?: ResizeMode;
  colors: any;
};

type State = {
  loadError: boolean;
};

class NftImage extends React.PureComponent<Props, State> {
  state = {
    beforeLoadDone: false,
    loadError: false,
    contentType: null,
  };

  opacityAnim = new Animated.Value(0);

  startAnimation = () => {
    Animated.timing(this.opacityAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  onLoad = ({ nativeEvent }: OnLoadEvent) => {
    if (!nativeEvent) {
      this.setState({ loadError: true });
    }
  };

  onError = () => {
    this.setState({ loadError: true });
  };

  render() {
    const { style, status, src, colors, resizeMode = "cover" } = this.props;
    const { loadError } = this.state;

    const noData = status === "nodata";
    const metadataError = status === "error";
    const noSource = status === "loaded" && !src;

    return (
      <View style={[style, styles.root]}>
        <Skeleton style={styles.skeleton} loading={true} />
        <Animated.View
          style={[
            styles.imageContainer,
            {
              opacity: this.opacityAnim,
            },
          ]}
        >
          {noData || metadataError || noSource || loadError ? (
            <NotFound colors={colors} onLayout={this.startAnimation} />
          ) : (
            <ImageComponent
              style={[
                styles.image,
                {
                  backgroundColor: colors.white,
                },
              ]}
              resizeMode={resizeMode}
              source={{
                uri: src,
              }}
              onLoad={this.onLoad}
              onLoadEnd={this.startAnimation}
              onError={this.onError}
            />
          )}
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    position: "relative",
  },
  skeleton: {
    position: "absolute",
    zIndex: -1,
    height: "100%",
    width: "100%",
  },
  imageContainer: {
    zIndex: 1,
    flex: 1,
  },
  image: {
    flex: 1,
  },
  notFoundView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default withTheme(NftImage);
