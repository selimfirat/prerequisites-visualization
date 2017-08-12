import React, { Component } from 'react';
import './Filters.css'

import {
    ComboBox
} from 'office-ui-fabric-react/lib/ComboBox';
import { SelectableOptionMenuItemType } from 'office-ui-fabric-react/lib/utilities/selectableOption/SelectableOption.Props';

import {
    GroupedList,
    IGroup
} from 'office-ui-fabric-react/lib/components/GroupedList/index';
import { IColumn } from 'office-ui-fabric-react/lib/DetailsList';
import { DetailsRow } from 'office-ui-fabric-react/lib/components/DetailsList/DetailsRow';
import {
    FocusZone
} from 'office-ui-fabric-react/lib/FocusZone';
import {
    Selection,
    SelectionMode,
    SelectionZone
} from 'office-ui-fabric-react/lib/utilities/selection/index';

import {
    createListItems,
    createGroups
} from '@uifabric/example-app-base';

const groupCount = 3;
const groupDepth = 1;

let _items;
let _groups;

class Filters extends Component {

    _selection;

    _onRenderCell(nestingDepth, item, itemIndex) {
        let {
            _selection: selection
        } = this;
        return (
            <DetailsRow
                columns={
                    Object.keys(item).slice(0, 3).map((value) => {
                        return {
                            key: value,
                            name: value,
                            fieldName: value,
                            minWidth: 300
                        };
                    })
                }
                groupNestingDepth={ nestingDepth }
                item={ item }
                itemIndex={ itemIndex }
                selection={ selection }
                selectionMode={ SelectionMode.multiple }
            />
        );
    }

    constructor() {
        super();

        _items = _items || createListItems(Math.pow(groupCount, groupDepth + 1));
        _groups = _groups || createGroups(groupCount, groupDepth, 0, groupCount);

        this._onRenderCell = this._onRenderCell.bind(this);
        this._selection = new Selection;
        this._selection.setItems(_items);
    }

    render() {
        return (
            <div className="filters">

                <div className="filter-header">
                    Departments
                </div>
                <FocusZone>
                    <SelectionZone
                        selection={ this._selection }
                        selectionMode={ SelectionMode.multiple }
                    >
                        <GroupedList
                            items={ _items }
                            onRenderCell={ this._onRenderCell }
                            selection={ this._selection }
                            selectionMode={ SelectionMode.multiple }
                            groups={ _groups }
                        />
                    </SelectionZone>
                </FocusZone>

            </div>
        )
    }

}

export default Filters