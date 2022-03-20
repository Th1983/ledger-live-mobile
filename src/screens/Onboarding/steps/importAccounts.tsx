import React, { useCallback } from "react";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";

import Illustration from "../../../images/illustration/Illustration";
import { NavigatorName, ScreenName } from "../../../const";
import { DeviceNames } from "../types";
import BaseStepperView, { SyncDesktop, Metadata } from "./setupDevice/scenes";
import { TrackScreen } from "../../../analytics";

const images = {
  light: {
    Intro: require("../../../images/illustration/Light/_074.png"),
  },
  dark: {
    Intro: require("../../../images/illustration/Dark/_074.png"),
  },
};

const scenes = [SyncDesktop, SyncDesktop];

function OnboardingStepPairNew() {
  const navigation = useNavigation();
  const route = useRoute<
    RouteProp<
      {
        params: {
          deviceModelId: DeviceNames;
        };
      },
      "params"
    >
  >();

  const { deviceModelId } = route.params;

  const metadata: Array<Metadata> = [
    {
      id: SyncDesktop.id,
      // @TODO: Replace this placeholder with the correct illustration asap
      illustration: (
        <Illustration
          size={150}
          darkSource={images.dark.Intro}
          lightSource={images.light.Intro}
        />
      ),
      drawer: null,
    },
  ];

  const onNext = useCallback(() => {
    // TODO: FIX @react-navigation/native using Typescript
    // @ts-ignore next-line
    navigation.navigate(NavigatorName.ImportAccounts, {
      screen: ScreenName.ScanAccounts,
      params: {
        onFinish: () => {
          // TODO: FIX @react-navigation/native using Typescript
          // @ts-ignore next-line
          navigation.navigate(ScreenName.OnboardingFinish, {
            ...route.params,
          });
        },
      },
    });
  }, [navigation, route.params]);

  const nextPage = useCallback(() => {
    // TODO: FIX @react-navigation/native using Typescript
    // @ts-ignore next-line
    navigation.navigate(ScreenName.OnboardingModalWarning, {
      screen: ScreenName.OnboardingModalSyncDesktopInformation,
      params: { onNext },
    });
  }, [navigation, onNext]);

  return (
    <>
      <TrackScreen category="Onboarding" name="PairNew" />
      <BaseStepperView
        onNext={nextPage}
        steps={scenes}
        metadata={metadata}
        deviceModelId={deviceModelId}
      />
    </>
  );
}

export default OnboardingStepPairNew;