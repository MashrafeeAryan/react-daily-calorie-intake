# 📦 react-daily-calorie-intake

A lightweight **TypeScript/React library** to calculate **daily calorie needs and macronutrient splits** (protein, carbs, fats) using the **Mifflin-St Jeor formula** and activity multipliers.  

It helps you quickly estimate:  
- **BMR (Basal Metabolic Rate)** → calories your body needs at rest  
- **Maintenance calories** → calories needed to maintain current weight  
- **Adjusted calories** → based on fitness goal (lose, maintain, gain)  
- **Macronutrient split** → protein, carbs, fats in grams  

Perfect for fitness apps, diet planners, or any React project that needs calorie and nutrition tracking.  

---

## 🚀 Installation

```bash
npm install react-daily-calorie-intake
```
or

```
yarn add react-daily-calorie-intake
```
## 🛠 Usage in React
```
import React from "react";
import { calculateCalories } from "react-daily-calorie-intake";

export default function App() {
  const result = calculateCalories({
    gender: "male",
    weight_lbs: 170,     // weight in pounds
    ageYears: 25,        // age in years
    heightInches: 70,    // height in inches (5'10")
    goals: -1,           // lose 1 lb per week (-1), maintain (0), gain 1 lb per week (+1)
    activityLevel: "moderate", // sedentary, light, moderate, active, very_active
  });

  return (
    <div>
      <h2>Daily Nutrition Recommendation</h2>
      <p><strong>BMR:</strong> {result.bmr.toFixed(0)} kcal</p>
      <p><strong>Maintenance Calories:</strong> {result.maintenance.toFixed(0)} kcal</p>
      <p><strong>Target Calories:</strong> {result.adjustedCalories.toFixed(0)} kcal</p>
      <p><strong>Protein:</strong> {result.macros.protein.toFixed(0)} g</p>
      <p><strong>Carbs:</strong> {result.macros.carbs.toFixed(0)} g</p>
      <p><strong>Fat:</strong> {result.macros.fat.toFixed(0)} g</p>
    </div>
  );
}
````
## 📊 Example Output

For a 25-year-old male, 170 lbs, 5’10”, moderate activity, and goal = lose 1 lb per week:
```
{
  "bmr": 1800,
  "maintenance": 2790,
  "adjustedCalories": 2290,
  "macros": {
    "calories": 2290,
    "protein": 229,
    "carbs": 229,
    "fat": 51
  }
}
`s``

# 🧾 Input Parameters
```
{
  weight_lbs: 170,     // body weight in pounds
  ageYears: 25,        // age in years
  heightInches: 70,    // height in inches (5'10")
  goals: -1,           // weekly goal: lose 1 lb (-1), maintain (0), gain 1 lb (+1)
  activityLevel: "moderate" // sedentary, light, moderate, active, very_active
}
```

### gender: "male" | "female"
### weight_lbs: number
### ageYears: number
### heightInches: number
### goals: number
  - What it is: Weekly goal for weight change in pounds per week.
      - (-1) → lose 1 lb per week
      - (0) → maintain weight
      - (1) → gain 1 lb per week
# activityLevel: "sedentary" | "light" | "moderate" | "active" | "very_active"

##Activity Level Explanation
| Level           | Multiplier | Description                                                                                            |
| --------------- | ---------- | ------------------------------------------------------------------------------------------------------ |
| **Sedentary**   | 1.2        | Little or no exercise, mostly sitting (desk job, minimal movement).                                    |
| **Light**       | 1.375      | Light exercise 1–3 days/week (walking, casual activity, easy workouts).                                |
| **Moderate**    | 1.55       | Moderate exercise 3–5 days/week (gym, sports, cycling, active job).                                    |
| **Active**      | 1.725      | Hard exercise 6–7 days/week or a very physical job (construction, athletes-in-training).               |
| **Very Active** | 1.9        | Intense exercise/training twice daily, or a physically demanding lifestyle (elite athletes, military). |


