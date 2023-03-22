const { DateTime } = require("luxon");
const fs = require("fs");
const notionService = require("../notion");

function printHabits(habitsObj) {
  console.log("\n-------------------- Welcome Back! 😀 -------------------");
  console.log("----------- Showing todays habits and all! 📅 -----------");

  Object.keys(habitsObj).forEach((habitArea) => {
    const currentHabit = getCurrentHabit(habitsObj[habitArea]);

    console.log(`\n--------------- ${habitArea} Habits 🍉: ---------------\n`);
    currentHabit.habits.forEach((habit) => {
      console.log(`${habit}`);
    });
    // this is to make it more attractive, self prizes after some tokens collected - ONE SUCCESSFULL DAY = ONE TOKEN
    console.log("\nTokens Collected 💰: ", currentHabit.tokensCollected);

    // show the prize if there is
    const applicablePrize = currentHabit.prizes.find(
      (prize) =>
        Number(prize.tokensRequired) <= Number(currentHabit.tokensCollected) &&
        prize.isGiven === String(false)
    );

    if (applicablePrize) {
      console.log("HooRayyy - you gote the prize!!! ", applicablePrize.name);
    }
  });

  console.log("\n----------- Have a good one! ⚽ -----------\n");
}

function getCurrentHabit(habits) {
  return habits.find(
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
  return Object.keys(habitsObj)
    .flatMap((habitArea) => {
      return getCurrentHabit(habitsObj[habitArea]).habits;
    })
    .sort();
}

function addTokensForToday() {
  const habitsObj = getRawHabitsObj();

  const updatedHabitsObj = Object.values(habitsObj).map((habitArea) => {
    return habitArea.map((habit) => {
      const isCurrentHabit =
        DateTime.fromISO(habit.dateFrom) < DateTime.now() &&
        DateTime.fromISO(habit.dateTo) > DateTime.now();

      if (isCurrentHabit) {
        habit.tokensCollected = Number(habit.tokensCollected) + 1;
      }

      return habit;
    });
  });

  // pretty write to the file
  fs.writeFileSync(
    __dirname + "/habitStore.json",
    JSON.stringify(updatedHabitsObj, null, 2)
  );
}

//Checks the habit statuses, informs the user about unfinished habits, and checks if the TOKEN can be added for today
function analyzeStatuses(habitStatuses) {
  const unfinishedHabits = habitStatuses
    .filter((hStatus) => !hStatus.checked)
    .map((hStatus) => hStatus.rich_text[0].plain_text);

  // some stuff are not finished, and we cant close the day
  if (unfinishedHabits.length) {
    console.log(
      "Please do the following items before finishing the day!",
      unfinishedHabits
    );
    return;
  }

  addTokensForToday();
}

async function startDay() {
  // This is to show the daily todos, so dont have to think about it ages
  printHabits(getRawHabitsObj());
  // update the notion page with our to-do habits
  await notionService.addHabits(getAllCurrentHabits());
}

async function endDay() {
  // We can print the habits statuses, fetch it from Notion
  const habitStatuses = await notionService.getHabitStatuses();

  // * cool stuff *
  analyzeStatuses(habitStatuses);
}

module.exports = {
  startDay,
  endDay,
};
