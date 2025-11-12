export const calculateBMI = (height, weight) => {
  if (!height || !weight) return null;
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);
  return parseFloat(bmi.toFixed(2));
};

export const getBMICategory = (bmi) => {
  if (!bmi) return null;
  
  if (bmi < 18.5) return 'underweight';
  if (bmi < 25) return 'normal';
  if (bmi < 30) return 'overweight';
  return 'obese';
};

export const getRecommendedCalories = (bmi, gender, age, weight, height) => {
  // Base BMR calculation (Mifflin-St Jeor Equation)
  let bmr;
  if (gender === 'male') {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }

  // Activity multiplier (sedentary to moderate)
  const activityMultiplier = 1.5;
  let dailyCalories = bmr * activityMultiplier;

  // Adjust based on BMI category
  if (bmi < 18.5) {
    // Underweight - add 300-500 calories
    dailyCalories += 400;
  } else if (bmi >= 25 && bmi < 30) {
    // Overweight - reduce by 300-500 calories
    dailyCalories -= 400;
  } else if (bmi >= 30) {
    // Obese - reduce by 500-700 calories
    dailyCalories -= 600;
  }

  return Math.round(dailyCalories);
};

