import React from "react";
import "./CheckboxGroup.css";

function CheckboxGroup({ title, items, selectedItems, onChange, show }) {
  if (!show) {
    return null;
  }

  return (
    <div className="checkbox-group">
      <p>{title}</p>
      <div>
        {items.map((item) => (
          <label key={item}>
            <input
              type="checkbox"
              value={item}
              checked={selectedItems.includes(item)}
              onChange={onChange}
            />
            {item}
          </label>
        ))}
      </div>
    </div>
  );
}

export default CheckboxGroup;
