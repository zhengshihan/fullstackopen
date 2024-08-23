import React from "react";

const PersonForm = ({
  onNameChange,
  onNumberChange,
  onAddClick,
  newNumber,
  newName,
}) => {
  return (
    <>
      <form>
        <div>
          name: <input value={newName} onChange={onNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={onNumberChange} />
        </div>
        <div>
          <button type="submit" onClick={onAddClick}>
            add
          </button>
        </div>
      </form>
    </>
  );
};

export default PersonForm;
