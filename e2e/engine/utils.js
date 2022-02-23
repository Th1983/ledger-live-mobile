// TO BE REMOVED

// @flow
// const { device, element, by, waitFor } = require("detox");

// export function cleanLaunch() {
//   return device.launchApp({
//     delete: true,
//     launchArgs: {
//       detoxURLBlacklistRegex: ".*://explorers.api.live.ledger.com/.*",
//     },
//   });
// }

// export async function $proceed(): Promise<void> {
//   const el = $("Proceed");
//   await $waitFor(el);
//   await el.tap();
// }

// export function $(id: string) {
//   return element(by.id(id));
// }

// export function $byText(text: string) {
//   return element(by.text(text));
// }

// // specifing -1 as percentage would check just an existence
// export function $waitFor(
//   q: Query,
//   percentage: number = 75,
//   timeout: number = 5000,
// ) {
//   const el = getElement(q);
//   return percentage < 0
//     ? waitFor(el)
//         .toExist()
//         .withTimeout(timeout)
//     : waitFor(el)
//         .toBeVisible(percentage)
//         .withTimeout(timeout);
// }

// export function $tap(q: Query) {
//   return getElement(q).tap();
// }

// export function $scrollTill(
//   visibleTarget: Query,
//   scrollViewId: string = "ScrollView",
//   pixel: number = 200,
//   direction: ScrollDirection = "down",
// ) {
//   const targetEl = getElement(visibleTarget);
//   return waitFor(targetEl)
//     .toBeVisible()
//     .whileElement(by.id(scrollViewId))
//     .scroll(pixel, direction);
// }

// export async function $retryUntilItWorks(action, timeout) {
//   let shouldContinue = true;
//   const startTime = Date.now();

//   while (shouldContinue) {
//     shouldContinue = false;

//     try {
//       await action();
//     } catch {
//       shouldContinue = true;
//     }

//     if (timeout && Date.now() - startTime > timeout) {
//       throw new Error("Timed out when waiting for action");
//     }
//     console.log("Trying again...");
//   }
// }

// export function wait(milliseconds) {
//   return new Promise(resolve => setTimeout(resolve, milliseconds));
// }

// type Element = any;

// type Query = string | Element;

// function getElement(q: Query): Element {
//   return typeof q === "string" ? $(q) : q;
// }

// type ScrollDirection = "top" | "down" | "right" | "left";
