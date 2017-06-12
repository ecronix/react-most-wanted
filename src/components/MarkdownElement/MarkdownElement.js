import React, {Component} from 'react';
import PropTypes from 'prop-types';
import marked from 'marked';

require('github-markdown-css');

const styles = {
  root: {
    marginTop: 20,
    marginBottom: 20,
    padding: '0 10px',
  },
};

export default class MarkdownElement extends Component {

  static propTypes = {
    style: PropTypes.object,
    text: PropTypes.string.isRequired,
  };

  static defaultProps = {
    text: '',
  };

  componentWillMount() {
    marked.setOptions({
      gfm: true,
      tables: true,
      breaks: false,
      pedantic: false,
      sanitize: false,
      smartLists: true,
      smartypants: false
    });
  }

  render() {
    const {
      style,
      text,
    } = this.props;

    /* eslint-disable react/no-danger */
    return (
      <div
        style={Object.assign({}, styles.root, style)}
        className="markdown-body"
        dangerouslySetInnerHTML={{__html: marked(text)}}
      />
    );
    /* eslint-enable */
  }
}
