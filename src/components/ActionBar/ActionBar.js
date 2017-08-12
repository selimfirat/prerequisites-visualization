import React, { Component } from 'react';
import './ActionBar.css'


class ActionBar extends Component {

    render() {
        return (
            <div className="action-bar">
                <div className="action-bar-row">
                    <div className="stats">
                        309 courses found.
                    </div>
                </div>
                <div className="action-bar-row">
                    <div className="selected-filters">
                        <div className="selected-filters-option">
                            <div className="selected-filters-option-text">
                                Departments: CS
                            </div>
                            <div className="selected-filters-option-remove">x</div>
                        </div>
                        <div className="selected-filters">
                            <div className="selected-filters-option">
                                <div className="selected-filters-option-text">
                                    Departments: EEE
                                </div>
                                <div className="selected-filters-option-remove">x</div>
                            </div>
                            <div className="reset-filters">
                                Clear all filters
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default ActionBar