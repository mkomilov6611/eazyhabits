const { DateTime } = require("luxon");
const habitStore = require("./habitStore");

function getAllHabits() {
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

console.log(getAllHabits());
