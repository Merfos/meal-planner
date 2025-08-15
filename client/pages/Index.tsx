import { useState, useEffect, useRef } from "react";

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
        id: "1",
        name: "Вівсянка з молоком, бананом та горішками",
        ingredients: "Овес 50г; Молоко 150мл; Банан 50г; Суміш горіхів 10г.",
        mealType: "Сніданок",
        time: "10:30",
        calories: 385,
        isActive: true,
      },
      {
        id: "2",
        name: "Банан і горішки",
        ingredients: "Банан 120г; Суміш горіхів 20г.",
        mealType: "Перекус",
        time: "13:00",
        calories: 228,
        isActive: false,
      },
      {
        id: "3",
        name: "Куряче філе на грилі з броколі",
        ingredients: "Курка 200г; Рис 60г; Броколі 100г.",
        mealType: "Обід",
        time: "15:30",
        calories: 465,
        isActive: false,
      },
      {
        id: "4",
        name: "Протеїновий йогурт",
        ingredients: "Йогурт 170г.",
        mealType: "Перекус",
        time: "18:00",
        calories: 140,
        isActive: false,
      },
      {
        id: "5",
        name: "Омлет з овочами та салатом",
        ingredients: "Яйця 2шт; Хумус 40г; Хліб 2шт; Салат 50г.",
        mealType: "Вечеря",
        time: "20:30",
        calories: 470,
        isActive: false,
      },
    ],
    totalCalories: 1668,
  },
  вівторок: {
    dishes: [
      {
        id: "1",
        name: "Омлет з помідорами та хлібом з цільного зерна і фетою",
        ingredients: "Яйця 2шт; Помідори 100г; Хліб 40г; Фета 40г.",
        mealType: "Сніданок",
        time: "10:30",
        calories: 410,
        isActive: true,
      },
      {
        id: "2",
        name: "Протеїновий шейк",
        ingredients: "Протеїн 30г; Молоко 250мл.",
        mealType: "Перекус",
        time: "13:00",
        calories: 245,
        isActive: false,
      },
      {
        id: "3",
        name: "Гречка з котлетами з індички та овочами на пару",
        ingredients: "Гречка 60г; Котлети з індички180г; Овочі 200г.",
        mealType: "Обід",
        time: "15:30",
        calories: 522,
        isActive: false,
      },
      {
        id: "4",
        name: "Морква з хумусом",
        ingredients: "Морква 100г; Хумус 40г.",
        mealType: "Перекус",
        time: "10:30",
        calories: 135,
        isActive: false,
      },
      {
        id: "5",
        name: "Запечене куряче стегно з овочами",
        ingredients: "Куряче стегно 100г; Овочі 150г.",
        mealType: "Вечеря",
        time: "20:30",
        calories: 315,
        isActive: false,
      },
    ],
    totalCalories: 1627,
  },
  середа: {
    dishes: [
      {
        id: "1",
        name: "Сирники з ягодами та джемом",
        ingredients: "Сирники 150г; Ягодин 100г.",
        mealType: "Сніданок",
        time: "10:30",
        calories: 365,
        isActive: true,
      },
      {
        id: "2",
        name: "Суміш горіхів та яблуко",
        ingredients: "Горіхи 20г; Яблуко 150г.",
        mealType: "Сніданок",
        time: "13:00",
        calories: 200,
        isActive: false,
      },
      {
        id: "3",
        name: "Картопля зі свининою на грилі та салатом зі шпинату",
        ingredients: "Картопля 200г; Свинина 150г; Шпинат 30г.",
        mealType: "Обід",
        time: "15:30",
        calories: 507,
        isActive: false,
      },
      {
        id: "4",
        name: "Протеїновий йогурт",
        ingredients: "Йогурт 170г.",
        mealType: "Перекус",
        time: "18:00",
        calories: 140,
        isActive: false,
      },
      {
        id: "5",
        name: "Куряче філе на грилі з моцарелою та овочами",
        ingredients: "Курка 250г; Овочі 150г; Моцарела 50г.",
        mealType: "Вечеря",
        time: "20:30",
        calories: 475,
        isActive: false,
      },
    ],
    totalCalories: 1686,
  },
  четвер: {
    dishes: [
      {
        id: "1",
        name: "Два тости з авокадо",
        ingredients: "Цільнозерновий хліб 2шт; Авокадо 50г; Яйце варене 1шт.",
        mealType: "Сніданок",
        time: "10:30",
        calories: 480,
        isActive: true,
      },
      {
        id: "2",
        name: "Протеїновий смузі",
        ingredients: "Протеїн 30г; Банан 100г; Молоко 150мл.",
        mealType: "Перекус",
        time: "13:00",
        calories: 284,
        isActive: false,
      },
      {
        id: "3",
        name: "Булгур з курячим стегном на грилі та салотом",
        ingredients: "Булгур 60г; Куряче стегно 150г; Салат 100г.",
        mealType: "Обід",
        time: "15:30",
        calories: 415,
        isActive: false,
      },
      {
        id: "4",
        name: "Сухофрукти з чаєм",
        ingredients: "Сухофрукти 30г.",
        mealType: "Перекус",
        time: "18:00",
        calories: 105,
        isActive: false,
      },
      {
        id: "5",
        name: "Котлети з індички з печеними овочами",
        ingredients: "Котлети з індички 180г; овочі 150г.",
        mealType: "Вечеря",
        time: "20:30",
        calories: 342,
        isActive: false,
      },
    ],
    totalCalories: 1626,
  },
  "п'ятниця": {
    dishes: [
      {
        id: "1",
        name: "Вівсянка з моло��ом, бананом та горішками",
        ingredients: "Овес 50г; Молоко 150мл; Банан 50г; Суміш горіхів 20г.",
        mealType: "Сніданок",
        time: "10:30",
        calories: 490,
        isActive: true,
      },
      {
        id: "2",
        name: "Сухофрукти і горішки",
        ingredients: "Сухофрукти 30г; Суміш горіхів 15г.",
        mealType: "Перекус",
        time: "13:00",
        calories: 175,
        isActive: false,
      },
      {
        id: "3",
        name: "Грепчка з котлетами з індички та овочами",
        ingredients: "Гречка 60г; Котлети з індички 180г; Вовочі 200г.",
        mealType: "Обід",
        time: "15:30",
        calories: 522,
        isActive: false,
      },
      {
        id: "4",
        name: "Морква з хумусом",
        ingredients: "Морква 100г; Хумус 40г.",
        mealType: "Перекус",
        time: "18:00",
        calories: 135,
        isActive: false,
      },
      {
        id: "5",
        name: "Овочеве рагу з квасолею та яйцем",
        ingredients: "Овочі 250г; Квасоля 100г; Варене яйце 1шт.",
        mealType: "Вечеря",
        time: "20:30",
        calories: 305,
        isActive: false,
      },
    ],
    totalCalories: 1627,
  },
  субота: {
    dishes: [
      {
        id: "1",
        name: "Тости з арахісовою пастою і яблуком",
        ingredients: "Хліб 2шт; Арахісова паста 20г; Яблуко 100г.",
        mealType: "Сніданок",
        time: "10:30",
        calories: 614,
        isActive: true,
      },
      {
        id: "2",
        name: "Банан і горішки",
        ingredients: "Банан 100г; Суміш горіхів 10г.",
        mealType: "Перекус",
        time: "13:00",
        calories: 150,
        isActive: false,
      },
      {
        id: "3",
        name: "Рис з курячим філе на грилі та броколі",
        ingredients: "Рис 60г; Курка 200г; Броколі 100г.",
        mealType: "Обід",
        time: "15:30",
        calories: 465,
        isActive: false,
      },
      {
        id: "4",
        name: "Протеїновий йогурт",
        ingredients: "Йогурт 170г.",
        mealType: "Перекус",
        time: "18:00",
        calories: 140,
        isActive: false,
      },
      {
        id: "5",
        name: "Курка з кабачками та помідорами",
        ingredients: "Куряче філе 200г; Кабачок 150г; Помідор 50г.",
        mealType: "Вечеря",
        time: "20:30",
        calories: 260,
        isActive: false,
      },
    ],
    totalCalories: 1629,
  },
  неділя: {
    dishes: [
      {
        id: "1",
        name: "Сирники з ягодами та джемом",
        ingredients: "Сирники 150г; Ягоди 100г.",
        mealType: "Сніданок",
        time: "10:30",
        calories: 363,
        isActive: true,
      },
      {
        id: "2",
        name: "Протеїновий шейк",
        ingredients: "Протеїн 30г; Молоко 250мл.",
        mealType: "Перекус",
        time: "13:00",
        calories: 245,
        isActive: false,
      },
      {
        id: "3",
        name: "Лаваш з куркою, сиром та овочами",
        ingredients: "Лаваш 1шт; Курка 100г; Сир 30г; Овочі 150г.",
        mealType: "Обід",
        time: "15:30",
        calories: 445,
        isActive: false,
      },
      {
        id: "4",
        name: "Суміш горіхів з яблуком",
        ingredients: "Горіхи 20г; Яблуко 150г.",
        mealType: "Перекус",
        time: "18:00",
        calories: 200,
        isActive: false,
      },
      {
        id: "5",
        name: "Зпечений баклажан з фаршем, сиром та моцарелою",
        ingredients:
          "Баклажан 200г; Фарш 100г; Овочі 100г; Сир 30г; Моцарела 40г.",
        mealType: "Вечеря",
        time: "20:30",
        calories: 470,
        isActive: false,
      },
    ],
    totalCalories: 1723,
  },
};

