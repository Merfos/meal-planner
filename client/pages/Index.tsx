import { useState, useEffect } from 'react';

interface Dish {
  id: string;
  name: string;
  ingredients: string;
  mealType?: string;
  time?: string;
  calories?: number;
  isActive?: boolean;
}

interface DayData {
  dishes: Dish[];
  totalCalories: number;
}

const daysData: Record<string, DayData> = {
  понеділок: {
    dishes: [
      {
        id: '1',
        name: 'Вівсянка з м��локом, бананом та горішками',
        ingredients: 'Овес 50г; Молоко 150мл; Банан 50г; Суміш горіхів 10г.',
        mealType: 'Сніданок',
        time: '10:30',
        calories: 385,
        isActive: true
      },
      {
        id: '2',
        name: 'Банан і горішки',
        ingredients: 'Банан 120г; Суміш горіхів 20г.',
        mealType: 'Перекус',
        time: '13:00',
        calories: 228,
        isActive: false
      },
      {
        id: '3',
        name: 'Куряче філе на грилі з броколі',
        ingredients: 'Курка 200г; Рис 60г; Броколі 100г.',
        mealType: 'Обід',
        time: '15:30',
        calories: 465,
        isActive: false
      },
      {
        id: '4',
        name: 'Протеїновий йогурт',
        ingredients: 'Йогурт 170г.',
        mealType: 'Перекус',
        time: '18:00',
        calories: 140,
        isActive: false
      },
      {
        id: '5',
        name: 'Омлет з овочами та салатом',
        ingredients: 'Яйця 2шт; Хумус 40г; Хліб 2шт; Салат 50г.',
        mealType: 'Вечеря',
        time: '20:30',
        calories: 470,
        isActive: false
      }
    ],
    totalCalories: 1668
  },
  вівторок: {
    dishes: [
      {
        id: '1',
        name: 'Омлет з помідорами та хлібом з цільного зерна і фетою',
        ingredients: 'Яйця 2шт; Помідори 100г; Хліб 40г; Фета 40г.',
        mealType: 'Сніданок',
        time: '10:30',
        calories: 410,
        isActive: true
      },
      {
        id: '2',
        name: 'Протеїновий шейк',
        ingredients: 'Протеїн 30г; Молоко 250мл.',
        mealType: 'Перекус',
        time: '13:00',
        calories: 245,
        isActive: false
      },
      {
        id: '3',
        name: 'Гречка з котлетами з індички та овочами на пару',
        ingredients: 'Гречка 60г; Котлети з індички180г; Овочі 200г.',
        mealType: 'Обід',
        time: '15:30',
        calories: 522,
        isActive: false
      },
      {
        id: '4',
        name: 'Морква з хумусом',
        ingredients: 'Морква 100г; Хумус 40г.',
        mealType: 'Перекус',
        time: '10:30',
        calories: 135,
        isActive: false
      },
      {
        id: '5',
        name: 'Запечене куряче стегно з овочами',
        ingredients: 'Куряче стегно 100г; Овочі 150г.',
        mealType: 'Вечеря',
        time: '20:30',
        calories: 315,
        isActive: false
    }
  ], totalCalories: 1627 },
  середа: {
    dishes: [
      {
        id: '1',
        name: 'Сирники з ягодами та джемом',
        ingredients: 'Сирники 150г; Ягодин 100г.',
        mealType: 'Сніданок',
        time: '10:30',
        calories: 365,
        isActive: true
      },
      {
        id: '2',
        name: 'Суміш горіхів та яблуко',
        ingredients: 'Горіхи 20г; Яблуко 150г.',
        mealType: 'Сніданок',
        time: '13:00',
        calories: 200,
        isActive: false
      },
      {
        id: '3',
        name: 'Картопля зі свининою на грилі та салатом зі шпинату',
        ingredients: 'Картопля 200г; Свинина 150г; Шпинат 30г.',
        mealType: 'Обід',
        time: '15:30',
        calories: 507,
        isActive: false
      },
      {
        id: '4',
        name: 'Протеїновий йог��рт',
        ingredients: 'Йогурт 170г.',
        mealType: 'Перекус',
        time: '18:00',
        calories: 140,
        isActive: false
      },
      {
        id: '5',
        name: 'Куряче філе на грилі з моцарелою та овочами',
        ingredients: 'Курка 250г; Овочі 150г; Моцарела 50г.',
        mealType: 'Вечеря',
        time: '20:30',
        calories: 475,
        isActive: false
      }
  ], totalCalories: 1686 },
  четвер: {
    dishes: [
      {
        id: '1',
        name: 'Вівсянка з молоком, бананом та горішками',
        ingredients: 'Овес 50г; Молоко 150мл; Банан 50г; Суміш горіхів 10г.',
        mealType: 'Сніданок',
        time: '10:30',
        calories: 385,
        isActive: true
      },
      {
        id: '2',
        name: 'Банан і горішки',
        ingredients: 'Банан 120г; Суміш горіхів 20г.',
        mealType: 'Сніданок',
        time: '13:00',
        calories: 385,
        isActive: false
      },
      {
        id: '3',
        name: 'Протеїновий йогурт',
        ingredients: 'Йогурт Хг.',
        mealType: 'Сніданок',
        time: '15:30',
        calories: 385,
        isActive: false
      },
      {
        id: '4',
        name: 'Протеїновий йогурт',
        ingredients: 'Йогурт Хг.',
        mealType: 'Сніданок',
        time: '18:00',
        calories: 385,
        isActive: false
      },
      {
        id: '5',
        name: 'Протеїновий йогурт',
        ingredients: 'Йогурт Хг.',
        mealType: 'Сніданок',
        time: '20:30',
        calories: 385,
        isActive: false
      }
  ], totalCalories: 10 },
  'п\'ятниця': {
    dishes: [
      {
        id: '1',
        name: 'Вівсянка з молоком, бананом та горішками',
        ingredients: 'Овес 50г; Молоко 150мл; Банан 50г; Суміш горіхів 10г.',
        mealType: 'Сніданок',
        time: '10:30',
        calories: 385,
        isActive: true
      },
      {
        id: '2',
        name: 'Банан і горішки',
        ingredients: 'Банан 120г; Суміш горіхів 20г.',
        mealType: 'Сніданок',
        time: '10:30',
        calories: 385,
        isActive: false
      },
      {
        id: '3',
        name: 'Протеїновий йогурт',
        ingredients: 'Йогурт Хг.',
        mealType: 'Сніданок',
        time: '10:30',
        calories: 385,
        isActive: false
      },
      {
        id: '4',
        name: 'Протеїновий йогурт',
        ingredients: 'Йогурт Хг.',
        mealType: 'Сніданок',
        time: '10:30',
        calories: 385,
        isActive: false
      },
      {
        id: '5',
        name: 'Протеїновий йогурт',
        ingredients: 'Йогурт Хг.',
        mealType: 'Сніданок',
        time: '10:30',
        calories: 385,
        isActive: false
      }
  ], totalCalories: 10 },
  субота: {
    dishes: [
      {
        id: '1',
        name: 'Вівсянка з молоком, бананом та горішками',
        ingredients: 'Овес 50г; Молоко 150мл; Банан 50г; Суміш горіхів 10г.',
        mealType: 'Сніданок',
        time: '10:30',
        calories: 385,
        isActive: true
      },
      {
        id: '2',
        name: 'Банан і горішки',
        ingredients: 'Банан 120г; Суміш горіхів 20г.',
        mealType: 'Сніданок',
        time: '10:30',
        calories: 385,
        isActive: false
      },
      {
        id: '3',
        name: 'Протеїновий йогурт',
        ingredients: 'Йогурт Хг.',
        mealType: 'Сніданок',
        time: '10:30',
        calories: 385,
        isActive: false
      },
      {
        id: '4',
        name: 'Протеїновий йогурт',
        ingredients: 'Йогурт Хг.',
        mealType: 'Сніданок',
        time: '10:30',
        calories: 385,
        isActive: false
      },
      {
        id: '5',
        name: 'Протеїновий йогурт',
        ingredients: 'Йогурт Хг.',
        mealType: 'Сніданок',
        time: '10:30',
        calories: 385,
        isActive: false
      }
  ], totalCalories: 10 },
  неділя: {
    dishes: [
      {
        id: '1',
        name: 'Вівсянка з молоком, бананом та горішками',
        ingredients: 'Овес 50г; Молоко 150мл; Банан 50г; Суміш горіхів 10г.',
        mealType: 'Сніданок',
        time: '10:30',
        calories: 385,
        isActive: true
      },
      {
        id: '2',
        name: 'Банан і горішки',
        ingredients: 'Банан 120г; Суміш горіхів 20г.',
        mealType: 'Сніданок',
        time: '10:30',
        calories: 385,
        isActive: false
      },
      {
        id: '3',
        name: 'Протеїновий йогурт',
        ingredients: 'Йогурт Хг.',
        mealType: 'Сніданок',
        time: '10:30',
        calories: 385,
        isActive: false
      },
      {
        id: '4',
        name: 'Протеїновий йогурт',
        ingredients: 'Йогурт Хг.',
        mealType: 'Сніданок',
        time: '10:30',
        calories: 385,
        isActive: false
      },
      {
        id: '5',
        name: 'Протеїновий йогурт',
        ingredients: 'Йогурт Хг.',
        mealType: 'Сніданок',
        time: '10:30',
        calories: 385,
        isActive: false
      }
  ], totalCalories: 10 }
};

