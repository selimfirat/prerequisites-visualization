import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    className: PropTypes.string,
    keyProp: PropTypes.string.isRequired,
    labelProp: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    offset: PropTypes.number.isRequired,
    radius: PropTypes.number.isRequired,
    circle: PropTypes.object.isRequired,
    text: PropTypes.object.isRequired
};

export default class Node extends React.PureComponent{
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(event) {
        this.props.onClick && this.props.onClick(this.props[this.props.keyProp], event);
    }
    getTransform() {
        return 'translate(' + this.props.y + ', ' + this.props.x + ')';
    }
    render() {
        return (
            <g className={this.props.className} transform={this.getTransform()} onClick={this.handleClick}>
                <circle {...this.props.circle}/>
                <text {...this.props.text}>
                    {this.props[this.props.labelProp]}
                </text>
            </g>);
    }
}

Node.propTypes = propTypes;
