import React, { Component} from 'react';
import {AppBar, Toolbar,Switch, Button, Dialog, Typography, 
    DialogContent, DialogTitle, DialogActions, Radio, FormGroup, 
    RadioGroup,FormControlLabel} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Route, BrowserRouter as Router,} from 'react-router-dom';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import {createMuiTheme} from '@material-ui/core/styles';
import Main from './components/MainComponents/Main';
import Table from './components/tableComponents/Table';
import Statics from './components/StaticsComponents/Statics';
import BUNDLE from './interface/App_bundle';
import THEME from './interface/App_theme';
import FONT from './interface/App_font';
import Hotkeys from 'react-hot-keys';

const styles = {
  root:{
  },
  bar: {
  },
  body:{
  },
  button:{
      padding: "0px 10px",
  }
}

class MyRouting extends Component {
    constructor()
    {
        //Pääkomponentti joka kommunikoi ulkoasun muutosten kanssa.
        super();
        var lang = localStorage.getItem('uiLanguage');
        if (lang === null)
        {
            lang="en";
            localStorage.setItem('uiLanguage', lang);
        }

        var font = localStorage.getItem('uiFont');
        if(font === null)
        {
            font = "default"
            localStorage.setItem('uiFont', font);
        }

        var theme = localStorage.getItem('uiTheme');
        if(theme === null)
        {
            theme = "default";
            localStorage.setItem('uiTheme', theme);
        }
        
        this.state ={
            language: lang,
            font: font,
            theme: theme,
            dialogOpen: false,
            openSettings: false,
        }
    }

    handleOpenSite(keyName)
    {
        //mikä sivu aukaistaan.
        if(keyName === "alt+1")
            window.location.href = "http://localhost:3000";
        else if(keyName === "alt+2")
            window.location.href = "http://localhost:3000/table";
        else
            window.location.href = "http://localhost:3000/statics";
    }

    handleLanguageChange = (event) =>
    {
        if(event.target.value !== "fi")
        {
            this.setState({
                language: "fi",
            });
            localStorage.setItem('uiLanguage', "fi");
        }
        else
        {
            this.setState({
                language: "en",
            });
            localStorage.setItem('uiLanguage', "en");
        }
    }

    closeDialog = (event) =>
    {
        this.setState({
            dialogOpen: false,
        })
    }

    openDialog = (event) =>
    {
        this.setState({
            dialogOpen: true,
        })
    }

    openSettings = (event) => 
    {
        this.setState({
            openSettings: true,
        });
    }
    
    closeSettings = (event) =>
    {
        this.setState({
            openSettings: false,
        });
    }

    handleThemeChange = (event) =>
    {
        this.setState({
            theme: event.target.value
        });
        localStorage.setItem('uiTheme', event.target.value);
    }

    handleFontChange = (event) =>
    {
        this.setState({
            font: event.target.value
        });
        localStorage.setItem('uiFont', event.target.value);
    }

    render() {
        const {classes} = this.props;
        //hoidetaan kilen tarkastelu ja teeman luonti.
        let bundle = BUNDLE.default;
        if (this.state.language in BUNDLE) {
            bundle = BUNDLE[this.state.language];
        }

        let theme = createMuiTheme({palette: (THEME.default).palette, typography: (FONT.default).typography});
        if (this.state.theme in THEME && this.state.font) {
            theme = createMuiTheme({palette: (THEME[this.state.theme]).palette, typography: (FONT[this.state.font]).typography});
        }
        
        return (
            <MuiThemeProvider theme={theme}>
            <div >
                <AppBar  position="static">
                    <Toolbar >
                        <div>
                            en <Switch checked={this.state.language !== "en"} onChange={(e) => this.handleLanguageChange(e)} value={this.state.language}></Switch> fi
                        </div>
                        <Hotkeys keyName="alt+1" onKeyDown={this.handleOpenSite.bind(this)}>
                            <div className={classes.button}>
                                <Button color="secondary" href="http://localhost:3000" variant="contained"> {bundle.main} </Button>
                            </div>
                        </Hotkeys>
                        <Hotkeys keyName="alt+2" onKeyDown={this.handleOpenSite.bind(this)}>
                            <div className={classes.button}>
                                <Button color="secondary" href="http://localhost:3000/table" variant="contained"> {bundle.table} </Button>
                            </div>
                        </Hotkeys>
                        <Hotkeys keyName="alt+3" onKeyDown={this.handleOpenSite.bind(this)}>
                            <div className={classes.button}>
                                <Button color="secondary" href="http://localhost:3000/statics" variant="contained"> {bundle.statics} </Button>
                            </div>
                        </Hotkeys>
                            <div className={classes.button}>
                                <Button color="secondary" variant="contained" onClick={(e) => this.openSettings(e)} > {bundle.interface} </Button>
                            </div>
                        <div className={classes.button}>
                            <Button color="secondary" variant="contained" onClick={(e) => this.openDialog(e)}> {bundle.navigation} </Button>
                        </div>
                    </Toolbar>
                </AppBar>
                <Router>
                    <div>
                        <Route exact path="/" component={() => <Main />} />
                        <Route path="/table" component={() => <Table />} />
                        <Route path="/statics" component={() => <Statics />} />
                    </div>
                </Router>
                <Dialog open={this.state.dialogOpen}>
                    <DialogTitle>
                        {bundle.navigation}
                    </DialogTitle>
                    <DialogContent>
                        <Typography>
                            {"Ctrl + i, 1 <= i <= 3, " + bundle.moves}
                            {bundle.guide}
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="secondary" onClick={(e) => this.closeDialog(e)} >{bundle.close}</Button>
                    </DialogActions>
                </Dialog>
                <Dialog open={this.state.openSettings}>
                    <DialogTitle>
                        {bundle.interface}
                    </DialogTitle>
                    <DialogContent>
                        <Typography>
                            {bundle.edit}
                        </Typography>
                        <FormGroup row>
                            <div>
                                <RadioGroup value={this.state.theme} onChange={(e) => this.handleThemeChange(e)}>
                                    <FormGroup >
                                        {bundle.themeColor}
                                        <FormControlLabel value="default" control={<Radio />} labelPlacement="end" label={bundle.default} />
                                        <FormControlLabel value="dark" control={<Radio />} labelPlacement="end" label={bundle.dark} />
                                        <FormControlLabel value="light" control={<Radio />} labelPlacement="end" label={bundle.light} />
                                    </FormGroup>
                                </RadioGroup>
                            </div>
                            <div>
                                <RadioGroup value={this.state.font} onChange={(e) => this.handleFontChange(e)}>
                                    <FormGroup >
                                        {bundle.font}
                                        <FormControlLabel value="default" control={<Radio />} labelPlacement="end" label={"Arial"} />
                                        <FormControlLabel value="times" control={<Radio />} labelPlacement="end" label={"Times"} />
                                        <FormControlLabel value="calibri" control={<Radio />} labelPlacement="end" label={"Calibri"} />
                                    </FormGroup>
                                </RadioGroup>
                            </div>
                        </FormGroup>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="secondary" onClick={(e) => this.closeSettings(e)} >{bundle.close}</Button>
                    </DialogActions>
                </Dialog>
            </div>
            </MuiThemeProvider>
        );
    }
}

export default withStyles(styles, {withTheme: true})(MyRouting);
