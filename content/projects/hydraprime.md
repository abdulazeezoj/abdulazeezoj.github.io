---
title: "Hydraprime CLI"
summary: "A local trading lab: store candles, backtest strategy and risk combinations, and carefully validate demo and live execution."
year: 2026
kind: case-study
tags: [CLI, Fintech, TypeScript]
stack: [TypeScript, Node.js, Prisma, Vitest]
role: Author
featured: false
---

Hydraprime is a command-line tool for experimenting with trading strategies on your own machine. It is development tooling, not investment advice or an unattended trading platform, and the code is private.

## What it does

- **Accounts and markets.** Exchange credentials are stored encrypted, and are never displayed. Capital.com is the supported venue.
- **Historical data.** It stores OHLCV candles locally so strategies can be tested without calling the exchange each time.
- **Strategies as sandboxed code.** A strategy returns `BUY`, `SELL`, `HOLD` or `CLOSE` for each market it watches, and runs in a sandbox. Risk rules (side, size, stop loss, take profit, leverage, position count) are a separate, reusable piece.
- **Traders.** A trader binds markets, a signal strategy, a risk strategy and candle settings into something durable that can be dry-run, validated on a demo account, and only then used live.

## Design choices

- **Guided and resumable.** `setup` advances one missing prerequisite at a time and never starts a trader or places an order; `status` is read-only and says what to do next.
- **Safety first.** Everything that could move money is explicit, and dry runs and demo validation come before live execution.
- **Scriptable.** Commands support `--json` output so they can be used in automation.
