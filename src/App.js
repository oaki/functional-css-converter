import React, {Component} from 'react';
import './assets/css/App.css';
import {PrismCode} from './components/PrismCode';
import StyleEditor from './components/StyleEditor';
import CssManager from './CssManager';
require('prismjs/themes/prism.css');
const beautifyCss = require('js-beautify').css;

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      definitions: '.text{ text-align:center; display: block;}',
      classes: [],
    };

    this.cssManager = new CssManager(props.cssSource);
  }

  handleFindDefinitions = (e) => {
    const classNames = e.target.value.trim();
    let content = ``;
    let media = '';
    this.cssManager.findDefinitions(classNames).forEach(item => {
      item.global.forEach(rule => {
        rule.declarations.forEach(declaration => {
          content += `${declaration.property}: ${declaration.value};`;
        });
      });

      item.media.forEach(rule => {
        let mediaContent = '';
        rule.declarations.forEach(declaration => {
          mediaContent += `${declaration.property}: ${declaration.value};`;
        });
        media += `@media ${rule.parent.media} { .test{ ${mediaContent} } }`;

      });
    });
    const output = `.test{ ${content} } ${media} `;

    const formattedOutput = beautifyCss(output);
    if (this.state.definitions !== formattedOutput) {
      this.setState({
        definitions: formattedOutput,
      });
    }
  };

  handleFindClasses = (e) => {
    const value = e.target.value;
    const definitions = value.split(';');
    const output = [];

    definitions.forEach(def => {
      let tmp = def.split(':');
      if (tmp.length > 1) {
        const name = tmp[0].trim();
        const value = tmp[1].replace(';', '').trim();

        this.cssManager.findClassName(output, name, value);
      }

    });

    this.setState({
      classes: output,
    });
  };

  render() {

    return (
      <div className="App ">
        <nav className="navbar navbar-dark bg-dark">
          <a className="navbar-brand" href="/">Functional css editor</a>
        </nav>

        <div className="container-fluid container">

          <StyleEditor cssManager={this.cssManager}/>

          <div className="row">
            <div className="col-lg">
              <div className="form-group">
                <h4>Find classes definitions </h4>
                <input className="form-control" onChange={this.handleFindDefinitions}/>
                <small className="form-text text-muted">e.g.:
                  <span>md-m-sm m-l-sm tt-u</span>
                </small>
              </div>
            </div>

            <div className="col-lg">
              <h4>Css</h4>
              <PrismCode component="pre" className="language-css">
                {this.state.definitions}
              </PrismCode>
            </div>
          </div>


          <div className="row">
            <div className="col-xl">
              <h3>Result</h3>
              <style>
                {this.state.definitions}
              </style>
              <div className="test">
                Lorem ipsum
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-xl">
                <textarea className="form-control" onChange={this.handleFindClasses}
                          defaultValue="text-align:left; padding: 0.6rem;
                          font-weight: 600;line-height: 1.5;">
                </textarea>
            </div>
          </div>

          <div className="row">
            <div className="col-xl">
              <h3>Classes</h3>
              {this.state.classes.map((item, index) => (
                <span key={index}>{item.classes.join(' ')} </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
