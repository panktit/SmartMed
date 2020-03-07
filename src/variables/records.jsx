const tasks = [
  {
    checked: true,
    text: 'Sign contract for "What are conference organizers afraid of?"'
  },
  {
    checked: false,
    text: "Lines From Great Russian Literature? Or E-mails From My Boss?"
  },
  {
    checked: true,
    text:
      "Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit"
  }
];

// ##############################
// // // table head data and table body data for Tables view
// #############################

const thead = ["Hash",""];
const tbody = [
  {
    className: "table-success",
    data: ["Dakota Rice",""]
  },
  {
    className: "",
    data: ["Minerva Hooper",""]
  },
  {
    className: "table-info",
    data: ["Sage Rodriguez",""]
  },
  {
    className: "",
    data: ["Philip Chaney",""]
  },
  {
    className: "table-danger",
    data: ["Doris Greene",""]
  },
  { className: "", data: ["Mason Porter",""] },
  {
    className: "table-warning",
    data: ["Jon Porter",""]
  }
];

// tasks list for Tasks card in Dashboard view
// data for <thead> of table in TableList view
// data for <tbody> of table in TableList view
export { tasks, thead, tbody };
