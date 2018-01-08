import React from 'react';
import {Typeahead} from 'react-bootstrap-typeahead';

export default class Input extends React.Component {

  render() {

    return (
      <Typeahead
        value={this.props.value}
        onChange={this.props.onChange}
        labelKey="name"
        multiple={false}
        options={this.props.options}
        placeholder=""
        ref={(ref) => this._typeahead = ref}
      />
    );
  }
}
