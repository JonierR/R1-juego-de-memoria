import "@testing-library/jest-dom/vitest";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import { JSDOM } from "jsdom";

const dom = new JSDOM("", {
  url: "http://localhost/",
});

const storage = dom.window.localStorage;

Object.defineProperty(window, "localStorage", {
  configurable: true,
  value: storage,
});

Object.defineProperty(globalThis, "localStorage", {
  configurable: true,
  value: storage,
});

Object.defineProperty(globalThis, "Storage", {
  configurable: true,
  value: dom.window.Storage,
});

afterEach(() => cleanup());
