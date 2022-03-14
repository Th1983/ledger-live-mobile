import React from "react";
import { Device } from "@ledgerhq/live-common/lib/hw/actions/types";
import { SyncSkipUnderPriority } from "@ledgerhq/live-common/lib/bridge/react";
import styled from "styled-components/native";
import { Alert, Flex } from "@ledgerhq/native-ui";
import { useTranslation } from "react-i18next";
import DeviceAction from "./DeviceAction";
import BottomModal from "./BottomModal";

const DeviceActionContainer = styled(Flex).attrs({
  flexDirection: "row",
})``;

type Props = {
  // TODO: fix action type
  action: any;
  device: Device | null | undefined;
  // TODO: fix request type
  request?: any;
  onClose?: () => void;
  onModalHide?: () => void;
  onResult?: $PropertyType<React$ElementProps<typeof DeviceAction>, "onResult">;
  renderOnResult?: (p: any) => React.ReactNode;
  onSelectDeviceLink?: () => void;
  analyticsPropertyFlow?: string;
};

export default function DeviceActionModal({
  action,
  device,
  request,
  onClose,
  onResult,
  renderOnResult,
  onModalHide,
  onSelectDeviceLink,
  analyticsPropertyFlow,
}: Props) {
  const { t } = useTranslation();
  const showAlert = !device?.wired;
  return (
    <BottomModal
      id="DeviceActionModal"
      isOpened={!!device}
      onClose={onClose}
      onModalHide={onModalHide}
    >
      {device && (
        <Flex>
          <DeviceActionContainer marginBottom={showAlert ? "16px" : 0}>
            <DeviceAction
              action={action}
              device={device}
              request={request}
              onClose={onClose}
              onResult={onResult}
              renderOnResult={renderOnResult}
              onSelectDeviceLink={onSelectDeviceLink}
              analyticsPropertyFlow={analyticsPropertyFlow}
            />
          </DeviceActionContainer>
          {showAlert && (
            <Alert type="info" title={t("DeviceAction.stayInTheAppPlz")} />
          )}
        </Flex>
      )}
      {device && <SyncSkipUnderPriority priority={100} />}
    </BottomModal>
  );
}
