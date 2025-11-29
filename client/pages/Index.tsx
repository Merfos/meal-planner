import { useState, useEffect, useRef, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Repeat, Dices, Info, X } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { Dish, DayData, daysData } from "@/data/meals";

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
    className={`flex items-center gap-2 transition-colors duration-200 ${isActive ? "text-meal-primary" : "text-meal-secondary"
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
  onSwapClick,
  onRandomizeClick,
  onInfoClick,
  mealState,
}: {
  dish: Dish;
  isExpanded: boolean;
  onClick: () => void;
  onSwapClick: () => void;
  onRandomizeClick: () => void;
  onInfoClick: () => void;
  mealState: MealState;
}) => {
  const getCardStyles = () => {
    const baseClasses =
      "flex flex-col p-4 sm:p-6 rounded-3xl gap-1 w-full text-left transition-all duration-200 hover:opacity-90";

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
      {(mealState === "current" || isExpanded) && (
        <div className="flex items-start justify-between w-full">
          <span className="font-nunito text-base text-meal-secondary uppercase font-extrabold">
            {dish.mealType}
          </span>
          <span className="font-nunito text-base font-extrabold text-meal-accent uppercase">
            {dish.time}
          </span>
        </div>
      )}

      <div className="flex flex-col gap-1 w-full">
        <h3 className={getNameStyles()}>{dish.name}</h3>
      </div>

      {isExpanded && (
        <div className="flex items-center justify-between w-full gap-4 mt-6">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSwapClick(); // Trigger swap action passed from parent
            }}
            className="flex items-center justify-center w-full h-12 bg-white rounded-[20px] hover:bg-gray-50 transition-colors border border-[#EBEBEB]"
          >
            <Repeat className="w-5 h-5 text-black" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRandomizeClick();
            }}
            className="flex items-center justify-center w-full h-12 bg-white rounded-[20px] hover:bg-gray-50 transition-colors border border-[#EBEBEB]"
          >
            <Dices className="w-5 h-5 text-black" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onInfoClick();
            }}
            className="flex items-center justify-center w-full h-12 bg-white rounded-[20px] hover:bg-gray-50 transition-colors border border-[#EBEBEB]"
          >
            <Info className="w-5 h-5 text-black" />
          </button>
        </div>
      )}
    </button>
  );
};

const TotalCaloriesCard = ({ totalCalories }: { totalCalories: number }) => (
  <div className="flex items-center gap-4 p-6 rounded-3xl border border-meal-border bg-meal-background sm:justify-start sm:items-end">
    <span className="flex-1 font-nunito text-base font-extrabold text-meal-primary uppercase">
      усього:
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

// Function to get unique meals by type from all days
const getUniqueMealsByType = (
  mealType: string,
  allDaysData: Record<string, DayData>,
): Dish[] => {
  const allDishes: Dish[] = [];
  const seenIds = new Set<string>();

  Object.values(allDaysData).forEach((dayData) => {
    dayData.dishes.forEach((dish) => {
      if (
        dish.mealType === mealType &&
        !seenIds.has(dish.name) // Using name as unique identifier since IDs might be reused per day
      ) {
        seenIds.add(dish.name);
        allDishes.push(dish);
      }
    });
  });

  return allDishes;
};



export default function Index() {
  const [activeDay, setActiveDay] = useState(getCurrentDayInUkrainian());
  const [daysDataState, setDaysDataState] = useState(() => {
    const saved = localStorage.getItem("MEAL_PLAN_DATA");
    if (saved) {
      try {
        const parsedSaved = JSON.parse(saved);
        // Merge saved data with static data to ensure new fields (like recipe) are present
        const mergedData = { ...daysData };

        Object.keys(mergedData).forEach(day => {
          if (parsedSaved[day]) {
            mergedData[day] = {
              ...mergedData[day],
              dishes: mergedData[day].dishes.map((staticDish, index) => {
                const savedDish = parsedSaved[day].dishes.find((d: Dish) => d.id === staticDish.id);
                if (savedDish) {
                  // Keep user-specific state (isActive, maybe name if swapped) but ensure static content (recipe, macros) is up to date
                  // If the dish name matches, we assume it's the same dish and we should update its static properties
                  if (savedDish.name === staticDish.name) {
                    return {
                      ...savedDish,
                      recipe: staticDish.recipe,
                      macros: staticDish.macros,
                      ingredients: staticDish.ingredients // Ensure ingredients are also up to date
                    };
                  }
                  // If names don't match, it means the user swapped the dish. 
                  // In this case, we keep the saved dish as is, BUT we should try to find the recipe for this swapped dish from our static data if possible.
                  // For now, let's just keep the saved dish. If it's a swapped dish, it might not have a recipe unless we look it up.
                  return savedDish;
                }
                return staticDish;
              }),
              totalCalories: parsedSaved[day].totalCalories // Keep the calculated calories
            };
          }
        });
        return mergedData;
      } catch (e) {
        console.error("Failed to parse saved meal plan", e);
      }
    }
    return daysData;
  });
  const [expandedDishIds, setExpandedDishIds] = useState<string[]>([]);
  const [currentTimeMinutes, setCurrentTimeMinutes] = useState(
    getCurrentTimeInMinutes(),
  );
  const [swapDish, setSwapDish] = useState<Dish | null>(null);
  const [infoDish, setInfoDish] = useState<Dish | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isInfoDrawerOpen, setIsInfoDrawerOpen] = useState(false);
  const dayTabsRef = useRef<HTMLDivElement>(null);

  // Add error handling to prevent crashes
  const currentDayData = daysDataState[activeDay] || {
    dishes: [],
    totalCalories: 0,
  };

  // Set initial expanded dish when component mounts or day changes, based on current time
  useEffect(() => {
    const appropriateMealId = findCurrentMealByTime(currentDayData.dishes);
    // Reset to only show current meal when day changes (collapse manually expanded cards)
    setExpandedDishIds(appropriateMealId ? [appropriateMealId] : []);
  }, [activeDay, currentDayData.dishes]);

  // Save to local storage whenever data changes
  useEffect(() => {
    localStorage.setItem("MEAL_PLAN_DATA", JSON.stringify(daysDataState));
  }, [daysDataState]);

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
        if (appropriateMealId && !expandedDishIds.includes(appropriateMealId)) {
          setExpandedDishIds([...expandedDishIds, appropriateMealId]);
        }
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

  // Embla Carousel setup
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  // Sync active day with carousel slide
  useEffect(() => {
    if (emblaApi) {
      const onSelect = () => {
        const index = emblaApi.selectedScrollSnap();
        setActiveDay(days[index]);
      };
      emblaApi.on("select", onSelect);
      // Initial sync
      const currentIndex = days.indexOf(activeDay);
      if (emblaApi.selectedScrollSnap() !== currentIndex) {
        emblaApi.scrollTo(currentIndex);
      }
      return () => {
        emblaApi.off("select", onSelect);
      };
    }
  }, [emblaApi, days]); // Removed activeDay from dependency to avoid loop

  // Sync carousel with active day (when tab clicked)
  useEffect(() => {
    if (emblaApi) {
      const currentIndex = days.indexOf(activeDay);
      if (emblaApi.selectedScrollSnap() !== currentIndex) {
        emblaApi.scrollTo(currentIndex);
      }
    }
  }, [activeDay, emblaApi, days]);

  return (
    <div className="h-screen bg-meal-background flex flex-col">
      <div className="flex justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-5xl">
          <div className="flex flex-col h-screen">
            {/* Day Tabs */}
            <div className="sticky top-0 z-10 bg-white pb-4 mb-4">
              <div className="flex items-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 overflow-x-auto scrollbar-hide justify-start pt-6 sm:pt-8">
                <div
                  ref={dayTabsRef}
                  className="flex items-center gap-6 sm:gap-6 md:gap-6 lg:gap-6 min-w-max"
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

            {/* Carousel Container */}
            <div className="overflow-hidden flex-1" ref={emblaRef}>
              <div className="flex">
                {days.map((day) => {
                  const dayData = daysDataState[day] || { dishes: [], totalCalories: 0 };
                  return (
                    <div key={day} className="flex-[0_0_100%] min-w-0 px-2">
                      <div className="flex flex-col gap-6 overflow-y-auto h-full pb-6">
                        <div className="flex flex-col gap-4">
                          {dayData.dishes.map((dish) => {
                            const mealState = getMealState(
                              dish,
                              currentTimeMinutes,
                              dayData.dishes,
                            );
                            return (
                              <DishCard
                                key={dish.id}
                                dish={dish}
                                isExpanded={expandedDishIds.includes(dish.id)}
                                mealState={mealState}
                                onClick={() => {
                                  const currentMealId = findCurrentMealByTime(dayData.dishes);

                                  if (expandedDishIds.includes(dish.id)) {
                                    // Don't collapse if it's the current meal
                                    if (dish.id !== currentMealId) {
                                      setExpandedDishIds(expandedDishIds.filter(id => id !== dish.id));
                                    }
                                  } else {
                                    // When expanding a new card, keep only current meal + this new card
                                    const newExpanded = currentMealId
                                      ? [currentMealId, dish.id]
                                      : [dish.id];
                                    setExpandedDishIds(newExpanded);
                                  }
                                }}
                                onSwapClick={() => {
                                  setSwapDish(dish);
                                  setIsDrawerOpen(true);
                                }}
                                onRandomizeClick={() => {
                                  const candidates = getUniqueMealsByType(dish.mealType || "", daysDataState)
                                    .filter(d => d.name !== dish.name);

                                  if (candidates.length > 0) {
                                    const randomDish = candidates[Math.floor(Math.random() * candidates.length)];

                                    setDaysDataState((prev) => {
                                      const newDaysData = { ...prev };
                                      const dayDishes = [...newDaysData[day].dishes]; // Use 'day' from map
                                      const dishIndex = dayDishes.findIndex(d => d.id === dish.id);

                                      if (dishIndex !== -1) {
                                        dayDishes[dishIndex] = {
                                          ...dayDishes[dishIndex],
                                          name: randomDish.name,
                                          ingredients: randomDish.ingredients,
                                          calories: randomDish.calories,
                                        };

                                        newDaysData[day] = {
                                          ...newDaysData[day],
                                          dishes: dayDishes,
                                          totalCalories: dayDishes.reduce((sum, d) => sum + (d.calories || 0), 0)
                                        };
                                      }
                                      return newDaysData;
                                    });
                                  }
                                }}
                                onInfoClick={() => {
                                  setInfoDish(dish);
                                  setIsInfoDrawerOpen(true);
                                }}
                              />
                            );
                          })}

                          {dayData.dishes.length === 0 && (
                            <div className="flex items-center justify-center p-12 text-meal-secondary">
                              <span className="font-nunito text-lg">
                                Немає страв на цей день
                              </span>
                            </div>
                          )}
                        </div>

                        {dayData.totalCalories > 0 && (
                          <TotalCaloriesCard
                            totalCalories={dayData.totalCalories}
                          />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent className="h-[85vh] rounded-t-[20px]" showHandle={false}>
          <DrawerHeader className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <DrawerTitle className="font-nunito text-xl font-extrabold text-meal-secondary uppercase">
              {swapDish?.mealType || "Страви"}
            </DrawerTitle>
            <DrawerClose asChild>
              <button className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                <X className="w-4 h-4 text-black" />
              </button>
            </DrawerClose>
          </DrawerHeader>
          <div className="flex-1 overflow-y-auto p-4 sm:p-6">
            <div className="flex flex-col gap-4">
              {swapDish &&
                getUniqueMealsByType(swapDish.mealType || "", daysDataState)
                  .sort((a, b) => {
                    // Put parent meal at the top
                    if (a.name === swapDish.name) return -1;
                    if (b.name === swapDish.name) return 1;
                    return 0;
                  })
                  .map(
                    (dish, index) => (
                      <button
                        key={`${dish.name}-${index}`}
                        className={`flex flex-col p-4 rounded-2xl border text-left transition-all active:scale-[0.99] ${dish.name === swapDish.name
                          ? 'border-transparent bg-[#f2f2f7]'
                          : 'border-gray-100 bg-white hover:border-meal-accent/50 active:bg-gray-50'
                          }`}
                        onClick={() => {
                          if (swapDish) {
                            setDaysDataState((prev) => {
                              const newDaysData = { ...prev };
                              const dayDishes = [...newDaysData[activeDay].dishes];

                              // Find index of the dish being swapped
                              const swapIndex = dayDishes.findIndex(d => d.id === swapDish.id);

                              if (swapIndex !== -1) {
                                // Create new dish with properties from selected dish but keep time/type from original slot
                                dayDishes[swapIndex] = {
                                  ...dayDishes[swapIndex],
                                  name: dish.name,
                                  ingredients: dish.ingredients,
                                  calories: dish.calories,
                                  // Keep original ID, time, mealType, isActive
                                };

                                // Recalculate total calories
                                newDaysData[activeDay] = {
                                  ...newDaysData[activeDay],
                                  dishes: dayDishes,
                                  totalCalories: dayDishes.reduce((sum, d) => sum + (d.calories || 0), 0)
                                };
                              }

                              return newDaysData;
                            });

                            setIsDrawerOpen(false);
                            setSwapDish(null);
                          }
                        }}
                      >
                        <div className="flex items-start justify-between w-full mb-1">
                          <span className="font-nunito text-base font-extrabold text-meal-secondary uppercase">
                            калорії
                          </span>
                          <span className="font-nunito text-base font-extrabold text-meal-accent">
                            {dish.calories}
                          </span>
                        </div>
                        <div className="flex flex-col gap-1">
                          <h3 className="font-nunito text-lg font-extrabold text-black uppercase leading-tight mb-1">
                            {dish.name}
                          </h3>
                        </div>
                      </button>
                    )
                  )}
            </div>
          </div>
        </DrawerContent>
      </Drawer>

      <Drawer open={isInfoDrawerOpen} onOpenChange={setIsInfoDrawerOpen}>
        <DrawerContent className="h-[90vh] rounded-t-[20px]" showHandle={false}>
          <DrawerHeader className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <DrawerTitle className="font-nunito text-xl font-extrabold text-meal-secondary uppercase">
              Інформація
            </DrawerTitle>
            <DrawerClose asChild>
              <button className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                <X className="w-4 h-4 text-black" />
              </button>
            </DrawerClose>
          </DrawerHeader>
          {infoDish && (
            <div className="flex-1 overflow-y-auto p-6">
              <div className="flex flex-col gap-6">
                <h2 className="font-nunito text-2xl font-black uppercase leading-tight">
                  {infoDish.name}
                </h2>

                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="font-nunito text-base font-extrabold text-meal-secondary uppercase">
                      {infoDish.mealType}
                    </span>
                    <span className="font-nunito text-base font-extrabold text-meal-accent">
                      {infoDish.macros ? `${infoDish.macros.protein}/${infoDish.macros.fat}/${infoDish.macros.carbs}` : "000/000/000"}
                    </span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="font-nunito text-base font-extrabold text-meal-secondary uppercase">
                      калорії
                    </span>
                    <span className="font-nunito text-base font-extrabold text-meal-accent">
                      {infoDish.calories}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <h3 className="font-nunito text-lg font-extrabold text-meal-secondary uppercase">
                    ІНГРЕДІЄНТИ
                  </h3>
                  <div className="flex flex-col gap-0">
                    {infoDish.ingredients.split(";").map((ingredient, index) => {
                      const trimmed = ingredient.trim();
                      if (!trimmed) return null;
                      return (
                        <span key={index} className="font-nunito text-base font-bold uppercase">
                          {trimmed.endsWith(".") ? trimmed : `${trimmed};`}
                        </span>
                      );
                    })}
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <h3 className="font-nunito text-lg font-extrabold text-meal-secondary uppercase">
                    РЕЦЕПТ
                  </h3>
                  <div className="flex flex-col gap-4">
                    {infoDish.recipe && infoDish.recipe.length > 0 ? (
                      infoDish.recipe.map((step, index) => (
                        <p key={index} className="font-nunito text-base font-bold leading-relaxed">
                          {step}
                        </p>
                      ))
                    ) : (
                      <p className="font-nunito text-base font-bold leading-relaxed text-meal-secondary">
                        Рецепт ще не додано.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </DrawerContent>
      </Drawer>
    </div >
  );
}
