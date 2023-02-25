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
}

module.exports = {
  addHabits,
};
