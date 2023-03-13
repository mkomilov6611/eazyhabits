const { Client } = require("@notionhq/client");
const { DateTime } = require("luxon");

// Initialize a new Notion API client
const notion = new Client({
  auth: process.env.NOTION_AUTH_KEY,
});

// Define the page ID where you want to add the daily habits and all checkbox block
const pageId = process.env.NOTION_PAGE_ID;

// this is to have children checkboxes with the corresponding habit name
function generateChildren(habits) {
  return habits.map((habitName) => {
    return {
      object: "block",
      type: "to_do",
      to_do: {
        rich_text: [
          {
            type: "text",
            text: {
              content: habitName,
            },
            annotations: {
              italic: true,
              color: "orange_background",
            },
          },
        ],
      },
    };
  });
}

// This is to add daily habits to our habit tracker product (Notion in our case)
// Will be run when starting the day
async function addHabits(habits) {
  const children = generateChildren(habits);

  while (true) {
    try {
      console.log("Updating notion");
      await notion.blocks.children.append({
        block_id: pageId,
        children: [
          {
            object: "block",
            type: "bulleted_list_item",
            bulleted_list_item: {
              rich_text: [
                {
                  type: "text",
                  text: {
                    content: DateTime.now().toISODate(),
                  },
                  annotations: {
                    bold: true,
                    italic: true,
                    color: "red",
                  },
                },
              ],
              children,
            },
          },
        ],
      });

      break;
    } catch (error) {
      console.log("Error when updating notion ", error);
      continue;
    }
  }
}

async function getHabitStatuses() {
  while (true) {
    try {
      // to search for our block, we can use the text, which is today ISO
      const blockText = DateTime.now().toISODate();

      const queryResponse = await notion.blocks.children.list({
        block_id: pageId,
        filter: {
          property: "object",
          value: "block",
        },
        query: blockText,
      });

      // the query of ours `blockText` is not very accurate for Notion, so it gets them all
      // like 2023-01-11 or 2023-01-12, so we have to double check the created time
      const todaysHabitsBlockID = queryResponse.results.find((result) =>
        result.created_time.includes(blockText)
      )?.id;

      const todaysHabits = await notion.blocks.children
        .list({
          block_id: todaysHabitsBlockID,
          page_size: 25,
        })
        .then((response) => response.results.map((habit) => habit.to_do));

      return todaysHabits;
    } catch (error) {
      console.log("Error when getting notion statusess", error);
      continue;
    }
  }
}

module.exports = {
  addHabits,
  getHabitStatuses,
};
