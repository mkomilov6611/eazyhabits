// This is the sample storage for actual `habitStore.js` file

const { DateTime } = require("luxon");

module.exports = {
  programming: [
    {
      level: 1,
      dateFrom: DateTime.fromISO("2023-02-19"),
      dateTo: DateTime.fromISO("2023-03-19"),
      data: ["LeetCode", "Medium"],
    },
    {
      level: 2,
      dateFrom: DateTime.fromISO("2023-03-20"),
      dateTo: DateTime.fromISO("2023-04-20"),
      data: ["LeetCode Medium", "Medium 2 articles"],
    },
    {
      level: 3,
      dateFrom: DateTime.fromISO("2023-04-21"),
      dateTo: DateTime.fromISO("2023-05-21"),
      data: ["LeetCode Hard", "Medium: write article"],
    },
  ],
  rich: [
    {
      level: 1,
      dateFrom: DateTime.fromISO("2023-02-19"),
      dateTo: DateTime.fromISO("2023-03-19"),
      data: ["Rich"],
    },
    {
      level: 2,
      dateFrom: DateTime.fromISO("2023-03-20"),
      dateTo: DateTime.fromISO("2023-04-20"),
    },
    {
      level: 3,
      dateFrom: DateTime.fromISO("2023-04-21"),
      dateTo: DateTime.fromISO("2023-05-21"),
    },
  ],
  health: [
    {
      level: 1,
      dateFrom: DateTime.fromISO("2023-02-19"),
      dateTo: DateTime.fromISO("2023-03-19"),
      data: ["HEALTH"],
    },
    {
      level: 2,
      dateFrom: DateTime.fromISO("2023-03-20"),
      dateTo: DateTime.fromISO("2023-04-20"),
    },
    {
      level: 3,
      dateFrom: DateTime.fromISO("2023-04-21"),
      dateTo: DateTime.fromISO("2023-05-21"),
    },
  ],
  effective: [
    {
      level: 1,
      dateFrom: DateTime.fromISO("2023-02-19"),
      dateTo: DateTime.fromISO("2023-03-19"),
      data: ["EFFECTIVE"],
    },
    {
      level: 2,
      dateFrom: DateTime.fromISO("2023-03-20"),
      dateTo: DateTime.fromISO("2023-04-20"),
    },
    {
      level: 3,
      dateFrom: DateTime.fromISO("2023-04-21"),
      dateTo: DateTime.fromISO("2023-05-21"),
    },
  ],
};
