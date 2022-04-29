import useFeature from "@ledgerhq/live-common/lib/featureFlags/useFeature";
import { Flex, Icons } from "@ledgerhq/native-ui";
import {
  CardStyleInterpolators,
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useTheme } from "styled-components/native";
import { NavigatorName, ScreenName } from "../../const";
import * as families from "../../families";
import { getStackNavigatorConfig } from "../../navigation/navigatorConfig";
import styles from "../../navigation/styles";
import TransparentHeaderNavigationOptions from "../../navigation/TransparentHeaderNavigationOptions";
import { readOnlyModeEnabledSelector } from "../../reducers/settings";
import Account from "../../screens/Account";
import AccountHeaderRight from "../../screens/Account/AccountHeaderRight";
import AccountHeaderTitle from "../../screens/Account/AccountHeaderTitle";
import Asset, { HeaderTitle } from "../../screens/Asset";
import BuyDeviceScreen from "../../screens/BuyDeviceScreen";
import Distribution from "../../screens/Distribution";
import EditDeviceName from "../../screens/EditDeviceName";
import ProviderList from "../../screens/Exchange/ProviderList";
import ProviderView from "../../screens/Exchange/ProviderView";
import ScreenHeader from "../../screens/Exchange/ScreenHeader";
import Learn from "../../screens/Learn";
import ManagerMain from "../../screens/Manager/Manager";
import MarketCurrencySelect from "../../screens/Market/MarketCurrencySelect";
import OperationDetails, {
  BackButton,
  CloseButton,
} from "../../screens/OperationDetails";
import PairDevices from "../../screens/PairDevices";
import PlatformApp from "../../screens/Platform/App";
import PortfolioHistory from "../../screens/Portfolio/PortfolioHistory";
import ScanRecipient from "../../screens/SendFunds/ScanRecipient";
import SwapFormSelectAccount from "../../screens/Swap/FormSelection/SelectAccountScreen";
import SwapFormSelectCurrency from "../../screens/Swap/FormSelection/SelectCurrencyScreen";
import SwapFormSelectFees from "../../screens/Swap/FormSelection/SelectFeesScreen";
import SwapFormSelectProviderRate from "../../screens/Swap/FormSelection/SelectProviderRateScreen";
import SwapOperationDetails from "../../screens/Swap/OperationDetails";
import VerifyAccount from "../../screens/VerifyAccount";
import WalletConnectConnect from "../../screens/WalletConnect/Connect";
import WalletConnectDeeplinkingSelectAccount from "../../screens/WalletConnect/DeeplinkingSelectAccount";
import WalletConnectScan from "../../screens/WalletConnect/Scan";
import FallbackCameraSend from "../FallbackCamera/FallbackCameraSend";
import HeaderRightClose from "../HeaderRightClose";
import StepHeader from "../StepHeader";
import AccountSettingsNavigator from "./AccountSettingsNavigator";
import AccountsNavigator from "./AccountsNavigator";
import AddAccountsNavigator from "./AddAccountsNavigator";
import AnalyticsNavigator from "./AnalyticsNavigator";
import { ErrorHeaderInfo } from "./BaseOnboardingNavigator";
import ClaimRewardsNavigator from "./ClaimRewardsNavigator";
import ExchangeBuyFlowNavigator from "./ExchangeBuyFlowNavigator";
import ExchangeNavigator from "./ExchangeNavigator";
import ExchangeSellFlowNavigator from "./ExchangeSellFlowNavigator";
import FirmwareUpdateNavigator from "./FirmwareUpdateNavigator";
import FreezeNavigator from "./FreezeNavigator";
import ImportAccountsNavigator from "./ImportAccountsNavigator";
import LendingEnableFlowNavigator from "./LendingEnableFlowNavigator";
import LendingInfoNavigator from "./LendingInfoNavigator";
import LendingNavigator from "./LendingNavigator";
import LendingSupplyFlowNavigator from "./LendingSupplyFlowNavigator";
import LendingWithdrawFlowNavigator from "./LendingWithdrawFlowNavigator";
import Main from "./MainNavigator";
import MigrateAccountsFlowNavigator from "./MigrateAccountsFlowNavigator";
import NftNavigator from "./NftNavigator";
import NotificationCenterNavigator from "./NotificationCenterNavigator";
import PasswordAddFlowNavigator from "./PasswordAddFlowNavigator";
import PasswordModifyFlowNavigator from "./PasswordModifyFlowNavigator";
import ReceiveFundsNavigator from "./ReceiveFundsNavigator";
import RequestAccountNavigator from "./RequestAccountNavigator";
import SendFundsNavigator from "./SendFundsNavigator";
import SettingsNavigator from "./SettingsNavigator";
import SignMessageNavigator from "./SignMessageNavigator";
import SignTransactionNavigator from "./SignTransactionNavigator";
import SwapNavigator from "./SwapNavigator";
import UnfreezeNavigator from "./UnfreezeNavigator";

