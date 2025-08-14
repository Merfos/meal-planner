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
        name: 'Куряче філе на грилі з рисом та броколі',
        ingredients: 'Курка 200г; Рис 60г; ��роколі 100г.',
        isActive: false
      },
      {
        id: '4',
        name: 'Протеїновий йогурт',
        ingredients: 'Йогурт Хг.',
        isActive: false
      },
      {
        id: '5',
        name: 'Омлет з овочами та салатом',
        ingredients: 'Яйця 2шт; Хумус 40г; Хліб 2шт; Салат 50г.',
        isActive: false
      }
    ],
    totalCalories: 1668
  },
  вівторок: { dishes: [], totalCalories: 0 },
  середа: { dishes: [], totalCalories: 0 },
  четвер: { dishes: [], totalCalories: 0 },
  'п\'ятниця': { dishes: [], totalCalories: 0 },
  субота: { dishes: [], totalCalories: 0 },
  неділя: { dishes: [], totalCalories: 0 }
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
    <span className="font-sf-compact text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold uppercase leading-none">
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
        font-sf-compact text-base sm:text-lg md:text-xl lg:text-2xl font-bold uppercase leading-tight
        ${isExpanded ? 'text-meal-primary' : 'text-meal-secondary'}
      `}>
        {dish.name}
      </h3>
      <p className="font-sf-compact text-sm sm:text-base text-meal-secondary leading-normal">
        {dish.ingredients}
      </p>
    </div>

    {isExpanded && dish.mealType && dish.time && dish.calories && (
      <div className="flex items-start gap-4">
        <div className="flex flex-col">
          <span className="font-sf-compact text-sm sm:text-base text-meal-secondary uppercase font-semibold">
            {dish.mealType}
          </span>
          <span className="font-sf-mono text-sm sm:text-base font-bold text-meal-accent uppercase">
            {dish.time}
          </span>
        </div>
        <div className="flex flex-col ml-auto">
          <span className="font-sf-compact text-sm sm:text-base text-meal-secondary text-right uppercase font-semibold">
            калорії
          </span>
          <span className="font-sf-mono text-sm sm:text-base font-bold text-meal-accent text-right uppercase">
            {dish.calories}
          </span>
        </div>
      </div>
    )}
  </button>
);

const TotalCaloriesCard = ({ totalCalories }: { totalCalories: number }) => (
  <div className="flex items-center gap-4 p-6 rounded-2xl border border-meal-border bg-meal-background">
    <span className="flex-1 font-sf-compact text-sm sm:text-base font-bold text-meal-primary uppercase">
      усього калорій на день:
    </span>
    <span className="font-sf-compact text-sm sm:text-base font-bold text-meal-accent text-right uppercase">
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

export default function Index() {
  const [activeDay, setActiveDay] = useState(getCurrentDayInUkrainian());
  const [expandedDishId, setExpandedDishId] = useState<string | null>(null);

  // Add error handling to prevent crashes
  const currentDayData = daysData[activeDay] || { dishes: [], totalCalories: 0 };

  // Set initial expanded dish when component mounts or day changes
  useEffect(() => {
    if (currentDayData.dishes.length > 0) {
      setExpandedDishId(currentDayData.dishes[0].id);
    } else {
      setExpandedDishId(null);
    }
  }, [activeDay]);

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
          <div className="flex flex-col gap-8 sm:gap-12">
            {/* Day Tabs */}
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 overflow-x-auto scrollbar-hide pb-2">
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
                    <span className="font-sf-compact text-lg">Н��має страв на цей день</span>
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