const DayTab = ({
  day,
  isActive,
  onClick,
}: {
  day: string;
  isActive: boolean;
  onClick: () => void;
}) => (
  <button
    data-day={day}
    onClick={onClick}
    className={`flex items-center gap-2 transition-colors duration-200 ${
      isActive ? "text-meal-primary" : "text-meal-secondary"
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
  onClick,
  mealState,
}: {
  dish: Dish;
  isExpanded: boolean;
  onClick: () => void;
  mealState: MealState;
}) => {
  const getCardStyles = () => {
    const baseClasses =
      "flex flex-col p-4 sm:p-6 rounded-2xl gap-4 sm:gap-16 w-full text-left transition-all duration-200 hover:opacity-90";

    console.log(`Meal: ${dish.name}, State: ${mealState}, Time: ${dish.time}`);

    switch (mealState) {
      case "past":
        return `${baseClasses} bg-white border border-black border-opacity-[0.08]`;
      case "current":
        return `${baseClasses}`;
      case "next":
        return `${baseClasses} bg-white border border-black border-opacity-[0.08]`;
      default:
        return `${baseClasses}`;
    }
  };

  const getNameStyles = () => {
    const baseClasses =
      "font-nunito text-xl font-extrabold uppercase leading-tight";

    switch (mealState) {
      case "past":
        if (isExpanded) {
          return `${baseClasses} text-black`;
        }
        return `${baseClasses} text-black text-opacity-30`;
      case "current":
        return `${baseClasses} text-black`;
      case "next":
        if (isExpanded) {
          return `${baseClasses} text-black`;
        }
        return `${baseClasses} text-black text-opacity-60`;
      default:
        return `${baseClasses} text-meal-secondary`;
    }
  };

  const getIngredientsStyles = () => {
    const baseClasses = "font-nunito text-base leading-normal";

    switch (mealState) {
      case "past":
        if (isExpanded) {
          return `${baseClasses} text-black text-opacity-60`;
        }
        return `${baseClasses} text-black text-opacity-30`;
      case "current":
        return `${baseClasses} text-black text-opacity-60`;
      case "next":
        if (isExpanded) {
          return `${baseClasses} text-black text-opacity-60`;
        }
        return `${baseClasses} text-black text-opacity-30`;
      default:
        return `${baseClasses} text-meal-secondary`;
    }
  };

  return (
    <button
      onClick={onClick}
      className={getCardStyles()}
      style={
        mealState === "current" ? { backgroundColor: "#F2F2F7" } : undefined
      }
    >
      <div className="flex flex-col gap-1">
        <h3 className={getNameStyles()}>{dish.name}</h3>
        <p className={getIngredientsStyles()}>{dish.ingredients}</p>
      </div>

      {isExpanded && dish.mealType && dish.time && dish.calories && (
        <div className="flex items-start gap-4 w-full">
          <div className="flex flex-col w-full">
            <span className="font-nunito text-base text-meal-secondary uppercase font-extrabold">
              {dish.mealType}
            </span>
            <span className="font-nunito text-base font-extrabold text-meal-accent uppercase">
              {dish.time}
            </span>
          </div>
          <div className="flex flex-col ml-auto w-full">
            <span className="font-nunito text-base text-meal-secondary text-right uppercase font-extrabold">
              калорії
            </span>
            <span className="font-nunito text-base font-extrabold text-meal-accent text-right uppercase">
              {dish.calories}
            </span>
          </div>
        </div>
      )}
    </button>
  );
};

const TotalCaloriesCard = ({ totalCalories }: { totalCalories: number }) => (
  <div className="flex items-center gap-4 p-6 rounded-2xl border border-meal-border bg-meal-background sm:justify-start sm:items-end">
    <span className="flex-1 font-nunito text-base font-extrabold text-meal-primary uppercase">
      усього калорій на день:
    </span>
    <span className="font-nunito text-base font-extrabold text-meal-accent text-right uppercase">
      {totalCalories} ккал
    </span>
  </div>
);

// Function to get current day of the week in Ukrainian
const getCurrentDayInUkrainian = (): string => {
  const dayNames = [
    "неділя", // Sunday - 0
    "понеділок", // Monday - 1
    "вівторок", // Tuesday - 2
    "середа", // Wednesday - 3
    "четвер", // Thursday - 4
    "п'ятниця", // Friday - 5
    "субота", // Saturday - 6
  ];

  const today = new Date();
  const dayIndex = today.getDay();
  return dayNames[dayIndex];
};

// Function to parse time string (e.g., "10:30") to minutes since midnight
const parseTimeToMinutes = (timeStr: string): number => {
  const [hours, minutes] = timeStr.split(":").map(Number);
  return hours * 60 + minutes;
};

// Function to get current time in minutes since midnight
const getCurrentTimeInMinutes = (): number => {
  const now = new Date();
  return now.getHours() * 60 + now.getMinutes();
};

// Function to determine meal state based on current time
type MealState = "past" | "current" | "next";

const getMealState = (
  dish: Dish,
  currentTimeMinutes: number,
  allDishes: Dish[],
): MealState => {
  if (!dish.time) return "next";

  const dishTimeMinutes = parseTimeToMinutes(dish.time);

  // Get all dishes with time, sorted by time
  const timedDishes = allDishes
    .filter((d) => d.time)
    .map((d) => ({ ...d, timeMinutes: parseTimeToMinutes(d.time!) }))
    .sort((a, b) => a.timeMinutes - b.timeMinutes);

  // Find the current dish index
  const currentDishIndex = timedDishes.findIndex((d) => d.id === dish.id);
  if (currentDishIndex === -1) return "next";

  // Get next meal time (or end of day if this is the last meal)
  const nextMealTime =
    currentDishIndex < timedDishes.length - 1
      ? timedDishes[currentDishIndex + 1].timeMinutes
      : 24 * 60; // End of day

  console.log(
    `Current time: ${Math.floor(currentTimeMinutes / 60)}:${String(currentTimeMinutes % 60).padStart(2, "0")}, Dish: ${dish.name} at ${dish.time}, Next meal at: ${Math.floor(nextMealTime / 60)}:${String(nextMealTime % 60).padStart(2, "0")}`,
  );

  // Determine state based on time ranges
  if (currentTimeMinutes < dishTimeMinutes) {
    return "next";
  } else if (
    currentTimeMinutes >= dishTimeMinutes &&
    currentTimeMinutes < nextMealTime
  ) {
    return "current";
  } else {
    return "past";
  }
};

// Function to find the most appropriate dish based on current time
const findCurrentMealByTime = (dishes: Dish[]): string | null => {
  const currentTimeMinutes = getCurrentTimeInMinutes();

  // Filter dishes that have time information
  const timedDishes = dishes
    .filter((dish) => dish.time)
    .map((dish) => ({
      ...dish,
      timeMinutes: parseTimeToMinutes(dish.time!),
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
  const [currentTimeMinutes, setCurrentTimeMinutes] = useState(
    getCurrentTimeInMinutes(),
  );
  const dayTabsRef = useRef<HTMLDivElement>(null);

  // Add error handling to prevent crashes
  const currentDayData = daysData[activeDay] || {
    dishes: [],
    totalCalories: 0,
  };

  // Set initial expanded dish when component mounts or day changes, based on current time
  useEffect(() => {
    const appropriateMealId = findCurrentMealByTime(currentDayData.dishes);
    setExpandedDishId(appropriateMealId);
  }, [activeDay, currentDayData.dishes]);

  // Scroll selected day into view when activeDay changes
  useEffect(() => {
    if (dayTabsRef.current) {
      const activeButton = dayTabsRef.current.querySelector(
        `[data-day="${activeDay}"]`,
      ) as HTMLElement;
      if (activeButton) {
        activeButton.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "start",
        });
      }
    }
  }, [activeDay]);

  // Real-time updates - check every minute for meal time changes
  useEffect(() => {
    const interval = setInterval(() => {
      const newCurrentTime = getCurrentTimeInMinutes();
      setCurrentTimeMinutes(newCurrentTime);

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
    "понеділок",
    "вівторок",
    "середа",
    "четвер",
    "п'ятниця",
    "субота",
    "неділя",
  ];

  return (
    <div className="min-h-screen bg-meal-background">
      <div className="flex justify-center px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8">
        <div className="w-full max-w-5xl">
          <div className="flex flex-col gap-6 sm:gap-8">
            {/* Day Tabs */}
            <div className="sticky top-0 z-10 bg-white pb-4 mb-2">
              <div className="flex items-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 overflow-x-auto scrollbar-hide justify-start pt-6 sm:pt-8">
                <div
                  ref={dayTabsRef}
                  className="flex items-center gap-3 sm:gap-4 md:gap-6 lg:gap-10 min-w-max"
                >
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
                {currentDayData.dishes.map((dish) => {
                  const mealState = getMealState(
                    dish,
                    currentTimeMinutes,
                    currentDayData.dishes,
                  );
                  return (
                    <DishCard
                      key={dish.id}
                      dish={dish}
                      isExpanded={expandedDishId === dish.id}
                      mealState={mealState}
                      onClick={() => {
                        // Toggle expanded state - collapse if already expanded, expand if collapsed
                        setExpandedDishId(
                          expandedDishId === dish.id ? null : dish.id,
                        );
                      }}
                    />
                  );
                })}

                {currentDayData.dishes.length === 0 && (
                  <div className="flex items-center justify-center p-12 text-meal-secondary">
                    <span className="font-nunito text-lg">
                      Немає страв на цей день
                    </span>
                  </div>
                )}
              </div>

              {currentDayData.totalCalories > 0 && (
                <TotalCaloriesCard
                  totalCalories={currentDayData.totalCalories}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
