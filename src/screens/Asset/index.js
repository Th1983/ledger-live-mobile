/* @flow */

import {
  flattenAccounts,
  getAccountCurrency,
  groupAccountsOperationsByDay,
  isAccountEmpty,
} from "@ledgerhq/live-common/lib/account";
import { isCountervalueEnabled } from "@ledgerhq/live-common/lib/countervalues/modules";
import type { PortfolioRange } from "@ledgerhq/live-common/lib/portfolio/v2/types";
import type {
  Account,
  Currency,
  Operation,
  Unit,
} from "@ledgerhq/live-common/lib/types";
import { useRoute, useTheme } from "@react-navigation/native";
import React, { PureComponent, useMemo } from "react";
import { SectionList, StyleSheet, View } from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import type { SectionBase } from "react-native/Libraries/Lists/SectionList";
import { useDispatch, useSelector } from "react-redux";
import { useCurrencyPortfolio } from "../../actions/portfolio";
import { switchCountervalueFirst } from "../../actions/settings";
import AccountDistribution from "../../components/AccountDistribution";
import type { RenderTitle } from "../../components/AssetGraphCard";
import AssetGraphCard from "../../components/AssetGraphCard";
import CurrencyIcon from "../../components/CurrencyIcon";
import CurrencyUnitValue from "../../components/CurrencyUnitValue";
import { FabAccountActions } from "../../components/FabActions";
import globalSyncRefreshControl from "../../components/globalSyncRefreshControl";
import LoadingFooter from "../../components/LoadingFooter";
import LText from "../../components/LText";
import NoMoreOperationFooter from "../../components/NoMoreOperationFooter";
import NoOperationFooter from "../../components/NoOperationFooter";
import OperationRow from "../../components/OperationRow";
import SectionHeader from "../../components/SectionHeader";
import Touchable from "../../components/Touchable";
import { withDiscreetMode } from "../../context/DiscreetModeContext";
import { accountsSelector } from "../../reducers/accounts";
import {
  counterValueCurrencySelector,
  countervalueFirstSelector,
  selectedTimeRangeSelector,
} from "../../reducers/settings";

const List = globalSyncRefreshControl(SectionList);

type Props = {
  route: { params: any },
  counterValueUnit: Unit,
};

type AssetProps = Props & {
  currency: Currency,
  range: PortfolioRange,
  counterValue: any,
  accounts: any, // Fixme doesn't want AccountLikeArray
  allAccounts: Account[],
  counterValueCurrency: Currency,
  useCounterValue: boolean,
  portfolio: any,
  switchCountervalueFirst: () => void,
  colors: *,
};

export function HeaderTitle() {
  const route = useRoute();
  return (
    <View style={{ flexDirection: "row" }}>
      <View style={{ marginRight: 5, justifyContent: "center" }}>
        <CurrencyIcon size={16} currency={route.params?.currency} />
      </View>
      <LText semiBold secondary style={{ fontSize: 16 }}>
        {route.params?.currency.name}
      </LText>
    </View>
  );
}

class Asset extends PureComponent<AssetProps, any> {
  state = {
    opCount: 50,
  };

  renderListHeaderTitle: RenderTitle = ({
    useCounterValue,
    cryptoCurrencyUnit,
    counterValueUnit,
    item,
  }) => {
    const { switchCountervalueFirst, currency } = this.props;
    const countervalueAvailable = isCountervalueEnabled(currency);
    const items = [
      { unit: cryptoCurrencyUnit, value: item.value },
      // $FlowFixMe
      { unit: counterValueUnit, value: item.countervalue },
    ];
    const shouldUseCounterValue = countervalueAvailable && useCounterValue;
    if (shouldUseCounterValue && item.countervalue) {
      items.reverse();
    }

    return (
      <Touchable
        event="SwitchAccountCurrency"
        eventProperties={{ useCounterValue: shouldUseCounterValue }}
        onPress={countervalueAvailable ? switchCountervalueFirst : undefined}
      >
        <View style={styles.balanceContainer}>
          <LText style={styles.balanceText} semiBold>
            <CurrencyUnitValue {...items[0]} joinFragmentsSeparator=" " />
          </LText>
          <LText style={styles.balanceSubText} semiBold color="smoke">
            {/* $FlowFixMe */}
            <CurrencyUnitValue {...items[1]} />
          </LText>
        </View>
      </Touchable>
    );
  };

