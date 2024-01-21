// tableService.js
const Table = require("../models/table");

const updateTableStatus = async (tableId, currentStatus, newStatus) => {
  const filter = {
    tableId: tableId,
    status: currentStatus,
  };
  const update = { status: newStatus };
  const updatedTable = await Table.findOneAndUpdate(filter, update, {
    new: true,
  });
  console.log({ updatedTable });
  return updatedTable;
};

// const enterTable = async (tableId, password) => {
//   const filter = {
//     tableId: tableId,
//     password: password,
//   };
//   const update = { status: "OCCUPIED" };
//   await Table.findOneAndUpdate(filter, update).then((docs) => {
//     return docs;
//   });
// };
const enterTable = async (tableId, password) => {
  const filter = {
    tableId: tableId,
    password: password,
  };
  const update = { status: "OCCUPIED" };
  // Add { new: true } option to get the updated document
  const updatedTable = await Table.findOneAndUpdate(filter, update, {
    new: true,
  });
  console.log({ updatedTable });
  return updatedTable; // Return the updated table
};

const enterTableMultiUsers = async (tableId, password) => {
  // Check the current status of the table
  const currentTable = await Table.findOne({
    tableId: tableId,
    password: password,
  });

  if (!currentTable) {
    throw new Error("Table not found with the provided credentials");
  }

  if (currentTable.status === "OCCUPIED") {
    currentTable.multiUser = true;
    console.log({ currentTable });
    return currentTable;
  }

  // If the table is not occupied, proceed with the update
  const filter = {
    tableId: tableId,
    password: password,
  };
  const update = { status: "OCCUPIED" };

  try {
    const updatedTable = await Table.findOneAndUpdate(filter, update, {
      new: true,
    });
    currentTable.multiUser = false;
    console.log({ updatedTable });
    return updatedTable;
  } catch (error) {
    console.error("Error updating table:", error);
    throw error; // Rethrow the error to handle it further up the call stack
  }
};

module.exports = { updateTableStatus, enterTable, enterTableMultiUsers };
