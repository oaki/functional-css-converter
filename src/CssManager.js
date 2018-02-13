const cssParser = require('css');

export default class CssManager {
  constructor(cssSource) {
    this.css = cssParser.parse(cssSource);
    this.cache = {};
  }

  static findRules(list) {
    return list.filter(rule => rule.type === 'rule');
  }

  static findMedia(list) {
    return list.filter(rule => rule.type === 'media');
  }

  static findSelector(list, name) {
    return list.filter(rule => rule.selectors.find(selector => selector === name));
  }

  getStylesheet() {
    return this.css.stylesheet;
  }

  findSelectorInMedia(list, name) {
    const rules = [];
    list.forEach((media) => {
      const mediaRules = CssManager.findSelector(media.rules, name);
      mediaRules.forEach((r) => {
        rules.push(r);
      });
    });

    return rules;
  }

  findSelectorByName(name) {
    const selectors = {};

    const allRules = this.getStylesheet().rules;
    const rules = CssManager.findRules(allRules);
    const mediaRules = CssManager.findMedia(allRules);

    selectors.global = CssManager.findSelector(rules, name);

    selectors.media = this.findSelectorInMedia(mediaRules, name);

    return selectors;
  }

  findDefinitions(classNames) {
    const str = classNames.replace(new RegExp(' {3}', 'g'), ' ');
    const classes = str.split(' ');
    return classes.map((className) => {
      const classNameWithoutDot = className.replace('.', '');
      return this.findSelectorByName(`.${classNameWithoutDot}`);
    });
  }

  findClassName(output, property, value) {
    const allRules = this.getStylesheet().rules;
    const rules = CssManager.findRules(allRules);

    rules.forEach((r) => {
      r.declarations.forEach((d) => {
        if (d.property === property && d.value === value) {
          output.push({
            property,
            value,
            classes: r.selectors,
          });
        }
      });
    });
  }

  getAllClassNames() {
    const selectors = CssManager.findRules(this.getStylesheet().rules).map(rule => rule.selectors);

    // flatten an array of arrays
    return [].concat.apply([], selectors);
  }

  getClassesList() {
    let selectors = [];
    if (!this.cache.classesList) {
      const rules = CssManager.findRules(this.getStylesheet().rules);
      selectors = rules.map(rule => rule.declarations);
      selectors = [].concat.apply([], selectors);
      this.cache.classesList = selectors;
    }

    return this.cache.classesList;
  }

  getAllClassProperties() {
    let selectors = this.getClassesList().map(declaration => declaration.property);
    selectors = [].concat.apply([], selectors);
    let output = selectors.reduce((p, c) => {
      if (!p.includes(c)) p.push(c);
      return p;
    }, []).filter(item => !!item);

    output = output.sort((a, b) => a.localeCompare(b));
    // flatten an array of arrays
    return output;
  }

  findPropertyValues(property) {
    let rules = this.getClassesList()
      .filter(rule => rule.property === property);

    rules = rules.filter((x, i, a) => a.indexOf(x) == i);

    return rules.map(rule => rule.value);
  }
}