const DayTab = ({
  day,
  isActive,
  onClick
}: {
  day: string;
  isActive: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 transition-colors duration-200 ${
      isActive ? 'text-meal-primary' : 'text-meal-secondary'
    } hover:text-meal-primary`}
  >
    <span className="font-nunito text-2xl font-black uppercase leading-none">
      {day}
    </span>
    {isActive && (
      <div className="w-3 h-3 sm:w-4 sm:h-4 bg-meal-accent rounded-full flex-shrink-0" />
    )}
  </button>
);

const DishCard = ({
  dish,
  isExpanded,
  onClick
}: {
  dish: Dish;
  isExpanded: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className="flex flex-col p-4 sm:p-6 rounded-2xl gap-4 sm:gap-16 bg-meal-card w-full text-left transition-all duration-200 hover:bg-opacity-80"
  >
    <div className="flex flex-col gap-1">
      <h3 className={`
        font-nunito text-xl font-extrabold uppercase leading-tight
        ${isExpanded ? 'text-meal-primary' : 'text-meal-secondary'}
      `}>
        {dish.name}
      </h3>
      <p className="font-nunito text-base text-meal-secondary leading-normal">
        {dish.ingredients}
      </p>
    </div>

    {isExpanded && dish.mealType && dish.time && dish.calories && (
      <div className="flex items-start gap-4 w-full">
        <div className="flex flex-col w-full">
          <span className="font-nunito text-sm sm:text-base text-meal-secondary uppercase font-extrabold">
            {dish.mealType}
          </span>
          <span className="font-nunito text-sm sm:text-base font-extrabold text-meal-accent uppercase">
            {dish.time}
          </span>
        </div>
        <div className="flex flex-col ml-auto w-full">
          <span className="font-nunito text-sm sm:text-base text-meal-secondary text-right uppercase font-extrabold">
            калорії
          </span>
          <span className="font-nunito text-sm sm:text-base font-extrabold text-meal-accent text-right uppercase">
            {dish.calories}
          </span>
        </div>
      </div>
    )}
  </button>
);

const TotalCaloriesCard = ({ totalCalories }: { totalCalories: number }) => (
  <div className="flex items-center gap-4 p-6 rounded-2xl border border-meal-border bg-meal-background sm:justify-start sm:items-end">
    <span className="flex-1 font-nunito text-sm sm:text-base font-extrabold text-meal-primary uppercase">
      усього калорій на день:
    </span>
    <span className="font-nunito text-sm sm:text-base font-extrabold text-meal-accent text-right uppercase">
      {totalCalories} ккал
    </span>
  </div>
);

// Function to get current day of the week in Ukrainian
const getCurrentDayInUkrainian = (): string => {
  const dayNames = [
    'неділя',     // Sunday - 0
    'понеділок',  // Monday - 1
    'вівторок',   // Tuesday - 2
    'середа',     // Wednesday - 3
    'четвер',     // Thursday - 4
    'п\'ятниця',  // Friday - 5
    'субота'      // Saturday - 6
  ];

  const today = new Date();
  const dayIndex = today.getDay();
  return dayNames[dayIndex];
};

// Function to parse time string (e.g., "10:30") to minutes since midnight
const parseTimeToMinutes = (timeStr: string): number => {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 60 + minutes;
};

// Function to get current time in minutes since midnight
const getCurrentTimeInMinutes = (): number => {
  const now = new Date();
  return now.getHours() * 60 + now.getMinutes();
};

// Function to find the most appropriate dish based on current time
const findCurrentMealByTime = (dishes: Dish[]): string | null => {
  const currentTimeMinutes = getCurrentTimeInMinutes();

  // Filter dishes that have time information
  const timedDishes = dishes.filter(dish => dish.time).map(dish => ({
    ...dish,
    timeMinutes: parseTimeToMinutes(dish.time!)
  }));

  if (timedDishes.length === 0) {
    // If no dishes have time, return first dish if any exist
    return dishes.length > 0 ? dishes[0].id : null;
  }

  // Sort dishes by time
  timedDishes.sort((a, b) => a.timeMinutes - b.timeMinutes);

  // Find the current or next meal
  let currentMeal = timedDishes[0]; // Default to first meal

  for (const dish of timedDishes) {
    if (dish.timeMinutes <= currentTimeMinutes) {
      currentMeal = dish;
    } else {
      break;
    }
  }

  return currentMeal.id;
};

export default function Index() {
  const [activeDay, setActiveDay] = useState(getCurrentDayInUkrainian());
  const [expandedDishId, setExpandedDishId] = useState<string | null>(null);

  // Add error handling to prevent crashes
  const currentDayData = daysData[activeDay] || { dishes: [], totalCalories: 0 };

  // Set initial expanded dish when component mounts or day changes, based on current time
  useEffect(() => {
    const appropriateMealId = findCurrentMealByTime(currentDayData.dishes);
    setExpandedDishId(appropriateMealId);
  }, [activeDay, currentDayData.dishes]);

  // Real-time updates - check every minute for meal time changes
  useEffect(() => {
    const interval = setInterval(() => {
      // Only update if we're on the current day to avoid overriding manual selections on other days
      const currentDay = getCurrentDayInUkrainian();
      if (activeDay === currentDay) {
        const appropriateMealId = findCurrentMealByTime(currentDayData.dishes);
        setExpandedDishId(appropriateMealId);
      }
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [activeDay, currentDayData.dishes]);

  const days = [
    'понеділок',
    'вівторок', 
    'середа',
    'четвер',
    'п\'ятниця',
    'субота',
    'неділя'
  ];

  return (
    <div className="min-h-screen bg-meal-background">
      <div className="flex justify-center px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="w-full max-w-5xl">
          <div className="flex flex-col gap-6 sm:gap-8">
            {/* Day Tabs */}
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 overflow-x-auto scrollbar-hide justify-start">
                <div className="flex items-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 min-w-max">
                  {days.map((day) => (
                  <DayTab
                    key={day}
                    day={day}
                    isActive={activeDay === day}
                    onClick={() => setActiveDay(day)}
                  />
                ))}
                </div>
              </div>
            </div>

            {/* Dishes Container */}
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-4">
                {currentDayData.dishes.map((dish) => (
                  <DishCard
                    key={dish.id}
                    dish={dish}
                    isExpanded={expandedDishId === dish.id}
                    onClick={() => {
                      // Toggle expanded state - collapse if already expanded, expand if collapsed
                      setExpandedDishId(expandedDishId === dish.id ? null : dish.id);
                    }}
                  />
                ))}

                {currentDayData.dishes.length === 0 && (
                  <div className="flex items-center justify-center p-12 text-meal-secondary">
                    <span className="font-nunito text-lg">Немає страв на цей день</span>
                  </div>
                )}
              </div>

              {currentDayData.totalCalories > 0 && (
                <TotalCaloriesCard totalCalories={currentDayData.totalCalories} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
