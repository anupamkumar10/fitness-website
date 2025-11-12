import User from '../models/User.js';
import Workout from '../models/Workout.js';
import Diet from '../models/Diet.js';
import Membership from '../models/Membership.js';
import mongoose from 'mongoose';

const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Workout.deleteMany({});
    await Diet.deleteMany({});
    await Membership.deleteMany({});

    // Create Admin User
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@fitness.com',
      password: 'admin123',
      role: 'admin',
      age: 30,
      height: 175,
      weight: 75,
      gender: 'male'
    });

    console.log('Admin created:', admin.email);

    // Create Sample User
    const user = await User.create({
      name: 'John Doe',
      email: 'user@fitness.com',
      password: 'user123',
      age: 28,
      height: 170,
      weight: 70,
      gender: 'male'
    });

    console.log('Sample user created:', user.email);

    // Create Memberships - Gold, Silver, Platinum
    const silverMembership = await Membership.create({
      name: 'Silver',
      description: 'Perfect for beginners starting their fitness journey',
      price: 29.99,
      duration: 30,
      features: [
        'Access to basic workouts',
        'Basic diet plans',
        'Weekly schedule (Mon-Sun)',
        'Progress tracking',
        'Email support'
      ]
    });

    const goldMembership = await Membership.create({
      name: 'Gold',
      description: 'Advanced features for serious fitness enthusiasts',
      price: 59.99,
      duration: 30,
      features: [
        'All Silver features',
        'Advanced workout plans',
        'Personalized diet plans',
        'BMI-based weekly schedule',
        'Priority support',
        'Progress analytics'
      ]
    });

    const platinumMembership = await Membership.create({
      name: 'Platinum',
      description: 'Ultimate package with all premium features',
      price: 99.99,
      duration: 30,
      features: [
        'All Gold features',
        '1-on-1 coaching sessions',
        'Custom meal plans',
        '24/7 support',
        'Advanced progress analytics',
        'Nutritionist consultation',
        'Unlimited schedule regeneration'
      ]
    });

    console.log('Memberships created');

    // Create Day-Specific Workouts (Monday - Sunday)
    const workouts = [
      {
        title: 'Chest & Triceps',
        description: 'Monday chest day focusing on pectoral muscles and triceps for upper body strength',
        duration: 60,
        difficulty: 'intermediate',
        bmiCategory: 'all',
        exercises: [
          { name: 'Bench Press', sets: 4, reps: '8-10', rest: 90 },
          { name: 'Incline Dumbbell Press', sets: 4, reps: '10-12', rest: 90 },
          { name: 'Cable Flyes', sets: 3, reps: '12-15', rest: 60 },
          { name: 'Tricep Dips', sets: 3, reps: '10-15', rest: 60 },
          { name: 'Overhead Tricep Extension', sets: 3, reps: '12-15', rest: 45 },
          { name: 'Push-ups', sets: 3, reps: '15-20', rest: 45 }
        ],
        calories: 450
      },
      {
        title: 'Back & Biceps',
        description: 'Tuesday back day targeting lats, rhomboids, and biceps for a strong posterior chain',
        duration: 60,
        difficulty: 'intermediate',
        bmiCategory: 'all',
        exercises: [
          { name: 'Deadlifts', sets: 4, reps: '6-8', rest: 120 },
          { name: 'Pull-ups', sets: 4, reps: '8-12', rest: 90 },
          { name: 'Barbell Rows', sets: 4, reps: '8-10', rest: 90 },
          { name: 'Lat Pulldowns', sets: 3, reps: '10-12', rest: 60 },
          { name: 'Bicep Curls', sets: 3, reps: '12-15', rest: 45 },
          { name: 'Hammer Curls', sets: 3, reps: '12-15', rest: 45 }
        ],
        calories: 500
      },
      {
        title: 'Legs & Glutes',
        description: 'Wednesday leg day for powerful lower body development and strength',
        duration: 70,
        difficulty: 'intermediate',
        bmiCategory: 'all',
        exercises: [
          { name: 'Squats', sets: 5, reps: '8-10', rest: 120 },
          { name: 'Romanian Deadlifts', sets: 4, reps: '8-10', rest: 90 },
          { name: 'Leg Press', sets: 4, reps: '12-15', rest: 90 },
          { name: 'Walking Lunges', sets: 3, reps: '12 each leg', rest: 60 },
          { name: 'Leg Curls', sets: 3, reps: '12-15', rest: 60 },
          { name: 'Calf Raises', sets: 4, reps: '15-20', rest: 45 }
        ],
        calories: 550
      },
      {
        title: 'Shoulders & Core',
        description: 'Thursday shoulder and core day for strong deltoids and a solid midsection',
        duration: 55,
        difficulty: 'intermediate',
        bmiCategory: 'all',
        exercises: [
          { name: 'Overhead Press', sets: 4, reps: '8-10', rest: 90 },
          { name: 'Lateral Raises', sets: 4, reps: '12-15', rest: 60 },
          { name: 'Front Raises', sets: 3, reps: '12-15', rest: 60 },
          { name: 'Plank', sets: 3, reps: '60 seconds', rest: 45 },
          { name: 'Russian Twists', sets: 3, reps: '20 each side', rest: 45 },
          { name: 'Leg Raises', sets: 3, reps: '15-20', rest: 45 }
        ],
        calories: 400
      },
      {
        title: 'Full Body Strength',
        description: 'Friday full body workout combining all major muscle groups for overall strength',
        duration: 65,
        difficulty: 'advanced',
        bmiCategory: 'all',
        exercises: [
          { name: 'Squats', sets: 4, reps: '10-12', rest: 90 },
          { name: 'Bench Press', sets: 4, reps: '8-10', rest: 90 },
          { name: 'Bent Over Rows', sets: 4, reps: '8-10', rest: 90 },
          { name: 'Overhead Press', sets: 3, reps: '10-12', rest: 60 },
          { name: 'Romanian Deadlifts', sets: 3, reps: '8-10', rest: 90 }
        ],
        calories: 500
      },
      {
        title: 'Cardio & Abs',
        description: 'Saturday cardio session with core focus for endurance and a strong core',
        duration: 45,
        difficulty: 'beginner',
        bmiCategory: 'all',
        exercises: [
          { name: 'Running', sets: 1, reps: '20 minutes', rest: 0 },
          { name: 'Mountain Climbers', sets: 4, reps: '30 seconds', rest: 30 },
          { name: 'Burpees', sets: 3, reps: '12-15', rest: 45 },
          { name: 'Crunches', sets: 3, reps: '20-25', rest: 30 },
          { name: 'Bicycle Crunches', sets: 3, reps: '20 each side', rest: 30 },
          { name: 'Plank Hold', sets: 3, reps: '45 seconds', rest: 30 }
        ],
        calories: 350
      },
      {
        title: 'Yoga & Stretching',
        description: 'Sunday recovery day with yoga and stretching for flexibility and relaxation',
        duration: 40,
        difficulty: 'beginner',
        bmiCategory: 'all',
        exercises: [
          { name: 'Sun Salutation', sets: 3, reps: '5 rounds', rest: 30 },
          { name: 'Warrior Poses', sets: 2, reps: 'Hold 30s each side', rest: 15 },
          { name: 'Tree Pose', sets: 2, reps: 'Hold 30s each side', rest: 15 },
          { name: 'Child\'s Pose', sets: 1, reps: 'Hold 60s', rest: 0 },
          { name: 'Pigeon Pose', sets: 2, reps: 'Hold 30s each side', rest: 15 }
        ],
        calories: 150
      }
    ];

    for (const workout of workouts) {
      await Workout.create({
        ...workout,
        createdBy: admin._id
      });
    }

    console.log('Workouts created');

    // Create Day-Specific Diet Plans (Monday - Sunday)
    const diets = [
      {
        title: 'Monday Meal Plan',
        description: 'Start your week strong with protein-rich meals',
        calories: 2000,
        duration: 1,
        bmiCategory: 'all',
        meals: [
          {
            mealType: 'breakfast',
            name: 'Vegetable Omelet',
            ingredients: ['Eggs', 'Spinach', 'Tomatoes', 'Bell Peppers', 'Cheese', 'Olive Oil'],
            calories: 400
          },
          {
            mealType: 'lunch',
            name: 'Grilled Chicken with Brown Rice',
            ingredients: ['Chicken Breast', 'Brown Rice', 'Broccoli', 'Carrots', 'Olive Oil'],
            calories: 550
          },
          {
            mealType: 'dinner',
            name: 'Baked Salmon with Quinoa',
            ingredients: ['Salmon', 'Quinoa', 'Asparagus', 'Lemon', 'Herbs'],
            calories: 600
          },
          {
            mealType: 'snack',
            name: 'Greek Yogurt with Berries',
            ingredients: ['Greek Yogurt', 'Blueberries', 'Strawberries', 'Honey'],
            calories: 200
          },
          {
            mealType: 'snack',
            name: 'Almonds',
            ingredients: ['Almonds'],
            calories: 150
          }
        ]
      },
      {
        title: 'Tuesday Meal Plan',
        description: 'Balanced nutrition for your training day',
        calories: 2100,
        duration: 1,
        bmiCategory: 'all',
        meals: [
          {
            mealType: 'breakfast',
            name: 'Oatmeal with Fruits',
            ingredients: ['Oats', 'Banana', 'Strawberries', 'Almonds', 'Honey', 'Milk'],
            calories: 450
          },
          {
            mealType: 'lunch',
            name: 'Turkey Wrap',
            ingredients: ['Whole Wheat Tortilla', 'Turkey Breast', 'Lettuce', 'Tomatoes', 'Avocado', 'Hummus'],
            calories: 500
          },
          {
            mealType: 'dinner',
            name: 'Lean Beef with Sweet Potato',
            ingredients: ['Lean Beef', 'Sweet Potato', 'Green Beans', 'Garlic', 'Olive Oil'],
            calories: 650
          },
          {
            mealType: 'snack',
            name: 'Apple with Peanut Butter',
            ingredients: ['Apple', 'Peanut Butter'],
            calories: 250
          },
          {
            mealType: 'snack',
            name: 'Protein Shake',
            ingredients: ['Protein Powder', 'Milk', 'Banana'],
            calories: 250
          }
        ]
      },
      {
        title: 'Wednesday Meal Plan',
        description: 'Power meals for leg day recovery',
        calories: 2200,
        duration: 1,
        bmiCategory: 'all',
        meals: [
          {
            mealType: 'breakfast',
            name: 'Protein Pancakes',
            ingredients: ['Protein Powder', 'Eggs', 'Oats', 'Banana', 'Blueberries', 'Maple Syrup'],
            calories: 500
          },
          {
            mealType: 'lunch',
            name: 'Chicken Caesar Salad',
            ingredients: ['Chicken Breast', 'Romaine Lettuce', 'Parmesan Cheese', 'Caesar Dressing', 'Croutons'],
            calories: 550
          },
          {
            mealType: 'dinner',
            name: 'Pasta with Meatballs',
            ingredients: ['Whole Wheat Pasta', 'Turkey Meatballs', 'Tomato Sauce', 'Parmesan', 'Basil'],
            calories: 700
          },
          {
            mealType: 'snack',
            name: 'Trail Mix',
            ingredients: ['Nuts', 'Dried Fruits', 'Dark Chocolate'],
            calories: 250
          },
          {
            mealType: 'snack',
            name: 'Cottage Cheese',
            ingredients: ['Cottage Cheese', 'Peaches'],
            calories: 200
          }
        ]
      },
      {
        title: 'Thursday Meal Plan',
        description: 'Nutritious meals to fuel your workout',
        calories: 2000,
        duration: 1,
        bmiCategory: 'all',
        meals: [
          {
            mealType: 'breakfast',
            name: 'Avocado Toast with Eggs',
            ingredients: ['Whole Grain Bread', 'Avocado', 'Poached Eggs', 'Spinach', 'Cherry Tomatoes'],
            calories: 450
          },
          {
            mealType: 'lunch',
            name: 'Quinoa Power Bowl',
            ingredients: ['Quinoa', 'Chickpeas', 'Roasted Vegetables', 'Feta Cheese', 'Tahini Dressing'],
            calories: 550
          },
          {
            mealType: 'dinner',
            name: 'Grilled Fish with Vegetables',
            ingredients: ['White Fish', 'Zucchini', 'Bell Peppers', 'Onions', 'Lemon', 'Herbs'],
            calories: 500
          },
          {
            mealType: 'snack',
            name: 'Hummus with Veggies',
            ingredients: ['Hummus', 'Carrots', 'Celery', 'Bell Peppers', 'Cucumber'],
            calories: 200
          },
          {
            mealType: 'snack',
            name: 'Protein Bar',
            ingredients: ['Protein Bar'],
            calories: 200
          }
        ]
      },
      {
        title: 'Friday Meal Plan',
        description: 'End the week strong with balanced meals',
        calories: 2100,
        duration: 1,
        bmiCategory: 'all',
        meals: [
          {
            mealType: 'breakfast',
            name: 'Scrambled Eggs with Toast',
            ingredients: ['Eggs', 'Whole Grain Toast', 'Butter', 'Spinach', 'Mushrooms', 'Cheese'],
            calories: 450
          },
          {
            mealType: 'lunch',
            name: 'Chicken Burrito Bowl',
            ingredients: ['Chicken Breast', 'Brown Rice', 'Black Beans', 'Corn', 'Avocado', 'Salsa', 'Sour Cream'],
            calories: 600
          },
          {
            mealType: 'dinner',
            name: 'Beef Stir Fry',
            ingredients: ['Lean Beef', 'Broccoli', 'Carrots', 'Bell Peppers', 'Soy Sauce', 'Ginger', 'Garlic'],
            calories: 550
          },
          {
            mealType: 'snack',
            name: 'Greek Yogurt Parfait',
            ingredients: ['Greek Yogurt', 'Granola', 'Berries', 'Honey'],
            calories: 250
          },
          {
            mealType: 'snack',
            name: 'Mixed Nuts',
            ingredients: ['Almonds', 'Walnuts', 'Cashews'],
            calories: 200
          }
        ]
      },
      {
        title: 'Saturday Meal Plan',
        description: 'Light and healthy meals for active recovery',
        calories: 1900,
        duration: 1,
        bmiCategory: 'all',
        meals: [
          {
            mealType: 'breakfast',
            name: 'Smoothie Bowl',
            ingredients: ['Banana', 'Berries', 'Greek Yogurt', 'Granola', 'Chia Seeds', 'Honey'],
            calories: 400
          },
          {
            mealType: 'lunch',
            name: 'Mediterranean Salad',
            ingredients: ['Mixed Greens', 'Grilled Chicken', 'Feta Cheese', 'Olives', 'Cucumber', 'Tomatoes', 'Olive Oil'],
            calories: 500
          },
          {
            mealType: 'dinner',
            name: 'Baked Chicken with Roasted Vegetables',
            ingredients: ['Chicken Thighs', 'Sweet Potato', 'Brussels Sprouts', 'Carrots', 'Olive Oil', 'Herbs'],
            calories: 600
          },
          {
            mealType: 'snack',
            name: 'Fruit Salad',
            ingredients: ['Apple', 'Orange', 'Grapes', 'Berries'],
            calories: 200
          },
          {
            mealType: 'snack',
            name: 'Rice Cakes with Almond Butter',
            ingredients: ['Rice Cakes', 'Almond Butter', 'Banana'],
            calories: 200
          }
        ]
      },
      {
        title: 'Sunday Meal Plan',
        description: 'Relaxing day with wholesome comfort meals',
        calories: 2000,
        duration: 1,
        bmiCategory: 'all',
        meals: [
          {
            mealType: 'breakfast',
            name: 'French Toast',
            ingredients: ['Whole Grain Bread', 'Eggs', 'Milk', 'Cinnamon', 'Maple Syrup', 'Berries'],
            calories: 450
          },
          {
            mealType: 'lunch',
            name: 'Turkey Sandwich',
            ingredients: ['Whole Grain Bread', 'Turkey Breast', 'Lettuce', 'Tomatoes', 'Avocado', 'Mayo'],
            calories: 500
          },
          {
            mealType: 'dinner',
            name: 'Roasted Chicken with Mashed Potatoes',
            ingredients: ['Chicken Breast', 'Potatoes', 'Green Beans', 'Gravy', 'Herbs'],
            calories: 650
          },
          {
            mealType: 'snack',
            name: 'Dark Chocolate',
            ingredients: ['Dark Chocolate'],
            calories: 150
          },
          {
            mealType: 'snack',
            name: 'Cheese and Crackers',
            ingredients: ['Whole Grain Crackers', 'Cheese', 'Grapes'],
            calories: 250
          }
        ]
      }
    ];

    for (const diet of diets) {
      await Diet.create({
        ...diet,
        createdBy: admin._id
      });
    }

    console.log('Diet plans created');
    console.log('Seed data completed successfully!');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

export default seedData;

