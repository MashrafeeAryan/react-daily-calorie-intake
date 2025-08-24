// src/index.ts

export interface NutritionTarget {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface CalorieOptions {
  gender: "male" | "female";
  weight_lbs: number;
  ageYears: number;
  heightInches: number;
  goals: number; // negative = weight loss, 0 = maintenance, positive = gain
  activityLevel: "sedentary" | "light" | "moderate" | "active" | "very_active";
}

export interface CalorieResult {
  bmr: number;
  maintenance: number;
  goalCalories: number;
  macros: NutritionTarget;
}

/**
 * Calculate calories and macros based on user data.
 */
export function calculateCalories({
  gender,
  weight_lbs,
  ageYears,
  heightInches,
  goals,
  activityLevel,
}: CalorieOptions): CalorieResult {
  // 📐 Imperial Mifflin-St Jeor Formula
  const bmr =
    gender === "male"
      ? 66 + 6.23 * weight_lbs + 12.7 * heightInches - 6.8 * ageYears
      : 655 + 4.35 * weight_lbs + 4.7 * heightInches - 4.7 * ageYears;

  // Activity multiplier
  const activityMultiplier: Record<string, number> = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    very_active: 1.9,
  };
  const multiplier = activityMultiplier[activityLevel] || 0;

  const maintenance = bmr * multiplier;

  // Adjust calories based on goal (1 lb = 3500 kcal)
  const goalCalories = maintenance + (goals * 3500) / 7;

  // Macronutrient breakdown
  let protein = 0,
    carbs = 0,
    fat = 0;

  if (goals < 0) {
    // Weight Loss: 40% Protein, 40% Carbs, 20% Fat
    protein = (0.4 * goalCalories) / 4;
    carbs = (0.4 * goalCalories) / 4;
    fat = (0.2 * goalCalories) / 9;
  } else if (goals > 0) {
    // Muscle Gain: 30% Protein, 50% Carbs, 20% Fat
    protein = (0.3 * goalCalories) / 4;
    carbs = (0.5 * goalCalories) / 4;
    fat = (0.2 * goalCalories) / 9;
  } else {
    // Maintenance: 30% Protein, 40% Carbs, 30% Fat
    protein = (0.3 * goalCalories) / 4;
    carbs = (0.4 * goalCalories) / 4;
    fat = (0.3 * goalCalories) / 9;
  }

  return {
    bmr,
    maintenance,
    goalCalories,
    macros: {
      calories: goalCalories,
      protein,
      carbs,
      fat,
    },
  };
}
