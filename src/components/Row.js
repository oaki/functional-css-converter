import React from "react";
import Input from "./Input";
import CssManager from "../CssManager";

export default class Row extends React.Component {

  constructor(props) {
    super(props);

    this.allClassProperties = props.cssManager.getAllClassProperties();
    const allRules = this.props.cssManager.getStylesheet().rules;
    this.mediaRules = CssManager.findMedia(allRules);

    this.mediaPrefix = [
      'sm',
      'md'
    ];

    this.state = {
      selectedClassName: ''
    }
  }

  handleOnChangeProperty = (values) => {
    this.props.handleOnChangeMedia(this.props.id, '')
    this.refInputWithPropertyValue._typeahead.getInstance().clear();
    this.props.handleOnChangeProperty(this.props.id, values.join(''));
  }

  handleOnChangeValue = (values) => {
    this.props.handleOnChangeMedia(this.props.id, values.join(''))
    this.props.handleOnChangeValue(this.props.id, values.join(''));
  }

  handleOnChangeMediaSelectBox = (e) => {
    this.props.handleOnChangeMedia(this.props.id, e.target.value)
  }

  renderMediaSelectBox(mainClassName) {
    if (!mainClassName) {
      return null
    }

    const mediaOptions = [];

    const foundedClassName = mainClassName.replace('.', '');

    mediaOptions.push(mainClassName);

    this.mediaPrefix.forEach((prefix) => {
      const [media] = this.props.cssManager.findSelectorInMedia(this.mediaRules, `.${prefix}-${foundedClassName}`);
      if (media) {
        mediaOptions.push(media.selectors.join(' '));
      }
    });

    console.log('mediaOptions', mediaOptions);
    if (mediaOptions.length === 1) {
      return null;
    }

    return (
      <div className="float-left">
        <select className="form-control" onChange={this.handleOnChangeMediaSelectBox}
                defaultValue={this.selectedClassName}>
          {mediaOptions.map((media) => {

            return (
              <option key={media} value={media}>
                {media}
              </option>
            );
          })}
        </select>
      </div>
    );
  }

  render() {

    const propertyValues = this.props.cssManager.findPropertyValues(this.props.propertyName);
    console.log('propertyValues', this.props.cssManager);


    const item = this.props.classesList.find((i) => {
      return i.property === this.props.propertyName && i.value === this.props.value
    });

    console.log('selectedClassName', this.state.selectedClassName);

    const showClass = this.state.selectedClassName || (item && item.classes.join(' '));
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
          <div className="float-left">
            <Input ref={(ref) => this.refInputWithPropertyValue = ref} value={this.props.value}
                   options={propertyValues} onChange={this.handleOnChangeValue}/>
          </div>
          {this.renderMediaSelectBox(item && item.classes.join(' '))}

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
            <small className="text-muted">{this.props.valueToShow}</small>
          </div>
        </div>
      </div>
    )
  }
}
