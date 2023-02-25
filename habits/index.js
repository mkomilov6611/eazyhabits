const { DateTime } = require("luxon");
const fs = require("fs");
const notionService = require("../notion");

function printHabits(habitsObj) {
  console.log("\n-------------------- Welcome Back! 😀 -------------------");
  console.log("----------- Showing todays habits and all! 📅 -----------\n");

  Object.keys(habitsObj).forEach((habitArea) => {
    const currentHabit = getCurrentHabit(habitsObj[habitArea]);

    console.log(`\n${habitArea} Habits 🍉: `, currentHabit.habits);
    // this is to make it more attractive, self prizes after some tokens collected
    // ONE SUCCESSFULL DAY = ONE TOKEN
    console.log("Tokens Collected 💰: ", currentHabit.tokensCollected);
  });

  console.log("\n----------- Have a good one! ⚽ -----------\n");
}

function getCurrentHabit(allHabits) {
  return allHabits.find(
    (habit) =>
      DateTime.fromISO(habit.dateFrom) < DateTime.now() &&
      DateTime.fromISO(habit.dateTo) > DateTime.now()
  );
}

// Sometimes we need raw habits object (not normalized)
function getRawHabitsObj() {
  const habitsJson = fs.readFileSync(__dirname + "/habitStore.json");
  const habitsObj = JSON.parse(habitsJson);

  return habitsObj;
}

// List of current habits only, no extra stuff
function getAllCurrentHabits() {
  const habitsObj = getRawHabitsObj();

  return Object.keys(habitsObj).flatMap((habitArea) => {
    return getCurrentHabit(habitsObj[habitArea]).habits;
  });
}

function startDay() {
  // This is to show the daily todos, so dont have to think about it ages
  printHabits(getRawHabitsObj());

  // update the notion page with our to-do habits
  notionService.addHabits(getAllCurrentHabits());
}

function endDay() {
  // We can print the habits statuses, fetch it from Notion
  // Tokens added
  // Prizes if achieved
}

module.exports = {
  startDay,
  endDay,
};
