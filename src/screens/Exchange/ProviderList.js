// @flow

import React, { useCallback, useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import SafeAreaView from "react-native-safe-area-view";
import { useNavigation, useTheme } from "@react-navigation/native";

import { useRampCatalog } from "@ledgerhq/live-common/lib/platform/providers/RampCatalogProvider";
import { useRemoteLiveAppManifest } from "@ledgerhq/live-common/lib/platform/providers/RemoteLiveAppProvider";
import { filterRampCatalogEntries } from "@ledgerhq/live-common/lib/platform/providers/RampCatalogProvider/helpers";
import { useSelector } from "react-redux";
import {
  RampLiveAppCatalogEntry,
  RampCatalogEntry,
} from "@ledgerhq/live-common/lib/platform/providers/RampCatalogProvider/types";
import type {
  CryptoCurrency,
  TokenCurrency,
} from "@ledgerhq/live-common/lib/types";
import extraStatusBarPadding from "../../logic/extraStatusBarPadding";
import AppIcon from "../Platform/AppIcon";
import LText from "../../components/LText";
import { counterValueCurrencySelector } from "../../reducers/settings";
import { NavigatorName } from "../../const";

import ApplePay from "../../icons/ApplePay";
import GooglePay from "../../icons/GooglePay";
import Maestro from "../../icons/Maestro";
import MasterCard from "../../icons/MasterCard";
import PayPal from "../../icons/PayPal";
import Sepa from "../../icons/Sepa";
import Visa from "../../icons/Visa";
import ArrowRight from "../../icons/ArrowRight";
import TrackScreen from "../../analytics/TrackScreen";

const forceInset = { bottom: "always" };

const assetMap = {
  applepay: ApplePay,
  googlepay: GooglePay,
  maestro: Maestro,
  mastercard: MasterCard,
  paypal: PayPal,
  sepa: Sepa,
  visa: Visa,
};

type ProviderItemProps = {
  provider: RampLiveAppCatalogEntry,
  onClick: (
    provider: RampLiveAppCatalogEntry,
    icon: string,
    name: string,
  ) => void,
};

const ProviderItem = ({ provider, onClick }: ProviderItemProps) => {
  const [displayedPMs, setDisplayedPMs] = useState<string[]>(
    provider.paymentProviders.slice(0, 4),
  );
  const { colors } = useTheme();
  const manifest = useRemoteLiveAppManifest(provider.appId);

  const onItemClick = useCallback(() => {
    onClick(provider, manifest.icon, manifest.name);
  }, [provider, manifest, onClick]);

  const onMorePMsClick = useCallback(() => {
    setDisplayedPMs([...provider.paymentProviders]);
  }, [displayedPMs]);

  if (!manifest) {
    return null;
  }

  return (
    <TouchableOpacity
      onPress={onItemClick}
      style={[
        styles.itemRoot,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
        },
      ]}
    >
      <TrackScreen category="Multibuy" name="ProviderList" />
      <View style={styles.itemLeft}>
        <View style={styles.itemHeader}>
          <AppIcon icon={manifest.icon} name={manifest.name} size={32} />
          <LText secondary style={styles.headerLabel}>
            {manifest.name}
          </LText>
        </View>
        <View style={styles.pmsRow}>
          {displayedPMs.map(paymentProvider => (
            <View
              key={paymentProvider}
              style={[styles.pm, { borderColor: colors.border }]}
            >
              {assetMap[paymentProvider] ? (
                assetMap[paymentProvider]({})
              ) : (
                <LText style={styles.pmLabel}>{paymentProvider}</LText>
              )}
            </View>
          ))}
          {provider.paymentProviders.length > 4 && displayedPMs.length <= 4 && (
            <TouchableOpacity
              onPress={onMorePMsClick}
              style={[styles.pm, { borderColor: colors.border }]}
            >
              <LText style={styles.pmLabel}>
                +{provider.paymentProviders.length - 4} more
              </LText>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <ArrowRight size={16} color={colors.grey} />
    </TouchableOpacity>
  );
};

type Props = {
  navigation: any,
  route: { params: RouteParams, name: string },
};

type RouteParams = {
  accountId: string,
  accountAddress: string,
  currency: CryptoCurrency | TokenCurrency,
  type: "onRamp" | "offRamp",
};

export default function ProviderList({ route }: Props) {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { colors } = useTheme();
  const rampCatalog = useRampCatalog();
  const { currency, type, accountId, accountAddress } = route.params;
  const fiatCurrency = useSelector(counterValueCurrencySelector);

  const filteredProviders = filterRampCatalogEntries(rampCatalog.value[type], {
    cryptoCurrencies: currency.id ? [currency.id] : undefined,
    fiatCurrencies: fiatCurrency.ticker
      ? [fiatCurrency.ticker.toLowerCase()]
      : undefined,
  });

  const onProviderClick = useCallback(
    (provider: RampCatalogEntry, icon: string, name: string) => {
      navigation.navigate(NavigatorName.ProviderView, {
        provider,
        accountId,
        accountAddress,
        trade: {
          type,
          cryptoCurrencyId: currency.id,
          fiatCurrencyId: fiatCurrency.ticker,
          fiatAmount: 400,
        },
        icon,
        name,
      });
    },
    [navigation, route, currency, fiatCurrency],
  );

  return (
    <SafeAreaView
      style={[
        styles.root,
        {
          backgroundColor: colors.card,
          paddingTop: extraStatusBarPadding,
        },
      ]}
      forceInset={forceInset}
    >
      <LText style={styles.title}>{t("exchange.providerList.title")}</LText>
      {filteredProviders.map(provider =>
        provider.type === "LIVE_APP" ? (
          <ProviderItem
            provider={provider}
            key={provider.name}
            onClick={onProviderClick}
          />
        ) : null,
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    minWidth: "100%",
    display: "flex",
    flexDirection: "column",
    paddingHorizontal: 16,
  },
  title: {
    marginTop: 24,
    marginBottom: 16,
    fontSize: 14,
  },
  itemRoot: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  itemLeft: {
    flex: 0.9,
  },
  itemHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  headerLabel: {
    fontSize: 16,
    marginLeft: 8,
  },
  pmsRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  pm: {
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 6,
    marginRight: 4,
  },
  pmLabel: {
    fontSize: 12,
  },
});
