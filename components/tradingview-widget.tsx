"use client";

import { useEffect } from "react";

interface TradingViewWidgetOptions {
  container_id: string;
  autosize?: boolean;
  symbol: string;
  interval?: string;
  timezone?: string;
  theme?: string;
  style?: string;
  locale?: string;
  toolbar_bg?: string;
  enable_publishing?: boolean;
  hide_top_toolbar?: boolean;
  allow_symbol_change?: boolean;
}

declare global {
  interface Window {
    TradingView?: {
      widget: new (options: TradingViewWidgetOptions) => void;
    };
  }
}

interface Props {
  symbol?: string;
}

const TradingViewWidget = ({ symbol = "BTCUSDT" }: Props) => {
  useEffect(() => {
    if (!window.TradingView || !window.TradingView.widget) return;

    const WidgetConstructor = window.TradingView.widget as new (
      options: TradingViewWidgetOptions
    ) => void;

    new WidgetConstructor({
      container_id: "tradingview_chart",
      autosize: true,
      symbol: `BINANCE:${symbol}`,
      interval: "1",
      timezone: "Etc/UTC",
      theme: "dark",
      style: "1",
      locale: "en",
      toolbar_bg: "#000000",
      enable_publishing: false,
      hide_top_toolbar: false,
      allow_symbol_change: true,
    });
  }, [symbol]);

  return <div id="tradingview_chart" className="h-[500px] w-full" />;
};

export default TradingViewWidget;
