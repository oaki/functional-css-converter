import React from "react";
import Row from "./Row";

let rowId = 0;
export default class StyleEditor extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    this.addEmptyRow();
  }

  // Add handler
  addRow(property, value) {
    // Assemble data
    const row = {property: property, value: value, id: rowId++}
    // Update data
    this.state.data.push(row);
    // Update state
    this.setState({data: this.state.data});
  }

  // Handle remove
  handleRemoveRow = (id) => {
    // Filter all todos except the one to be removed
    const rows = this.state.data.filter((row) => {
      if (row.id !== id) return row;

      return false;
    });
    // Update state with filter
    this.setState({data: rows});
  }

  addEmptyRow = (event) => {
    if (event) {
      event.preventDefault();
    }

    this.addRow('', '');
  }

  handleOnChangeProperty = (id, property) => {
    this.edit(id, {property, value: ''});
  }

  handleOnChangeValue = (id, value) => {
    this.edit(id, {value});
  }

  handleOnChangeMedia = (id, valueToShow) => {
    this.edit(id, {valueToShow});
  }

  checkIfLastRowIsNotEmpty() {
    const data = this.state.data;

    if (!data[data.length - 1] || data[data.length - 1]['value'] !== '') {
      this.addEmptyRow();
    }
  }

  componentDidUpdate() {
    this.checkIfLastRowIsNotEmpty();
  }

  render() {

    const classesList = [];
    this.state.data.filter((row) => {
      return !!row.property && !!row.value
    }).forEach((row) => {
      this.props.cssManager.findClassName(classesList, row.property, row.value);
    })

    return (


      <div className="row pt-3">
        <div className="col-md-8">
          <span onClick={this.addEmptyRow}>style {String.fromCharCode(123)}</span>

          {this.state.data.map((rowData) => {
            return <Row key={rowData.id}
                        id={rowData.id}
                        showDeleteButton={!!rowData.property && !!rowData.value}
                        cssManager={this.props.cssManager}
                        propertyName={rowData.property}
                        value={rowData.value}
                        valueToShow={rowData.valueToShow}
                        classesList={classesList}
                        handleOnChangeProperty={this.handleOnChangeProperty}
                        handleOnChangeValue={this.handleOnChangeValue}
                        handleOnChangeMedia={this.handleOnChangeMedia}
                        handleRemoveRow={this.handleRemoveRow}
            />
          })}

          {String.fromCharCode(125)}

        </div>
        <div className="col-md-4">
          <div className="p-3">
            {classesList && classesList.length > 0 &&
            classesList.map((className, index) => {
              return <span key={index}>{className.classes.join(' ').replace('.', '')} </span>
            })
            }
          </div>
        </div>
      </div>

    )
  }


  edit(id, obj) {
    const data = this.state.data.map((row) => {
      if (row.id === id) {
        const newRow = {...row, ...obj};
        return newRow;
      }
      return row;
    });

    this.setState({
      data
    });
  }
}