  renderHeader = () => {
    const {
      useCounterValue,
      range,
      currency,
      portfolio,
      counterValueCurrency,
      accounts,
      allAccounts,
    } = this.props;

    const account = accounts.length && accounts[0];
    const parentAccount =
      account && account.type !== "Account"
        ? allAccounts.find(a => a.id === account.parentId)
        : null;

    return (
      <View>
        <AssetGraphCard
          currency={currency}
          range={range}
          history={portfolio.history}
          useCounterValue={useCounterValue}
          valueChange={
            useCounterValue ? portfolio.valueChange : portfolio.cryptoChange
          }
          countervalueAvailable={portfolio.countervalueAvailable}
          counterValueCurrency={counterValueCurrency}
          renderTitle={this.renderListHeaderTitle}
        />
        {account && (
          <View style={[styles.fabActions]}>
            <FabAccountActions
              account={account}
              parentAccount={parentAccount}
            />
          </View>
        )}
        <AccountDistribution
          accounts={accounts}
          counterValueCurrency={counterValueCurrency}
        />
      </View>
    );
  };

  renderSectionHeader = ({ section }: { section: * }) => (
    <SectionHeader section={section} />
  );

  renderItem = ({
    item,
    index,
    section,
  }: {
    item: Operation,
    index: number,
    section: SectionBase<*>,
  }) => {
    const { allAccounts, accounts } = this.props;
    const account = accounts.find(a => a.id === item.accountId);
    const parentAccount =
      account && account.type !== "Account"
        ? allAccounts.find(a => a.id === account.parentId)
        : null;

    if (!account) return null;

    return (
      <OperationRow
        operation={item}
        parentAccount={parentAccount}
        account={account}
        multipleAccounts
        isLast={section.data.length - 1 === index}
      />
    );
  };

  onEndReached = () => {
    this.setState(prevState => ({ opCount: prevState.opCount + 50 }));
  };

  keyExtractor = (item: Operation) => item.id;
  ref = React.createRef<React$Node>();

  render() {
    const { opCount } = this.state;
    const { accounts, currency, colors } = this.props;

    const { sections, completed } = groupAccountsOperationsByDay(accounts, {
      count: opCount,
      withSubAccounts: currency.type !== "CryptoCurrency", // Fixme, do sub accounts have 'tokens'?
    });

    return (
      <View style={[styles.root, { backgroundColor: colors.background }]}>
        <SafeAreaView style={styles.root}>
          <List
            forwardedRef={this.ref}
            sections={sections}
            style={styles.list}
            contentContainerStyle={styles.contentContainer}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderItem}
            renderSectionHeader={this.renderSectionHeader}
            onEndReached={this.onEndReached}
            stickySectionHeadersEnabled={false}
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={16}
            ListHeaderComponent={this.renderHeader}
            ListFooterComponent={
              !completed ? (
                <LoadingFooter />
              ) : accounts.every(isAccountEmpty) ? null : sections.length ? (
                <NoMoreOperationFooter />
              ) : (
                <NoOperationFooter />
              )
            }
          />
        </SafeAreaView>
      </View>
    );
  }
}

function Screen(props: Props) {
  const dispatch = useDispatch();
  const currency = props.route.params.currency;
  const range = useSelector(selectedTimeRangeSelector);
  const counterValue = useSelector(counterValueCurrencySelector);
  const allAccounts = useSelector(accountsSelector);
  const accounts = useMemo(
    () =>
      flattenAccounts(allAccounts)
        .filter(a => getAccountCurrency(a) === currency)
        .sort((a, b) => b.balance.comparedTo(a.balance)),
    [allAccounts, currency],
  );
  const counterValueCurrency = useSelector(counterValueCurrencySelector);
  const useCounterValue = useSelector(countervalueFirstSelector);
  const portfolio = useCurrencyPortfolio({
    currency,
    range,
  });

  const { colors } = useTheme();

  return (
    <Asset
      {...props}
      currency={currency}
      range={range}
      counterValue={counterValue}
      accounts={accounts}
      allAccounts={allAccounts}
      counterValueCurrency={counterValueCurrency}
      useCounterValue={useCounterValue}
      portfolio={portfolio}
      switchCountervalueFirst={(...args) =>
        dispatch(switchCountervalueFirst(...args))
      }
      colors={colors}
    />
  );
}

export default withDiscreetMode(Screen);

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  list: {
    flex: 1,
    flexGrow: 1,
  },
  contentContainer: {
    flexGrow: 1,
    paddingTop: 16,
    paddingBottom: 64,
  },
  balanceTextContainer: {
    marginBottom: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  balanceText: {
    fontSize: 22,
  },
  balanceSubText: {
    fontSize: 16,
  },
  balanceContainer: {
    marginLeft: 16,
    alignItems: "flex-start",
    height: 44,
  },
  fabActions: {
    height: 56,
    width: "100%",
    alignContent: "flex-start",
    justifyContent: "flex-start",
  },
});