export default function BaseNavigator() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const stackNavigationConfig = useMemo(
    () => getStackNavigatorConfig(colors, true),
    [colors],
  );
  const readOnlyModeEnabled = useSelector(readOnlyModeEnabledSelector);
  const learn = useFeature("learn");

  return (
    <Stack.Navigator
      screenOptions={{
        ...stackNavigationConfig,
        ...TransitionPresets.ModalPresentation,
      }}
    >
      <Stack.Screen
        name={NavigatorName.Main}
        component={Main}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ScreenName.BuyDeviceScreen}
        component={BuyDeviceScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={NavigatorName.Settings}
        component={SettingsNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={NavigatorName.ReceiveFunds}
        component={ReceiveFundsNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={NavigatorName.SendFunds}
        component={SendFundsNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ScreenName.PlatformApp}
        component={PlatformApp}
        options={({ route }) => ({
          headerBackImage: () => (
            <Flex pl="16px">
              <Icons.CloseMedium color="neutral.c100" size="20px" />
            </Flex>
          ),
          headerStyle: styles.headerNoShadow,
          title: route.params.name,
        })}
      />
      {learn?.enabled ? (
        <Stack.Screen
          name={ScreenName.Learn}
          component={Learn}
          options={{
            headerShown: false,
            animationEnabled: false,
          }}
        />
      ) : null}
      <Stack.Screen
        name={NavigatorName.SignMessage}
        component={SignMessageNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={NavigatorName.SignTransaction}
        component={SignTransactionNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={NavigatorName.Swap}
        component={SwapNavigator}
        options={{
          ...stackNavigationConfig,
          headerLeft: null,
          title: t("transfer.swap.form.tab"),
        }}
      />
      <Stack.Screen
        name={ScreenName.SwapV2FormSelectAccount}
        component={SwapFormSelectAccount}
        options={({ route }) => ({
          headerTitle: () => (
            <StepHeader
              title={
                route.params.target === "from"
                  ? t("transfer.swap.form.from")
                  : t("transfer.swap.form.to")
              }
            />
          ),
          headerRight: null,
        })}
      />
      <Stack.Screen
        name={ScreenName.SwapOperationDetails}
        component={SwapOperationDetails}
        options={{
          title: t("transfer.swap.form.tab"),
          headerRight: null,
        }}
      />
      <Stack.Screen
        name={ScreenName.SwapV2FormSelectCurrency}
        component={SwapFormSelectCurrency}
        options={{
          headerTitle: () => <StepHeader title={t("transfer.swap.form.to")} />,
          headerRight: null,
        }}
      />
      <Stack.Screen
        name={ScreenName.SwapFormSelectProviderRate}
        component={SwapFormSelectProviderRate}
        options={{
          headerTitle: () => (
            <StepHeader title={t("transfer.swap.form.summary.method")} />
          ),
          headerRight: null,
        }}
      />
      <Stack.Screen
        name={ScreenName.SwapV2FormSelectFees}
        component={SwapFormSelectFees}
        options={{
          headerTitle: () => (
            <StepHeader title={t("transfer.swap.form.summary.fees")} />
          ),
          headerRight: null,
        }}
      />
      <Stack.Screen
        name={NavigatorName.Lending}
        component={LendingNavigator}
        options={{
          ...stackNavigationConfig,
          headerStyle: styles.headerNoShadow,
          headerLeft: null,
          title: t("transfer.lending.title"),
        }}
      />
      <Stack.Screen
        name={NavigatorName.LendingInfo}
        component={LendingInfoNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={NavigatorName.LendingEnableFlow}
        component={LendingEnableFlowNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={NavigatorName.LendingSupplyFlow}
        component={LendingSupplyFlowNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={NavigatorName.LendingWithdrawFlow}
        component={LendingWithdrawFlowNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={NavigatorName.Freeze}
        component={FreezeNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={NavigatorName.Unfreeze}
        component={UnfreezeNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={NavigatorName.ClaimRewards}
        component={ClaimRewardsNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={NavigatorName.AddAccounts}
        component={AddAccountsNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={NavigatorName.RequestAccount}
        component={RequestAccountNavigator}
        options={{
          headerShown: false,
        }}
        listeners={({ route }) => ({
          beforeRemove: () => {
            /**
              react-navigation workaround try to fetch params from current route params
              or fallback to child navigator route params
              since this listener is on top of another navigator
            */
            const onError =
              route.params?.onError || route.params?.params?.onError;
            // @TODO replace with correct error
            if (onError && typeof onError === "function")
              onError(
                route.params.error ||
                  new Error("Request account interrupted by user"),
              );
          },
        })}
      />
      <Stack.Screen
        name={ScreenName.VerifyAccount}
        component={VerifyAccount}
        options={{
          headerLeft: null,
          title: t("transfer.receive.headerTitle"),
        }}
        listeners={({ route }) => ({
          beforeRemove: () => {
            const onClose =
              route.params?.onClose || route.params?.params?.onClose;
            if (onClose && typeof onClose === "function") {
              onClose();
            }
          },
        })}
      />
      <Stack.Screen
        name={NavigatorName.FirmwareUpdate}
        component={FirmwareUpdateNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={NavigatorName.Exchange}
        {...(readOnlyModeEnabled
          ? {
              component: BuyDeviceScreen,
              options: {
                ...TransitionPresets.ModalTransition,
                headerShown: false,
              },
            }
          : {
              component: ExchangeNavigator,
              options: { headerStyle: styles.headerNoShadow, headerLeft: null },
            })}
      />
      <Stack.Screen
        name={NavigatorName.ProviderList}
        component={ProviderList}
        options={({ navigation, route }) => ({
          headerLeft: () => <BackButton navigation={navigation} />,
          headerRight: null,
          headerTitle:
            route.params.type === "onRamp"
              ? t("exchange.buy.screenTitle")
              : t("exchange.sell.screenTitle"),
          headerStyle: styles.headerNoShadow,
        })}
      />
      <Stack.Screen
        name={NavigatorName.ProviderView}
        component={ProviderView}
        options={({ navigation, route }) => ({
          headerLeft: () => <BackButton navigation={navigation} />,
          headerRight: null,
          headerTitle: () => (
            <ScreenHeader icon={route.params.icon} name={route.params.name} />
          ),
          headerStyle: styles.headerNoShadow,
        })}
      />
      <Stack.Screen
        name={NavigatorName.ExchangeBuyFlow}
        component={
          readOnlyModeEnabled ? BuyDeviceScreen : ExchangeBuyFlowNavigator
        }
        initialParams={{ mode: "buy" }}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={NavigatorName.ExchangeSellFlow}
        component={
          readOnlyModeEnabled ? BuyDeviceScreen : ExchangeSellFlowNavigator
        }
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ScreenName.OperationDetails}
        component={OperationDetails}
        options={({ route, navigation }) => {
          if (route.params?.isSubOperation) {
            return {
              headerTitle: () => (
                <StepHeader
                  subtitle={t("operationDetails.title")}
                  title={
                    route.params?.operation?.type
                      ? t(`operations.types.${route.params.operation.type}`)
                      : ""
                  }
                />
              ),
              headerLeft: () => <BackButton navigation={navigation} />,
              headerRight: () => <CloseButton navigation={navigation} />,
            };
          }

          return {
            headerTitle: () => (
              <StepHeader
                subtitle={t("operationDetails.title")}
                title={
                  route.params?.operation?.type
                    ? t(`operations.types.${route.params.operation.type}`)
                    : ""
                }
              />
            ),
            headerLeft: () => <BackButton navigation={navigation} />,
            headerRight: null,
          };
        }}
      />
      <Stack.Screen
        name={NavigatorName.AccountSettings}
        component={AccountSettingsNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={NavigatorName.ImportAccounts}
        component={ImportAccountsNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ScreenName.PairDevices}
        component={PairDevices}
        options={({ navigation, route }) => ({
          title: null,
          headerRight: () => (
            <ErrorHeaderInfo
              route={route}
              navigation={navigation}
              colors={colors}
            />
          ),
          headerShown: true,
          headerStyle: styles.headerNoShadow,
        })}
      />
      <Stack.Screen
        name={ScreenName.EditDeviceName}
        component={EditDeviceName}
        options={{
          title: t("EditDeviceName.title"),
          headerLeft: null,
          ...TransitionPresets.ModalPresentationIOS,
        }}
      />
      <Stack.Screen
        name={NavigatorName.PasswordAddFlow}
        component={PasswordAddFlowNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={NavigatorName.PasswordModifyFlow}
        component={PasswordModifyFlowNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={NavigatorName.MigrateAccountsFlow}
        component={MigrateAccountsFlowNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ScreenName.Distribution}
        component={Distribution}
        options={{
          ...stackNavigationConfig,
          title: t("distribution.header"),
          headerLeft: null,
        }}
      />
      <Stack.Screen
        name={NavigatorName.Analytics}
        component={AnalyticsNavigator}
        options={{
          title: t("analytics.title"),
          headerRight: null,
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
      />
      <Stack.Screen
        name={ScreenName.MarketCurrencySelect}
        component={MarketCurrencySelect}
        options={{
          title: t("market.filters.currency"),
          headerLeft: null,
          unmountOnBlur: true,
        }}
      />
      <Stack.Screen
        name={ScreenName.Asset}
        component={readOnlyModeEnabled ? BuyDeviceScreen : Asset}
        options={{
          headerTitle: () => <HeaderTitle />,
          headerRight: null,
        }}
      />
      <Stack.Screen
        name={ScreenName.PortfolioOperationHistory}
        component={PortfolioHistory}
        options={{
          headerTitle: t("analytics.operations.title"),
          headerRight: null,
        }}
      />
      <Stack.Screen
        name={ScreenName.Account}
        component={readOnlyModeEnabled ? BuyDeviceScreen : Account}
        options={({ route, navigation }) => ({
          headerLeft: () => (
            <BackButton navigation={navigation} route={route} />
          ),
          headerTitle: () => <AccountHeaderTitle />,
          headerRight: () => <AccountHeaderRight />,
        })}
      />
      <Stack.Screen
        name={ScreenName.ScanRecipient}
        component={ScanRecipient}
        options={{
          ...TransparentHeaderNavigationOptions,
          title: t("send.scan.title"),
          headerRight: () => (
            <HeaderRightClose color={colors.white} preferDismiss={false} />
          ),
          headerLeft: null,
        }}
      />
      <Stack.Screen
        name={ScreenName.WalletConnectScan}
        component={WalletConnectScan}
        options={{
          ...TransparentHeaderNavigationOptions,
          title: "Wallet Connect",
          headerRight: () => (
            <HeaderRightClose color={colors.white} preferDismiss={false} />
          ),
          headerLeft: null,
        }}
      />
      <Stack.Screen
        name={ScreenName.WalletConnectDeeplinkingSelectAccount}
        component={WalletConnectDeeplinkingSelectAccount}
        options={{
          title: t("walletconnect.deeplinkingTitle"),
          headerRight: () => <HeaderRightClose preferDismiss={false} />,
          headerLeft: null,
        }}
      />
      <Stack.Screen
        name={ScreenName.WalletConnectConnect}
        component={WalletConnectConnect}
        options={{
          title: "Wallet Connect",
          headerLeft: null,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name={ScreenName.FallbackCameraSend}
        component={FallbackCameraSend}
        options={{
          title: t("send.scan.fallback.header"),
          headerLeft: null,
        }}
      />
      <Stack.Screen
        name={NavigatorName.NotificationCenter}
        component={NotificationCenterNavigator}
        options={({ navigation }) => ({
          title: t("notificationCenter.title"),
          headerLeft: null,
          headerRight: () => <CloseButton navigation={navigation} />,
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        })}
      />
      <Stack.Screen
        name={NavigatorName.NftNavigator}
        component={NftNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={NavigatorName.Accounts}
        component={AccountsNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ScreenName.ManagerMain}
        component={ManagerMain}
        options={{ title: "", headerRight: null }}
      />
      {Object.keys(families).map(name => {
        const { component, options } = families[name];
        return (
          <Stack.Screen
            key={name}
            name={name}
            component={component}
            options={options}
          />
        );
      })}
    </Stack.Navigator>
  );
}

const Stack = createStackNavigator();
