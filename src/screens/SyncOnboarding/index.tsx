import React, { useEffect, useState, useCallback } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { Flex, Text } from "@ledgerhq/native-ui";
import {
  OnboardingState,
  extractOnboardingState,
} from "@ledgerhq/live-common/lib/hw/extractOnboardingState";
import { Device } from "@ledgerhq/live-common/lib/hw/actions/types";
import { from, of, Subscription, throwError, timer } from "rxjs";
import {
  mergeMap,
  concatMap,
  delayWhen,
  map,
  tap,
  retryWhen,
} from "rxjs/operators";
import getVersion from "@ledgerhq/live-common/lib/hw/getVersion";
import { withDevice } from "@ledgerhq/live-common/lib/hw/deviceAccess";
import { TransportStatusError } from "@ledgerhq/errors";
import { FirmwareInfo } from "@ledgerhq/live-common/lib/types/manager";
import { ScreenName } from "../../const";

// FIXME: Define an initial onboarding state - or cannot have an initial state in our use case ?
const initialOnboardingState: OnboardingState = {
  isOnboarded: false,
  isInRecoveryMode: false,
  isRecoveringSeed: false,
  isConfirmingSeedWords: false,
  seedPhraseType: "24-words",
  currentSeedWordIndex: 0,
};

export const SyncOnboarding = ({
  navigation,
}: StackScreenProps<{}>): JSX.Element => {
  const [device, setDevice] = useState<Device | null>(null);
  const [onboardingState, setOnboardingState] = useState<OnboardingState>(
    initialOnboardingState,
  );
  const [stepIndex, setStepIndex] = useState<number>(0);

  const onboardingSteps = [
    "Pairing device",
    "Setting up pin",
    `Writing seed words ${
      !onboardingState.isConfirmingSeedWords
        ? onboardingState.currentSeedWordIndex + 1
        : ""
    }`,
    `Confirming seed words ${
      onboardingState.isConfirmingSeedWords
        ? onboardingState.currentSeedWordIndex + 1
        : ""
    }`,
  ];

  const handleOnPaired = useCallback((pairedDevice: Device) => {
    console.log(
      `SyncOnboarding: handleOnPaired ${JSON.stringify(pairedDevice)}`,
    );

    setDevice(pairedDevice);
  }, []);

  // Polls device state to update the onboarding state
  useEffect(() => {
    let onboardingStatePollingSubscription: Subscription;

    if (device) {
      console.log(
        `SyncOnboarding: 🧑‍💻 new device: ${JSON.stringify(device)}`,
      );

      onboardingStatePollingSubscription = timer(0, 1000)
        .pipe(
          tap(i => {
            console.log(`SyncOnboarding: ▶️ Polling ${i}`);
          }),
          concatMap(() =>
            withDevice(device.deviceId)(t => from(getVersion(t))),
          ),
          retryWhen(errors =>
            errors.pipe(
              mergeMap(error => {
                if (
                  error &&
                  error instanceof TransportStatusError &&
                  // @ts-expect-error TransportStatusError is not a class
                  error.statusCode === 0x6d06
                ) {
                  console.log(
                    `SyncOnboarding: 0x6d06 error 🔨 ${JSON.stringify(error)}`,
                  );
                  return of(error);
                }
                console.log(
                  `SyncOnboarding: 💥 Error ${error} -> ${JSON.stringify(
                    error,
                  )}`,
                );
                return throwError(error);
              }),
              tap(() => console.log("Going to retry in 🕐️ ...")),
              delayWhen(() => timer(2000)),
              tap(() => console.log("Retrying 🏃️ !")),
            ),
          ),
          map((deviceVersion: FirmwareInfo) =>
            extractOnboardingState(deviceVersion.flags),
          ),
        )
        .subscribe({
          next: (onboardingState: OnboardingState | null) => {
            console.log(
              `SyncOnboarding: device version info ${JSON.stringify(
                onboardingState,
              )}`,
            );
            // FIXME: if null -> initialState ? What should be the initialOnboardingState ?
            // Does not update the state if it could not be extracted from the flags
            if (onboardingState) {
              setOnboardingState(onboardingState);
            }
          },
          error: error =>
            // TODO: handle error {"name":"DisconnectedDevice","message":"DisconnectedDevice"}
            console.log(
              `SyncOnboarding: error ending polling ${error} -> ${JSON.stringify(
                { error },
              )}`,
            ),
        });
    }

    return () => {
      console.log("SyncOnboarding: cleaning up polling 🧹");
      onboardingStatePollingSubscription?.unsubscribe();
    };
  }, [device]);

  // Updates UI step index from the onboarding state
  useEffect(() => {
    if (!device) {
      // No device is paired yet
      setStepIndex(0);
    } else if (onboardingState.isConfirmingSeedWords) {
      setStepIndex(3);
    }
    // TODO: cheating - add PIN step once fw has been updated
    else if (
      onboardingState.currentSeedWordIndex === 0 &&
      !onboardingState.isConfirmingSeedWords
    ) {
      setStepIndex(1);
    } else {
      setStepIndex(2);
    }
  }, [onboardingState, device]);

  // When reaching the synchronized onboarding, the device could already
  // be BLE paired to the phone and at the same time not known by LLM,
  // it does not matter.
  // So as long as the device is not onboarded, the LLM will ask for a pairing.
  useEffect(() => {
    console.log("SyncOnboarding: navigate to pairDevices");

    // TODO: fix onDone only scalar value no function for navigate to work
    // @ts-expect-error navigation issue
    navigation.navigate(ScreenName.PairDevices, {
      onDone: handleOnPaired,
      onlySelectDeviceWithoutCompletePairing: true,
    });
  }, [handleOnPaired, navigation]);

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      height="100%"
    >
      {onboardingSteps.map((label, i) => (
        <Text key={i} variant="h2" textAlign="left" color="constant.white">
          {label} {stepIndex === i ? "✏️" : stepIndex > i ? "✅" : "🦧"}
        </Text>
      ))}
    </Flex>
  );
};