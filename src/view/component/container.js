import React, { Component } from 'react';

export default class Container extends Component {

    render() {
        return (
            <div style={Object.assign({
                backgroundColor: '#ffffff',
                padding: 20,
                textAlign: 'center'
            }, this.props.style)}>
                <h2 style={{
                    fontWeight: 500,
                    marginBottom: 'auto',
                    marginTop: 'auto',
                }}>
                    {this.props.title}
                </h2>
                {this.props.children}
            </div>
        )
    }
}