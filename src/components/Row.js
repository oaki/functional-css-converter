import React from 'react';
import Input from './Input';

export default class Row extends React.Component {

  constructor(props) {
    super(props);

    this.allClassProperties = props.cssManager.getAllClassProperties();
  }

  handleOnChangeProperty = (values) => {
    this.refInputWithPropertyValue._typeahead.getInstance().clear();
    this.props.handleOnChangeProperty(this.props.id, values.join(''));
  }

  handleOnChangeValue = (values) => {
    this.props.handleOnChangeValue(this.props.id, values.join(''));
  }

  render() {

    const propertyValues = this.props.cssManager.findPropertyValues(this.props.propertyName);
    const item = this.props.classesList.find((i) => {
      return i.property === this.props.propertyName && i.value === this.props.value
    })
    return (
      <div className="row">
        <div className="col padding-bottom">

          <div className="float-left ">
            <Input value={this.props.propertyName} options={this.allClassProperties}
                   onChange={this.handleOnChangeProperty}/>
          </div>
          <div className="float-left style-editor__padding">
            :
          </div>
          <div className="float-left ">
            <Input ref={(ref) => this.refInputWithPropertyValue = ref} value={this.props.value}
                   options={propertyValues} onChange={this.handleOnChangeValue}/>
          </div>
          <div className="float-left style-editor__padding">
            {this.props.showDeleteButton && (
              <button tabIndex="-1" type="button" className="close" aria-label="Close" onClick={() => {
                this.props.handleRemoveRow(this.props.id)
              }}>
                <span aria-hidden="true">&times;</span>
              </button>
            )}
          </div>

          <div className="float-left style-editor__padding">
            <small className="text-muted">{item && item.classes.join(' ')}</small>
          </div>
        </div>
      </div>
    )
  }
}
