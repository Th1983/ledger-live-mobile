import React, { useState } from "react";
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
  onResult?: (payload: any) => Promise<void> | void;
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
  const [result, setResult] = useState<any[] | null>(null);
  return (
    <BottomModal
      id="DeviceActionModal"
      isOpened={result ? false : !!device}
      onClose={onClose}
      onModalHide={() => {
        if (onModalHide) onModalHide();
        if (result) onResult(...result);
        setResult(null);
      }}
    >
      {result
        ? null
        : device && (
            <Flex>
              <DeviceActionContainer marginBottom={showAlert ? "16px" : 0}>
                <DeviceAction
                  action={action}
                  device={device}
                  request={request}
                  onResult={(...props) => {
                    setResult([...props]);
                  }}
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