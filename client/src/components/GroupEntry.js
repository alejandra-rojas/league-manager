import React from "react";

function GroupEntry({ group }) {
  console.log(group);
  return (
    <div className="bg-gray-300 p-3 mb-2 flex justify-between items-center">
      <h3>{group.event_name}</h3>
      <div className="flex gap-3">
        <button>Edit</button>
        <p className="p-1 border">+</p>
      </div>
    </div>
  );
}

export default GroupEntry;
