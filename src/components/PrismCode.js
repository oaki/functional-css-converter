import React, {PureComponent} from 'react';
import Prism from 'prismjs';

export class PrismCode extends PureComponent {

  componentDidMount() {
    this._hightlight()
  }

  componentDidUpdate() {
    console.log('componentDidUpdatePrismCode');
    this._hightlight()
  }

  _hightlight() {
    Prism.highlightElement(this._domNode, this.props.async)
  }

  _handleRefMount = domNode => {
    this._domNode = domNode
  }

  render() {
    console.log('renderPrismCode');
    const {className, component:Wrapper, children} = this.props;
    console.log('prismProps', this.props);

    return (
      <Wrapper ref={this._handleRefMount} className={className}>
        {children}
      </Wrapper>
    )
  }
}