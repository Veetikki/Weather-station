import React, {Component} from 'react';
import { CSVLink } from 'react-csv'
import {Button} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import BUNDLE from '../../interface/App_bundle';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

class ExportCSV extends Component
{
    render()
    {
        let bundle = BUNDLE.default;
		if (this.props.language in BUNDLE) {
            bundle = BUNDLE[this.props.language];
        }
        return(
            <MuiThemeProvider theme={this.props.theme}>
                <Button disabled={this.props.disabled} dis color="secondary" variant="contained">
                    <CSVLink separator={';'} data={this.props.csvData} filename={this.props.fileName}>{bundle.export}</CSVLink>
                </Button>
            </MuiThemeProvider>
        )
    }
}

export default withStyles({withTheme: true})(ExportCSV);