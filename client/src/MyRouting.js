import React, { Component} from 'react';
import {AppBar, Toolbar,Switch, Button} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Route, BrowserRouter as Router,} from 'react-router-dom';
import Main from './components/Main';
import Table from './components/Table';
import Statics from './components/Statics';
import BUNDLE from './App_bundle';

const style = {
  root:{
  },
  bar: {
    background: "#82E0AA"
  },
  body:{
    background: "#CFD8DC",
  },
  button:{
      padding: "0px 10px",
  }
}

class MyRouting extends Component {
    constructor()
    {
        super();
        var lang = localStorage.getItem('uiLanguage');
        if (lang === null)
        {
            lang="en";
            localStorage.setItem('uiLanguage', lang);
        }
        
        this.state ={
            language: lang
        }
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

  render() {
    const {classes} = this.props;
    let bundle = BUNDLE.default;
    if (this.state.language in BUNDLE) {
        bundle = BUNDLE[this.state.language];
    }
    
    return (
      <div className={classes.root}>
            <AppBar className={classes.bar} position="static">
                <Toolbar >
                    <div>
                        en <Switch checked={this.state.language !== "en"} onChange={(e) => this.handleLanguageChange(e)} value={this.state.language}></Switch> fi
                    </div>
                    <div className={classes.button}>
                        <Button href="http://localhost:3000" variant="contained"> {bundle.main} </Button>
                    </div>
                    <div className={classes.button}>
                        <Button href="http://localhost:3000/table" variant="contained"> {bundle.table} </Button>
                    </div>
                    <div className={classes.button}>
                        <Button href="http://localhost:3000/statics" variant="contained"> {bundle.statics} </Button>
                    </div>
                </Toolbar>
            </AppBar>
            <Router>
                <div>
                    <Route exact path="/" component={() => <Main />} />
                    <Route path="/table" component={() => <Table />} />
                    <Route path="/statics" component={() => <Table />} />
                </div>
            </Router>
      </div>
    );
  }
}

export default withStyles(style)(MyRouting);
