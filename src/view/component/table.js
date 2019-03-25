import React, { Component } from 'react';
import ReactDataGrid from 'react-data-grid';

export default class UserTable extends Component {

    constructor(props) {
        super(props);
        this.columns = [
            { key: 'id', name: 'ID' },
            { key: 'username', name: 'Username' },
            { key: 'name', name: 'Name' },
            { key: 'email', name: 'Email' },
            { key: 'phone', name: 'Phone' },
            { key: 'website', name: 'Website' },
            { key: 'company', name: 'Company' },
            { key: 'address', name: 'Address' },
        ].map(c => ({ ...c, ...{ resizable: true } }));
        this.state = { selectedIndexes: [] };
        
        this.rows = this.setSomeDataFromProps(this.props.users);//[{ id: 0, username: 'row1', name: 20 }, { id: 1, username: 'row1', name: 40 }, { id: 2, username: 'row1', name: 60 }];
    }

    setSomeDataFromProps = (users) => {
        var data = JSON.parse(JSON.stringify(users));
        data.forEach((item) => {
            item.address = item.address.street + ", " + item.address.city + ", " + item.address.suite + ", " + item.address.zipcode;
            item.company = item.company.name
        })
        return data
    }

    onRowsSelected = rows => {
        let newIndexes = this.state.selectedIndexes.concat(
            rows.map(r => r.rowIdx)
        );
        this.setState({
            selectedIndexes:  newIndexes
        });
        this.props.getSelected(newIndexes);
    };
    
    onRowsDeselected = rows => {
        let rowIndexes = rows.map(r => r.rowIdx);
        let newIndexes = this.state.selectedIndexes.filter(
            i => rowIndexes.indexOf(i) === -1
        );
        this.setState({
            selectedIndexes: newIndexes
        });
        this.props.getSelected(newIndexes);
    };

    render() {
        return (
            <ReactDataGrid
                columns={this.columns}
                rowGetter={i => this.rows[i]}
                rowsCount={this.rows.length}
                minHeight={this.rows.length * 40}
                rowSelection={{
                    showCheckbox: true,
                    enableShiftSelect: true,
                    onRowsSelected: this.onRowsSelected,
                    onRowsDeselected: this.onRowsDeselected,
                    selectBy: {
                        indexes: this.state.selectedIndexes
                    }
                }} />
        );
    }

}
