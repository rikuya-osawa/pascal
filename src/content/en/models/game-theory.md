---
type: mental-model
name: Game Theory
abbreviation: Game Theory
description: A mathematical framework for analyzing strategic decision-making in situations where one's payoff depends on the actions of others.
nature: PRINCIPLE
methodology:
  - decisive
  - interactive
related_models:
  - zero-sum-game
  - nash-equilibrium
  - prisoners-dilemma
tags:
  - game-theory
  - strategy
  - economics
sources:
  - title: "Theory of Games and Economic Behavior"
    author: "John von Neumann & Oskar Morgenstern"
    url: "https://archive.org/details/theoryofgamesand00vonn"
    sourceType: "primary"
    sourceLanguage: "en"
    description: "The monumental work that laid the foundation for modern game theory, introducing mathematical approaches to economics and social sciences."
format_version: 0.4
---

# Game Theory

## Overview

Game Theory is a way of thinking that analyzes situations where ** "Multiple Decision-Makers (Players)" ** anticipate each other's actions to maximize their own interests. Rather than searching for a single absolute "best" answer, it mathematically derives the resulting equilibrium based on the premise that others will also act in their own best interest.

## Rating (1–5)

* **Applicability:** 5
* **Effectiveness:** 5
* **Complexity:** 4
* **Misuse Risk:** 3

### Evaluation Comment

This is an indispensable lens for any situation involving others, such as business, politics, or evolutionary biology. By understanding structures like the ** "Prisoner's Dilemma," ** where parties might betray each other despite mutual benefit, it becomes possible to avoid unnecessary conflict or design cooperative systems. However, the assumption that players are always "rational" can sometimes diverge from reality.

---

## The First Question

> ** "How does my payoff depend on the actions of others, and how do they predict my actions in response?" **

### Objectives

* To visualize situations of ** "Strategic Interdependence" ** and predict developments one or several steps ahead.
* To identify the ** "Nash Equilibrium" ** — a state where no player has an incentive to change their strategy, given the strategies of others.
* To design incentives (rewards or penalties) that guide players toward a desired outcome, such as cooperation.

### Poor Questions

* "What is the best choice for me alone?" (Individual optimization that ignores the reactions of others often leads to the worst results.)
* "I'm sure the other party will do this for me." (Predictions based on wishful thinking are not strategic thinking.)
* "Is it just a matter of winning or losing?" (Real games include cooperative games where both benefit, or "lose-lose" quagmires where both suffer.)

---

## How to Use (Step-by-Step)

1. **Define the Elements of the Game**
   * **Players:** Who is involved in the decision-making?
   * **Strategies:** What options are available to each player?
   * **Payoffs:** How much does each player gain from every possible combination of choices?
2. **Create a Payoff Matrix (or Game Tree)**
   Create a matrix of the combinations of choices and quantify the payoffs to visualize the structure.
3. **Find the Equilibrium and Formulate a Strategy**
   Consider the reaction functions (e.g., "If they do A, I do B"). Find the point where no one wants to change their strategy (**Nash Equilibrium**).

---

## Output Examples

* **Price War Analysis (Prisoner's Dilemma):**
  * A company and its competitor choose between "Discount" or "Maintain Price."
  * Profit is maximized if both "Maintain," but if one "Discounts," they steal the other's customers.
  * You identify the structure where both choose to "Discount" to protect themselves, ultimately damaging the entire industry's profits.
* **Market Entry Decision (Extensive-Form Game):**
  * When you enter a market, you predict whether the incumbent will "Retaliate (Price War)" or "Accommodate" using a tree format to judge the validity of entry.

---

## Use Cases

* **Business:** Pricing strategies against competitors, rule design for platforms, and negotiation strategies for M&A.
* **Daily Life:** Negotiating household chores with family/friends, choosing a route to avoid traffic, and bidding in auctions.
* **Decision Making / Thinking:** Preventing the ** "Tragedy of the Commons," ** where individual optimization leads to collective disadvantage despite having a common goal.

## Typical Misuses

* **Ignoring Irrationality:** Overestimating that others will always act with perfect mathematical logic. One must account for ** "Bounded Rationality" ** driven by emotions or cognitive biases.
* **The Zero-Sum Trap:** Assuming every game is "win-lose." This misses "Non-Zero-Sum Games" where win-win outcomes are possible.
* **Overlooking Information Asymmetry:** Analyzing a situation while ignoring the fact that one party has more or different information than the other, which heavily skews the payoff matrix.

## Relationship with Other Models

* **Complementary:** Nash Equilibrium.
* **Related:** Adverse Selection (Information Asymmetry), Game of Chicken.