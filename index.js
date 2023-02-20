const { DateTime } = require("luxon");
const fs = require("fs");

const habitsJson = fs.readFileSync(__dirname + "/habitStore.json");
const habitsObj = JSON.parse(habitsJson);

function printAllCurrentHabits() {
  console.log("\n-------------------- Welcome Back! 😀 -------------------");
  console.log("----------- Showing todays habits and all! 📅 -----------\n");

  Object.keys(habitsObj).forEach((habitArea) => {
    const currentHabit = habitsObj[habitArea].find(
      (habit) =>
        DateTime.fromISO(habit.dateFrom) < DateTime.now() &&
        DateTime.fromISO(habit.dateTo) > DateTime.now()
    );

    console.log(`\n${habitArea} Habits 🍉: `, currentHabit.habits);

    // this is to make it more attractive, self prizes after some tokens collected
    // ONE SUCCESSFULL DAY = ONE TOKEN
    console.log("Tokens Collected 💰: ", currentHabit.tokensCollected);

    // console.log("Your Next Prize: ", currentHabit.allPrizes[currentHabit.prizeIndex].tokensNeeded);

    // if (currentHabit.tokensCollected === currentHabit.nextPrizeTokens) {
    //   console.log(`Good job man! Now enjoy your ${currentHabit.allPrizes[currentHabit.prizeIndex]}!`);
    //   currentHabit.nextPrize =
    // }
  });

  console.log("\n----------- Have a good one! ⚽ -----------\n");
}

// This is to show the daily todos, so dont have to think about it ages
printAllCurrentHabits();
