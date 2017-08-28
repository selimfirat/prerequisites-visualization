import React, { Component } from 'react';
import './Graph.css'

import "./tree"

class Graph extends Component {

    render() {
        let d3 = window.d3

        let chart = d3.chart.architectureTree();
        chart.diameter(960)
            .data(
                {
                    "name": "News",
                    "children": [
                        { "name": "World" },
                        { "name": "Sport" }
                    ],
                    "url": "www.my-media-website.com/*",
                    "dependsOn": ["Content API", "Xiti", "Search API", "OAS", "Account API", "    Picture API", "Router API"],
                    "technos": ["PHP", "Javascript", "Silex", "NGINX", "Varnish"],
                    "satisfaction": 0.9,
                    "host": { "Amazon": ["fo-1", "fo-2"] }
                }

            );

        d3.select(window.$("#tree-container"))
            .call(chart);

        return (
            <div>
                <div id="tree-container"/>
            </div>
        )
    }

}

export default Graph