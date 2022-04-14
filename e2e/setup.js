import { execSync } from "child_process";
// import { device } from "detox";
import * as bridge from "./bridge/server";

// eslint-disable-next-line no-undef
beforeAll(async () => {
  // console.log("==============> LAUNCH APP BEFORE ALL");
  // await device.launchApp({ newInstance: true });

  console.log("==============> STARTING BRIDGE INIT");
  bridge.init();
  // await device.launchApp();

  console.log("==============> SETTING UP DEMO MODE");
  setupDemoModeForScreenshots();

  // return device.launchApp({
  //   delete: true,
  //   launchArgs: {
  //     detoxURLBlacklistRegex: ".*://explorers.api.live.ledger.com/.*",
  //   },
  // });
});

// eslint-disable-next-line no-undef
afterAll(async () => {
  console.log("==============> CLOSING BRIDGE");
  bridge.close();
});

function setupDemoModeForScreenshots() {
  // set app to demo mode for screenshots
  if (device.getPlatform() === "ios") {
    execSync(
      'xcrun simctl status_bar "iPhone 11 Pro" override --time "12:00" --batteryState charged --batteryLevel 100 --wifiBars 3 --cellularMode active --cellularBars 4',
    );
  } else {
    // enter demo mode
    execSync("adb shell settings put global sysui_demo_allowed 1");
    // display time 12:00
    execSync(
      "adb shell am broadcast -a com.android.systemui.demo -e command clock -e hhmm 1200",
    );
    // Display full mobile data with 4g type and no wifi
    execSync(
      "adb shell am broadcast -a com.android.systemui.demo -e command network -e mobile show -e level 4 -e datatype 4g -e wifi false",
    );
    // Hide notifications
    execSync(
      "adb shell am broadcast -a com.android.systemui.demo -e command notifications -e visible false",
    );
    // Show full battery but not in charging state
    execSync(
      "adb shell am broadcast -a com.android.systemui.demo -e command battery -e plugged false -e level 100",
    );
  }
}