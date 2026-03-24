---
type: mental-model
name: Earned Value Management
abbreviation: EVM
description: A method for integrated project management that converts cost and schedule progress into "monetary value" to forecast future performance.
nature: FRAMEWORK
methodology:
  - structural
  - critical
tags:
  - project-management
sources:
  - title: "A Guide to the Project Management Body of Knowledge (PMBOK Guide)"
    author: "Project Management Institute (PMI)"
    url: "https://www.pmi.org/pmbok-guide-standards"
    sourceType: "primary"
    sourceLanguage: "en"
    description: "The global standard for project management. EVM is defined as a primary tool for cost management."
related_models:
  - work-breakdown-structure
  - critical-path-method
  - theory-of-constraints
format_version: 0.5
last_updated: 03-24-2026
---

# Earned Value Management

## Overview

Earned Value Management (EVM) is a project management technique that measures progress using three key metrics: **"Budget"**, **"Actuals"**, and the **"Value"** of the work actually completed. By integrating the perspective of "how much work is finished relative to the plan" into the traditional "how much has been spent relative to the budget" on a monetary basis, it objectively visualizes the "health" of a project and forecasts final costs and completion dates.

## Rating (1–5)

- **Applicability:** 4
- **Effectiveness:** 5
- **Complexity:** 4
- **Misuse Risk:** 2

### Evaluation Comment

EVM is extremely powerful for fulfilling accountability to stakeholders because it quantifies the project status in the common language of "money." However, it requires a detailed **"WBS (Work Breakdown Structure)"** and budget allocation as prerequisites, leading to high operational costs. It proves its true value in large-scale, plan-driven projects rather than small, fluid ones.

---

## The First Question

> **"Are we truly producing 1,000 yen worth of 'Value' for every 1,000 yen of budget we spend right now?"**

### Objectives

- To grasp the true progress rate by integrating schedule and cost performance.
- To logically forecast the Estimate at Completion (EAC) and completion timing using performance indices (CPI/SPI).
- To detect anomalies early and decide on evidence-based corrective actions (e.g., resource reallocation).

### Poor Questions

- "Is there still budget left?" (Budget balance alone overlooks the risk of falling behind schedule.)
- "Is the planned work finished?" (If the definition of "finished" is vague, the progress rate becomes inaccurate.)
- "Is the team working hard?" (Subjective effort cannot provide objective deadline forecasts or cost management.)

---

## How to Use (Step-by-Step)

1. **Calculate the Three Fundamental Values**
   - **PV (Planned Value):** The budget for the work scheduled to be completed by a specific date.
   - **AC (Actual Cost):** The actual cost incurred for the work performed by that date.
   - **EV (Earned Value):** The budget assigned to the work that has actually been completed (the "physical" progress).
2. **Analyze Variances and Efficiency**
   - **CV (Cost Variance):** $EV - AC$ (Positive means under budget; negative means over budget).
   - **SV (Schedule Variance):** $EV - PV$ (Positive means ahead of schedule; negative means behind schedule).
   - **CPI (Cost Performance Index):** $EV / AC$ (Over 1.0 means cost efficiency is good).
3. **Forecast Future Values**
   - **EAC (Estimate At Completion):** Calculate the projected total cost at the end if the current efficiency continues.

---

## Output Examples

- **Weekly Progress Report**
  Quantitative reporting such as: "The current CPI is 0.8; therefore, we are projected to exceed the budget by 20% upon completion. Corrective action is required to review our work processes."
- **Visualization via S-Curve**
  A graph plotting the PV, AC, and EV lines to intuitively show the deviation (gap) between plan and reality.

---

## Use Cases

- **Business:** Cost management for system development projects, schedule management for civil engineering and construction, and cross-project monitoring by a PMO.
- **Decision Making / Thinking:** When a standard is needed to judge whether to invest additional resources or reduce the project scope.

## Typical Misuses

- **Progress Evaluation other than "100% or 0%":** Assigning subjective values like "50% complete" to unfinished work lowers the reliability of EV (strict standards like the **"0/100 Rule"** are necessary).
- **Delayed AC (Actual Cost) Collection:** If actual expenditure data is slow to arrive, the analysis becomes "past news," making it too late for intervention.
- **Ignoring Quality:** Even if EV is high, if the quality of deliverables is poor and requires rework, AC will spike in later stages, and indices will deteriorate rapidly.

## Relationship with Other Models

- **Complementary:** WBS (Work Breakdown Structure), Critical Path Method (CPM)
- **Related:** S-Curve Analysis
