const { DateTime } = require("luxon");
const habitStore = require("./habitStore");

function getAllCurrentHabits() {
  const allCurrentHabits = {};

  Object.keys(habitStore).forEach((habitArea) => {
    const [currentHabit] = habitStore[habitArea].filter(
      (habit) =>
        habit.dateFrom < DateTime.now() && habit.dateTo > DateTime.now()
    );

    allCurrentHabits[habitArea] = currentHabit.data;
  });

  return allCurrentHabits;
}

// This is to show the daily todos, so dont have to think about it ages
console.log(getAllCurrentHabits());
