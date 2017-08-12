import React, { Component } from 'react';
import './TopBar.css'

class TopBar extends Component {

    render() {
        return (
            <div className="top-bar">
                <div className="top-bar-content">
                    <div className="logo">Course Prerequisites</div>
                    <div className={"search-box is-focused"}>
                        <form action="." onSubmit={e => { document.activeElement.blur(); e.preventDefault(); } }>
                            <div className="search-icon"/>
                            <input type="text" className="search-input" placeholder="Search Courses" />
                            <input type="submit" className="search-submit"/>
                        </form>
                        <div className={"spinning-loader search-loader is-hidden"}/>
                    </div>
                </div>
            </div>
        )
    }

}

export default TopBar